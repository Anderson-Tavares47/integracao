import express, { Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send("Bem-vindo à API na Vercel!");
});

// Outros endpoints, como /items ou /store-secrets
app.get('/items', (req: Request, res: Response) => {
  res.json({ items: ["Item 1", "Item 2"] });
});

export default app; // Exporta o aplicativo para que a Vercel o reconheça
