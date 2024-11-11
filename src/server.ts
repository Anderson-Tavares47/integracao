import express, { Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send("Bem-vindo à API na Vercel!");
});

// Outros endpoints

export default app; // Exporta o app como padrão
