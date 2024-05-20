import ReqExec from '@/services/RequestExecutor'
ReqExec.baseUrl = "api/rest/kubsu_study/web_data_api/"; //подставьте свои значения в сегменты пути

const endpoints = {
    init: "init_data",
    course: "course",
    student: "student",
    grade: "grade"
};

export default {
    course: () => ReqExec.get(endpoints.course),

    student: () => ReqExec.get(endpoints.student),

    grade: () => ReqExec.get(endpoints.grade),
    postGrade: grade => ReqExec.post(endpoints.grade, grade),
    putGrade: (code, grade) => ReqExec.put(endpoints.grade, code, grade),
    deleteGrade: code => ReqExec.delete(endpoints.grade, code),

    initData: () => ReqExec.get(endpoints.init),

    //аутентификация, не изменять
    auth: {
        getSession: () => ReqExec.execute("api/auth/getSession", true),
        getUser: () => ReqExec.execute("api/auth/getUser", true)
    }
}

// import { defineStore } from 'pinia';
// import RequestExecutor from '@/services/RequestExecutor';
//
// RequestExecutor.baseUrl = "api/rest/kubsu_study/web_data_api/";
//
// const endpoints = {
//     init: "init_data",
//     course: "course",
//     student: "student",
//     grade: "grade"
// };
//
// export const useApiStore = defineStore({
//     id: 'api',
//     actions: {
//         async course() {
//             return await RequestExecutor.get(endpoints.course, '');
//         },
//         async student() {
//             return await RequestExecutor.get(endpoints.student, '');
//         },
//         async grade() {
//             return await RequestExecutor.get(endpoints.grade, '');
//         },
//         async postGrade(grade) {
//             return await RequestExecutor.post(endpoints.grade, grade);
//         },
//         async putGrade(code, grade) {
//             return await RequestExecutor.put(endpoints.grade, code, grade);
//         },
//         async deleteGrade(code) {
//             return await RequestExecutor.delete(endpoints.grade, code);
//         },
//         async initData() {
//             return await RequestExecutor.get(endpoints.init, '');
//         },
//         async getSession () {
//             await RequestExecutor.execute("api/auth/getSession", true);
//         },
//         async getUser () { await RequestExecutor.execute("api/auth/getUser", true);}
//     }
// });
