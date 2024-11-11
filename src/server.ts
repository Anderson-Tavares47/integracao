import express, { Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(express.json());

let items: string[] = [];

// Endpoint para receber e armazenar os secrets em variáveis de ambiente
app.post('/store-secrets', (req: Request, res: Response) => {
  const { database_url, api_base_url, auth_url, external_service_url } = req.body;

  process.env.DATABASE_URL = database_url;
  process.env.API_BASE_URL = api_base_url;
  process.env.AUTH_URL = auth_url;
  process.env.EXTERNAL_SERVICE_URL = external_service_url;

  res.send("Secrets armazenados com sucesso.");
});

// Endpoint para adicionar um item
app.post('/add-item', (req: Request, res: Response) => {
  const { item } = req.body;
  if (!item) {
    return res.status(400).send("Item não fornecido.");
  }
  
  items.push(item);
  res.send(`Item '${item}' adicionado com sucesso.`);
});

// Endpoint para buscar todos os itens
app.get('/items', (req: Request, res: Response) => {
  res.json({ items });
});

// Endpoint para verificar as configurações dos secrets
app.get('/config', (req: Request, res: Response) => {
  res.json({
    database_url: process.env.DATABASE_URL,
    api_base_url: process.env.API_BASE_URL,
    auth_url: process.env.AUTH_URL,
    external_service_url: process.env.EXTERNAL_SERVICE_URL,
  });
});

export default app; // Exporta o app para ser usado pela Vercel como uma serverless function
