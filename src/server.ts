import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();

app.use(cors()); // Habilita CORS para todas as rotas
app.use(express.json());

// Endpoint raiz para teste
app.get('/', (req: Request, res: Response) => {
  res.send("Bem-vindo à API na Vercel!");
});

// Outro endpoint de teste
app.get('/items', (req: Request, res: Response) => {
  res.json({ items: ["Item 1", "Item 2"] });
});

export default app; // Exporta o aplicativo como padrão para Vercel
