import { defineStore } from 'pinia';
import api from '@/stores/api';
import Student from '../../model/Student';

export const useStudentStore = defineStore({
    id: 'student',
    state: () => ({
        students: new Map(),
    }),
    actions: {
        async getStudents() {
            const data = await api.student();
            data.forEach(student => {
                this.students.set(student.code, new Student(student.code, student.fullName, student.datetime));
            });
        }
    }
});
