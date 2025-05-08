import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { sequelize } from './config/database';
import router from './routes';
import { createDatabaseIfNotExists } from './utils/initDatabase';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(router);

const PORT = process.env.PORT || 3001;

const startServer = async () => {
  try {
    await createDatabaseIfNotExists(); // ✅ Cria o banco se não existir
    await sequelize.sync({ alter: true }); // 🔄 Sincroniza models
    console.log('🟢 Banco sincronizado!');
    
    app.listen(PORT, () => {
      console.log(`🚀 Backend rodando na porta ${PORT}`);
    });
  } catch (err) {
    console.error('🔴 Erro ao conectar no banco:', err);
  }
};

startServer();
