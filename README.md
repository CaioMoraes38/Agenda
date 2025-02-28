# 📅 Projeto de Agenda com React e MongoDB

Este é um projeto de agenda que permite criar, visualizar, atualizar e excluir compromissos. Utiliza React com TypeScript para o front-end e Node.js com MongoDB para o back-end.

## 🛠️ Tecnologias Utilizadas

- **Front-end:** React (TypeScript)
- **Back-end:** Node.js (Express.js)
- **Banco de Dados:** MongoDB
- **Gerenciamento de Estado:** Context API
- **Roteamento:** React Router
- **Requisições HTTP:** Axios

## 📂 Estrutura do Projeto

```
├── backend/
│   ├── config/
│   │   └── db.ts
│   ├── controllers/
│   │   └── eventController.ts
│   ├── models/
│   │   └── Event.ts
│   ├── routes/
│   │   └── eventRoutes.ts
│   ├── .env
│   └── server.ts
│
├── frontend/
│   ├── App.tsx
│   ├── components/
│   │   ├── EventForm.tsx
│   │   └── EventList.tsx
│   ├── contexts/
│   │   └── EventContext.tsx
│   ├── screens/
│   │   ├── HomeScreen.tsx
│   │   └── EventDetailsScreen.tsx
│   └── services/
│       └── api.ts
```

## 🚀 Como Executar o Projeto

### 🖥️ Back-end (Node.js)

1. **Instalar as dependências:**

```bash
cd backend
npm install
```

2. **Configurar o MongoDB:**

Crie um arquivo `.env` e adicione sua string de conexão MongoDB:

```
MONGO_URI=mongodb://localhost:27017/agenda
PORT=5000
```

3. **Iniciar o servidor:**

```bash
npm run dev
```

O servidor estará rodando em `http://localhost:5000`

### 🖼️ Front-end (React)

1. **Instalar as dependências:**

```bash
cd frontend
npm install
```

2. **Configurar a API:**

No arquivo `services/api.ts`, configure a URL do backend:

```typescript
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000'
});

export default api;
```

3. **Rodar o aplicativo:**

```bash
npm start
```

## 🛡️ Rotas da API

- `GET /events` → Listar todos os eventos
- `GET /events/:id` → Obter detalhes de um evento
- `POST /events` → Criar um novo evento
- `PUT /events/:id` → Atualizar um evento
- `DELETE /events/:id` → Excluir um evento

## 🔧 Funcionalidades

- CRUD completo de eventos
- Listagem com atualização em tempo real
- Validação de formulários
- Feedback de sucesso e erro






