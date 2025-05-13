import express, { Request, Response } from 'express';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const BASE_BACKEND_URL = 'http://localhost:3001';

// 🧠 Prompt base
const systemPrompt = `
Você é um assistente inteligente de um sistema de gestão de estoque. Seu papel é interpretar perguntas e gerar comandos para o backend executar. Ao receber dados de retorno da API, formate a resposta de forma amigável, natural e clara, sem usar JSON.

Funcionalidades disponíveis:

1. Cadastrar movimentação de estoque:
   [CALL_API: /stock]
   {
     "productId": "uuid",
     "type": "entrada ou saida",
     "quantity": número,
     "date": "AAAA-MM-DD"
   }

2. Consulta detalhada de movimentações de saída em um período:
   [CALL_API: /report/movements?start=AAAA-MM-DD&end=AAAA-MM-DD]
   Após o retorno da API, filtre os objetos com "type": "saida" e para cada um, retorne no seguinte formato:
   "O produto {productId} vendeu {quantity} unidades na data {date} pelo valor de R$ {value}."

Regras:
- Sempre inicie com uma frase amigável.
- Nunca responda com JSON.
- Sempre use o comando [CALL_API: ...] para indicar a chamada ao backend.
- Datas podem ser informadas de maneira natural como "10/05/2025", "1 de maio de 2025", "maio 1", etc. Converta para o padrão "AAAA-MM-DD" antes de gerar os comandos.
`;

app.post('/api/ask', async (req: Request, res: Response) => {
  const { question } = req.body;

  if (!question) {
    res.status(400).json({ error: 'Pergunta não enviada.' });
    return;
  }

  try {
    const response = await axios.post('http://localhost:11434/api/generate', {
      model: 'llama3',
      prompt: `${systemPrompt}\nUsuário: ${question}`,
      stream: false,
    });

    const rawAnswer = response.data.response;

    const apiMatch = rawAnswer.match(/\[CALL_API:\s*(.+?)\]/);
    const bodyMatch = rawAnswer.match(/\{[\s\S]*\}/); // JSON se houver

    let finalAnswer = rawAnswer;

    if (apiMatch) {
      const endpoint = apiMatch[1].trim();
      const fullUrl = `${BASE_BACKEND_URL}${endpoint}`;

      if (bodyMatch) {
        const bodyJson = JSON.parse(bodyMatch[0]);
        const apiResponse = await axios.post(fullUrl, bodyJson);
        finalAnswer = rawAnswer.replace(apiMatch[0], `\n✅ Registro salvo com sucesso.`);
      } else {
        const apiResponse = await axios.get(fullUrl);
        const formattedData = formatMovements(apiResponse.data);
        finalAnswer = rawAnswer.replace(apiMatch[0], `\n✅ ${formattedData}`);
      }
    }

    res.json({ answer: finalAnswer.trim() });
  } catch (error) {
    console.error('Erro ao processar pergunta:', error);
    res.status(500).json({ error: 'Erro ao processar pergunta da IA.' });
  }
});

// 🔎 Formata resposta de movimentações (apenas saídas)
function formatMovements(data: any): string {
  if (!Array.isArray(data)) return 'Nenhuma movimentação encontrada.';

  const saidas = data.filter(item => item.type === 'saida');

  if (saidas.length === 0) return 'Nenhuma movimentação de saída no período.';

  return saidas
    .map((item) => {
      const dataFormatada = new Date(item.date).toLocaleDateString('pt-BR');
      return `O produto ${item.productId} vendeu ${item.quantity} unidade(s) na data ${dataFormatada} pelo valor de R$ ${Number(item.value).toFixed(2)}.`;
    })
    .join('\n');
}

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Agente IA rodando em http://localhost:${PORT}`);
});
