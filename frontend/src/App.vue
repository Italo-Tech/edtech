<template>
  <v-app>
    <v-app-bar app color="indigo" dark>
      <v-toolbar-title>Edtech</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-app-bar>

    <v-container fluid class="mt-16" width="100%">
      <v-row no-gutters>
        <v-col cols="12">
          <v-data-table
              :headers="headers"
              :items="desserts"
              :sort-by="[{ key: 'calories', order: 'asc' }]"
          >
            <template v-slot:top>
              <v-toolbar flat>
                <v-toolbar-title>Estudantes</v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-spacer></v-spacer>
                <v-dialog v-model="dialog" max-width="500px">
                  <template v-slot:activator="{ props }">
                    <v-btn class="mb-2" color="primary" dark v-bind="props">
                      Criar registro
                    </v-btn>
                  </template>
                  <v-card>
                    <v-card-title>
                      <span class="text-h5">{{ formTitle }}</span>
                    </v-card-title>

                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col cols="12" md="6" sm="6">
                            <v-text-field v-model="editedItem.ra" label="RA"></v-text-field>
                          </v-col>
                          <v-col cols="12" md="6" sm="6">
                            <v-text-field v-model="editedItem.name" label="Nome"></v-text-field>
                          </v-col>
                          <v-col cols="12" md="6" sm="6">
                            <v-text-field v-model="editedItem.email" label="Email"></v-text-field>
                          </v-col>
                          <v-col cols="12" md="6" sm="6">
                            <v-text-field v-model="editedItem.cpf" label="CPF"></v-text-field>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card-text>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue-darken-1" variant="text" @click="close">
                        Cancelar
                      </v-btn>
                      <v-btn color="blue-darken-1" variant="text" @click="save">
                        Salvar
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                <v-dialog v-model="dialogDelete" max-width="500px">
                  <v-card>
                    <v-card-title class="text-h5">Tem certeza que deseja deletar este aluno??</v-card-title>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue-darken-1" variant="text" @click="closeDelete">Cancelar</v-btn>
                      <v-btn color="blue-darken-1" variant="text" @click="deleteItemConfirm">OK</v-btn>
                      <v-spacer></v-spacer>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-toolbar>
            </template>
            <template v-slot:item.actions="{ item }">
              <v-icon class="me-2" size="small" @click="editItem(item)">
                mdi-pencil
              </v-icon>
              <v-icon size="small" @click="deleteItem(item)">
                mdi-delete
              </v-icon>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import {defineComponent, ref, reactive, computed, watch, onMounted} from 'vue';
import { useStudentsStore } from "@/stores/modules/students.js";

export default defineComponent({
  setup() {
    const students = useStudentsStore();

    const dialog = ref(false);
    const dialogDelete = ref(false);
    const headers = reactive([
      {title: 'RA', align: 'start', sortable: false, key: 'ra'},
      {title: 'Nome', key: 'name'},
      {title: 'Email', key: 'email'},
      {title: 'cpf', key: 'cpf'},
      {title: 'Ações', key: 'actions'},
    ]);
    const desserts = students.data;
    const editedIndex = ref(-1);
    const editedItem = students.edit_student;

    const formTitle = computed(() => editedIndex.value === -1 ? 'Novo estudante' : 'Editar estudante');

    onMounted(() => {
      students.getAllStudents();
    })

    watch(dialog, (val) => {
      if (!val) close();
    });

    watch(dialogDelete, (val) => {
      if (!val) closeDelete();
    });

    const editItem = (item) => {
      editedIndex.value = desserts.value.indexOf(item);
      Object.assign(editedItem, item);
      dialog.value = true;
    };

    const deleteItem = (item) => {
      editedIndex.value = desserts.value.indexOf(item);
      Object.assign(editedItem, item);
      dialogDelete.value = true;
    };

    const deleteItemConfirm = () => {
      desserts.value.splice(editedIndex.value, 1);
      closeDelete();
    };

    const close = () => {
      dialog.value = false;
    };

    const closeDelete = () => {
      dialogDelete.value = false;
    };

    const save = () => {
      students.createStudent(students.create_new_student)
      close();
    };

    return {
      students,
      dialog,
      dialogDelete,
      headers,
      desserts,
      editedIndex,
      editedItem,
      formTitle,
      editItem,
      deleteItem,
      deleteItemConfirm,
      close,
      closeDelete,
      save,
    };
  }
})
</script>
