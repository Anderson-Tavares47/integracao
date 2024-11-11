import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 1234;

app.use(express.json());

// Armazenamento em memória para os items adicionados
let items: string[] = [];

// Middleware para autenticação (protege endpoints sensíveis em produção)
function authenticate(req: Request, res: Response, next: NextFunction): void {
  const token = req.headers['authorization'];
  if (token === 'Bearer meu_token_de_teste') {
    next();
  } else {
    res.status(403).send("Acesso negado: Token inválido");
  }
}

// Endpoint para receber e armazenar os secrets em variáveis de ambiente
app.post('/store-secrets', (req: Request, res: Response): void => {
  const { database_url, api_base_url, auth_url, external_service_url } = req.body;

  // Armazenando os secrets em variáveis de ambiente
  process.env.DATABASE_URL = database_url;
  process.env.API_BASE_URL = api_base_url;
  process.env.AUTH_URL = auth_url;
  process.env.EXTERNAL_SERVICE_URL = external_service_url;

  res.send("Secrets armazenados com sucesso.");
});

// Endpoint para adicionar um item
app.post('/add-item', (req: Request, res: Response): void => {
  const { item } = req.body;
  if (!item) {
    res.status(400).send("Item não fornecido.");
    return;
  }
  
  items.push(item);
  res.send(`Item '${item}' adicionado com sucesso.`);
});

// Endpoint para buscar todos os itens
app.get('/items', (req: Request, res: Response): void => {
  res.json({ items });
});

// Endpoint para verificar as configurações dos secrets
app.get('/config', authenticate, (req: Request, res: Response): void => {
  res.json({
    database_url: process.env.DATABASE_URL,
    api_base_url: process.env.API_BASE_URL,
    auth_url: process.env.AUTH_URL,
    external_service_url: process.env.EXTERNAL_SERVICE_URL,
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
