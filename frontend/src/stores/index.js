import { createPinia } from 'pinia';
import { useStudentsStore } from './modules/students.js';

const store = createPinia({
    modules: {
        useStudentsStore,
    },
})
export default store;
