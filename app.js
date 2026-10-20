const express = require('express');
const professorRoutes = require('./routes/professorRoutes');

const app = express();

// Middleware para entender JSON no corpo da requisição (req.body)
app.use(express.json());

// Injeta o prefixo /professores para todas as rotas importadas
app.use('/professores', professorRoutes);

// Inicia o servidor na porta 3000
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});