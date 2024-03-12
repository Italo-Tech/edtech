const Students = require('../models/Students');
const {Sequelize} = require("sequelize");

module.exports = {
    /* Buscar alunos */
    async getAllStudents(req, res) {
        const students = await Students.findAll();

        res.status(200).json(students);
    },
    /* Registrar aluno */
    async createStudent(req, res) {
        const { name, email, ra, cpf } = req.body;

        try {
            // Verifica se já existe um estudante com o mesmo RA ou e-mail
            let existingStudent = await Students.findOne({
                where: {
                    [Sequelize.Op.or]: [
                        { ra },
                        { email },
                        { cpf }
                    ]
                }
            });

            // Se um estudante com o mesmo RA ou e-mail já existir, retorna um erro
            if (existingStudent) {
                return res.status(400).json({ msg: 'Estudante já cadastrado com este RA, email ou CPF.' });
            }

            // Se não existir, cria um novo estudante
            const newStudent = await Students.create({
                name,
                email,
                ra,
                cpf
            });

            // Retorna o novo estudante criado
            res.json({ student: { ra: newStudent.ra, name: newStudent.name, email: newStudent.email, cpf: newStudent.cpf } });
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    },
    /* Atualizar aluno */
    async updatedStudent(req, res){
        try {
            const { ra } = req.params;
            const { name, email } = req.body;

            const updatedStudent = await Students.update({
                name,
                email,
            }, {
                where: { ra },
                returning: true // Retorna o registro atualizado
            })

            if(updatedStudent[0] === 0) {
                return res.status(404).json({ message: 'Aluno não encontrado' });
            }

            res.status(200).json(updatedStudent[1][0]);
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: 'Erro ao atualizar aluno' });
        }
    },
    /* Deletar aluno */
    async deleteStudent(req, res){
        try {
            const { ra } = req.params;

            const result = await Students.destroy({
                where: { ra }
            });

            if (result ===  0) {
                return res.status(404).json({ message: 'Aluno não encontrado' });
            }

            res.status(204).json({ message: 'Aluno removido com sucesso' });
        } catch(error) {
            console.log(error)
        }
    }
}
