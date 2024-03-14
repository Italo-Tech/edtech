import {api} from "../../services/index.js";
import { useToast } from "vue-toastification";
import { defineStore } from 'pinia'

const toast = useToast();

export const useStudentsStore = defineStore( {
  id: 'students',
  state: () => ({
    data: [],
    edit_student: {},
    create_new_student: {
      ra: '',
      name: '',
      email: null,
      cpf: null
    },
  }),
  getters: {

  },
  actions: {
    getAllStudents() {
      api.get(`http://localhost:8080/students`).then(response => {
        this.data = response.data
      }).catch(error => {
        console.log('Erro ao buscar alunos', error)
      });
    },
    getStudent(payload) {
      api.get(`http://localhost:8080/students/${payload}`).then(response => {
        this.edit_student = response.data
      }).catch(error => {
        console.log('Erro ao buscar aluno', error)
      });
    },
    createStudent(payload) {
      api.post(`http://localhost:8080/students`, payload).then(response => {
        toast.success("Aluno criado !", { timeout: 2500 });
        this.getAllStudents();
        this.create_new_student = {};
      }).catch(error => {
        if(error.request.status === 400) {
          toast.error("Erro ao criar aluno", { timeout: 2500 });
        }
      });
    },
    updatedStudent(payload) {
      api.put(`http://localhost:8080/students`, payload).then(response => {
        toast.success("Aluno atualizado !", { timeout: 2500 });
        this.getAllStudents()
        this.edit_student = {};
      }).catch(error => {
        if(error.request.status === 400) {
          toast.error("Erro ao atualizar aluno.", { timeout: 2500 });
        }
      });
    },
    deleteMenu(payload) {
      api.delete(`http://localhost:8080/students/${payload}`).then(response => {
        toast.success("Aluno removido !", { timeout: 2500 });
        this.getAllStudents()
      }).catch(error => {
        if(error.request.status === 400) {
          toast.error("Erro ao remover aluno.", { timeout: 2500 });
        }
      });
    }
  },
})
