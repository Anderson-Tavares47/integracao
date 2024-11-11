import express, { Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript backend with GitHub Secrets!');
});

app.get('/secret', (req: Request, res: Response) => {
  const secretData = process.env.SECRET_DATA || 'No secret provided';
  res.send(`Secret data: ${secretData}`);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
