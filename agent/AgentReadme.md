# 🤖 Agente IA - Sistema de Gestão de Estoque

Este projeto é um agente inteligente que interpreta linguagem natural e interage com a API de um sistema de estoque, permitindo:

- Registrar movimentações de **entrada** e **saída** de produtos.
- Consultar movimentações de **vendas** (saídas) em um período específico.
- Obter respostas naturais e amigáveis, sem expor JSONs.

---

## 🚀 Como rodar o projeto

### ✅ Requisitos

Antes de iniciar, você precisa ter instalado na máquina:

- **Node.js** (v18 ou superior)
- **npm** ou **yarn**
- **Ollama** (engine de LLM local)  
  👉 Instale pelo site: [https://ollama.com](https://ollama.com)

> **Importante:** Após instalar o Ollama, é necessário baixar o modelo `llama3` com o comando:
```bash
ollama run llama3
```

---

## ⚙️ Instalação e Execução

1. **Instale as dependências**
```bash
npm install
```

2. **Inicie o agente**
```bash
npm run dev
```

3. Certifique-se de que a API do seu sistema de estoque está rodando em `http://localhost:3001`.

---

## 🧠 Como funciona

O agente utiliza o modelo `llama3` local (via Ollama) para interpretar comandos do usuário e, com base em um prompt pré-definido, decide:

- Quando e como chamar a API de backend.
- Como formatar a resposta de forma natural.

---

## 💬 Exemplos de prompts

### 📌 Registrar movimentação de estoque

Você pode dizer algo como:

- `Registrar uma entrada de 10 unidades do produto {id do produto} no dia 10/05/2025`
- `Tirar 3 MacBooks do estoque hoje`
- `Adicionar 50 carregadores ao estoque no dia 01 de maio`

> A IA entenderá o tipo (entrada/saída), quantidade, produto e data.

---

### 📊 Consultar movimentações de saída (vendas) por período

Exemplos:

- `Quais foram as vendas entre 1º e 10 de maio de 2025?`
- `Me diga o que foi vendido em abril de 2025`
- `Mostrar as saídas entre 01/05/2025 e 07/05/2025`

> A IA vai consultar a API `/report/movements` e formatar apenas os registros do tipo **"saida"** com nome do produto, quantidade, data e valor.

---