## 📦 Documentação da API - Sistema de Gestão de Estoque

### 🚀 Como iniciar o projeto

1. **Instale as dependências**
```bash
npm install
```

2. **Configure as variáveis de ambiente**
Crie um arquivo `.env` com base no `.env.example`:
```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=nome_do_banco
PORT=3001
```

3. **Inicie o servidor**
```bash
npm run dev
```

A aplicação estará rodando em: `http://localhost:3001`

---

## 📚 Endpoints da API

### 📁 Produtos

#### 🔹 Criar produto
**POST** `/products`
```json
//Exemplo de requisição

{
  "name": "Mouse Gamer",
  "description": "Mouse com RGB e 3200 DPI",
  "quantity": 20,
  "price": 150.00,
  "category": "Periféricos"
}
```

---

#### 🔹 Listar todos os produtos
**GET** `/products`

---

#### 🔹 Atualizar um produto
**PUT** `/products/:id`
```json
//Exemplo de requisição

{
  "name": "Mouse Gamer Logitech",
  "quantity": 20,
}
```

---

#### 🔹 Deletar um produto
**DELETE** `/products/:id`

---

### 🔄 Movimentações de Estoque

#### 🔹 Registrar movimentação
**POST** `/stock`
```json
//Exemplo de requisição

{
  "productId": "uuid-do-produto",
  "type": "saida", // ou "entrada"
  "quantity": 2,
  "date": "2025-05-08"
}
```

---

### 📈 Relatórios

#### 🔹 Movimentações por período
**GET** `/report/movements?start=2025-05-01&end=2025-05-09`

---

#### 🔹 Valor total em estoque
**GET** `/report/total-stock-value`

---

#### 🔹 Quantidade total vendida (saídas)
**GET** `/report/total-items-sold`

---

#### 🔹 Produtos mais movimentados
**GET** `/report/top-moved-products?limit=5`