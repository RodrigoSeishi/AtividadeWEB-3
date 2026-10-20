const express = require('express');
const router = express.Router();
const professorController = require('../controllers/professorController');

// Mapeamento dos endpoints com os métodos do controller
router.get('/', professorController.listarProfessores);
router.get('/departamento/:departamento', professorController.listarPorDepartamento);
router.get('/:id', professorController.buscarPorId);
router.get('/:id/turmas', professorController.listarTurmas);
router.put('/:id', professorController.atualizarProfessor);
router.post('/:id/turmas', professorController.adicionarTurma);
router.delete('/:id', professorController.removerProfessor);

module.exports = router;