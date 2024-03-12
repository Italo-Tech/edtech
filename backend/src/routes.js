const express = require('express');
const router = express.Router();

const studentController = require('./controllers/studentController');

/* Usuários */
router.get('/students', studentController.getAllStudents);
router.post('/students', studentController.createStudent);
router.put('/students/:ra', studentController.updatedStudent);
router.delete('/students/:ra', studentController.deleteStudent);

module.exports = router;
