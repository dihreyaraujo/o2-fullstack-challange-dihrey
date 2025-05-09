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
{
  "name": "Mouse Logitech",
  "quantity": 10,
  "unitPrice": 199.99
}
```

#### 🔹 Listar todos os produtos
**GET** `/products`

#### 🔹 Atualizar um produto
**PUT** `/products/:id`
```json
{
  "name": "Mouse Gamer Logitech",
  "quantity": 20,
  "unitPrice": 229.99
}
```

#### 🔹 Deletar um produto
**DELETE** `/products/:id`

---

### 🔄 Movimentações de Estoque

#### 🔹 Registrar movimentação
**POST** `/stock`
```json
{
  "productId": "uuid-do-produto",
  "type": "entrada", // ou "saida"
  "quantity": 5
}
```

---

### 📈 Relatórios

#### 🔹 Movimentações por período
**GET** `/report/movements?start=2025-05-01&end=2025-05-09`

#### 🔹 Valor total em estoque
**GET** `/report/total-stock-value`

#### 🔹 Quantidade total vendida (saídas)
**GET** `/report/total-items-sold`

#### 🔹 Produtos mais movimentados
**GET** `/report/top-moved-products?limit=5`