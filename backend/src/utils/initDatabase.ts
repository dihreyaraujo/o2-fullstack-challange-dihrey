import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const {
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
} = process.env;

export const createDatabaseIfNotExists = async () => {
  const tempSequelize = new Sequelize('postgres', DB_USER ?? 'postgres', DB_PASSWORD, {
    host: DB_HOST,
    port: Number(DB_PORT),
    dialect: 'postgres',
    logging: false,
  });

  try {
    await tempSequelize.query(`CREATE DATABASE "${DB_NAME}"`);
    console.log(`✅ Banco "${DB_NAME}" criado com sucesso.`);
  } catch (error: any) {
    if (error.original?.code === '42P04') {
      console.log(`ℹ️ Banco "${DB_NAME}" já existe.`);
    } else {
      console.error('❌ Erro ao criar banco:', error);
    }
  } finally {
    await tempSequelize.close();
  }
};
