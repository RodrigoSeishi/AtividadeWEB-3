// Armazenamento em memória utilizando arrays e objetos JavaScript
let professores = [
  {
    id: 1,
    nome: "Rodrigo Seishi Suzuki Kitazono",
    idade: 30,
    departamento: "Computacao",
    turmas: [
      { codigo: "RA251689", disciplina: "Desenvolvimento Web", alunos: ["Ana", "Bruno"] }
    ]
  },
  {
    id: 2,
    nome: "Rafael Moreno",
    idade: 40,
    departamento: "Computacao",
    turmas: [
      { codigo: "SIST01", disciplina: "POO", alunos: ["Ana", "Bruno"] }
    ]
  }
];

// Listar todos os professores (GET /professores)
exports.listarProfessores = (req, res) => {
  return res.json(professores);
};

// Listar professores por departamento (GET /professores/departamento/:departamento)
exports.listarPorDepartamento = (req, res) => {
  const { departamento } = req.params;
  const professoresDoDepto = professores.filter(
    (p) => p.departamento.toLowerCase() === departamento.toLowerCase()
  );
  return res.json(professoresDoDepto);
};

// Buscar professor por ID (GET /professores/:id)
exports.buscarPorId = (req, res) => {
  const { id } = req.params;
  const professor = professores.find((p) => p.id === parseInt(id));

  if (!professor) {
    return res.status(404).json({ mensagem: "Id não existente" });
  }

  return res.json(professor);
};

// Listar as turmas de um professor (GET /professores/:id/turmas)
exports.listarTurmas = (req, res) => {
  const { id } = req.params;
  const professor = professores.find((p) => p.id === parseInt(id));

  if (!professor) {
    return res.status(404).json({ mensagem: "Id não existente" });
  }

  return res.json(professor.turmas);
};

// Atualizar os dados de um professor (PUT /professores/:id)
exports.atualizarProfessor = (req, res) => {
  const { id } = req.params;
  const { nome, idade, departamento } = req.body;

  const professor = professores.find((p) => p.id === parseInt(id));

  if (!professor) {
    return res.status(404).json({ mensagem: "Id não existente" });
  }

  if (nome) professor.nome = nome;
  if (idade) professor.idade = idade;
  if (departamento) professor.departamento = departamento;

  return res.json(professor);
};

// Adicionar uma turma a um professor (POST /professores/:id/turmas)
exports.adicionarTurma = (req, res) => {
  const { id } = req.params;
  const { codigo, disciplina, alunos } = req.body;

  const professor = professores.find((p) => p.id === parseInt(id));

  if (!professor) {
    return res.status(404).json({ mensagem: "Id não existente" });
  }

  const novaTurma = {
    codigo,
    disciplina,
    alunos: alunos || []
  };

  professor.turmas.push(novaTurma);

  return res.status(201).json(professor);
};

// Remover um professor (DELETE /professores/:id)
exports.removerProfessor = (req, res) => {
  const { id } = req.params;
  const index = professores.findIndex((p) => p.id === parseInt(id));

  if (index === -1) {
    return res.status(404).json({ mensagem: "Id não existente" });
  }

  professores.splice(index, 1);

  return res.json({ mensagem: "Professor removido com sucesso." });
};