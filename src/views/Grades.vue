<template>
  <DataTable :value="actualGrades" tableStyle="min-width: 50rem">
    <Column field="code" header="Код"></Column>
    <Column field="courseName" header="Курс"></Column>
    <Column field="studentName" header="ФИО"></Column>
    <Column field="formatGradeDate" header="Quantity"></Column>
    <Column field="grade" header="Grade"></Column>
  </DataTable>
  <TableVariant/>
</template>
<script>
import { useStudentStore } from '@/stores/modules/student.js'
import { useGradeStore } from '@/stores/modules/grade.js'
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import ColumnGroup from "primevue/columngroup"; // optional
import Row from "primevue/row"; // optional
import TableVariant from "@/components/TableVariant.vue";
export default {
  name: "Grades",
  components: {
    DataTable,
    Column,
    ColumnGroup,
    Row,
    TableVariant
  },
  setup() {
    const gradeStore = useGradeStore();
    const studentStore = useStudentStore();
    return {
      gradeStore,
      studentStore,
    };
  },
  data() {
    return {
      headers: [
        { text: "Код", value: "code" },
        { text: "Курс", value: "courseCode" },
        { text: "ФИО", value: "studentName" },
        { text: "Грейд", value: "grade" },
        { text: "Дата", value: "formatGradeDate", align: "center" },
        { text: "Удалить", value: "actions", align: "center", sortable: false },
      ],

      rules: {
        grade: (val) =>
            (val && !isNaN(val) && val >= 0 && val <= 25) || "число от 0 до 25",
      },

      currentGradeValue: null,
    };
  },

  methods: {
    open(value) {
      this.currentGradeValue = value;
    },
    async save(edit) {
      let isError = 1;
      if (this.rules.grade(edit.item.grade) === true) {
        try {
          edit.item.grade = Number(edit.item.grade);
          // console.log(this.$store);
          isError = (await this.gradeStore.putGrade(edit.item)).resultCode;
        } catch (error) {
          console.error(error);
        }
      }

      setTimeout(
          () =>
              (edit.item.grade = isError
                  ? this.currentGradeValue
                  : Number(edit.item.grade))
      );
    },

    deleteItem(grade) {
      this.gradeStore.deleteGrade(grade);
    },

    initData() {
      this.gradeStore.initData();
    },
  },

  computed: {
    actualGrades() {
      const o = this.gradeStore.grades.filter((grade) => !grade.isDelete);

      return o;
    },
  },

  async mounted() {
    await this.gradeStore.getCourses();
    console.log(this.gradeStore.courses);
    await this.studentStore.getStudents();
    console.log(this.studentStore.students);
    await this.gradeStore.getGrades();
    console.log(this.gradeStore.grades);
  },
};


</script>