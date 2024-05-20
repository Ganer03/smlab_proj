import { useStudentStore } from '@/stores/modules/student.js'
import { useGradeStore } from '@/stores/modules/grade.js'
import dayjs from "dayjs";
// import {methods as Formatter} from "primevue/calendar";

export default class Grade {
    code
    courseCode
    studentCode
    grade
    gradeDate
    isDelete

    constructor(code, courseCode, studentCode, grade, gradeDate, isDelete) {
        this.code = code;
        this.courseCode = courseCode;
        this.studentCode = studentCode;
        this.grade = grade;
        this.gradeDate = gradeDate;
        this.isDelete = isDelete;
    }
    
    get courseName() {
        return useGradeStore().courses.get(this.courseCode).name;
    }

    get studentName() {
        return useStudentStore().students.get(this.studentCode).fullName;
    }

    get formatGradeDate() {
        // return Formatter.formatDate(this.gradeDate);
        return dayjs(this.gradeDate).format('DD.MM.YYYY');
    }
}