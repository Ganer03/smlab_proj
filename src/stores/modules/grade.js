import { defineStore } from 'pinia';
import api from '@/stores/api';
import Grade from '../../model/Grade';
import Course from '../../model/Course';

export const useGradeStore = defineStore({
    id: 'grade',
    state: () => ({
        courses: new Map(),
        grades: [],
        newGradeDialog: false,
    }),
    actions: {
        async getCourses() {
            const courses = await api.course();
            this.courses.clear();
            courses.forEach(course => {
                this.courses.set(
                    course.code,
                    new Course(course.code, course.name, course.dateStart, course.dateEnd)
                );
            });
        },
        async getGrades() {
            const grades = await api.grade();
            this.grades = grades.map(grade => new Grade(
                grade.code,
                grade.courseCode,
                grade.studentCode,
                grade.grade,
                grade.gradeDate,
                grade.isDelete
            ));
            // grades.forEach(grade => {
            //         return new Grade(
            //             grade.code,
            //             grade.courseCode,
            //             grade.studentCode,
            //             grade.grade,
            //             grade.gradeDate,
            //             grade.isDelete
            //         );
            // });
        },
        async postGrade(grade) {
            const grader = await api.postGrade(grade);
            this.grades.push(
                    grader.code,
                    grader.courseCode,
                    grader.studentCode,
                    grader.grade,
                    grader.gradeDate,
                    grader.isDelete
                );
        },
        async putGrade(grade) {
            await api.putGrade(grade);
        },
        async deleteGrade(grade) {
            if(!(await api.deleteGrade(grade.code)).resultCode) {
                const index = this.grades.indexOf(grade);
                grade.isDelete = 1;
                this.grades.splice(index, 1, grade);
            }
        },
        async initData() {
            const grades = await api.initData();
            this.grades = grades.map(grade => new Grade(
                grade.code,
                grade.courseCode,
                grade.studentCode,
                grade.grade,
                grade.gradeDate,
                grade.isDelete
            ));
        },
        async toggleDialog(state) {
            state.newGradeDialog = !state.newGradeDialog;
        }
    },
    // Мутация для переключения диалога новой оценки
    mutations: {
    }
});
