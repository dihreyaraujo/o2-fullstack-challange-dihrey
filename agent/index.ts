import express, { Request, Response } from 'express';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/ask', async (req: Request, res: Response) => {
  const { question } = req.body;

  if (!question) {
    res.status(400).json({ error: 'Pergunta não enviada.' });
  } else {
    try {
      const response = await axios.post('http://localhost:11434/api/generate', {
        model: 'llama3',
        prompt: question,
        stream: false,
      });

      res.json({ answer: response.data.response });
    } catch (error) {
      console.error('Erro ao gerar resposta:', error);
      res.status(500).json({ error: 'Erro interno ao consultar a IA.' });
    }
  }
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Agente IA rodando em http://localhost:${PORT}`);
});
