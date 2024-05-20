<template>
  <div>
    <div class="card">
      <Toolbar class="mb-4">
        <template #start>
          <Button label="New" icon="pi pi-plus" severity="success" class="mr-2" @click="openNew" />
          <Button label="Delete" icon="pi pi-trash" severity="danger" @click="confirmDeleteSelected" :disabled="!selectedProducts || !selectedProducts.length" />
        </template>

        <template #end>
          <FileUpload mode="basic" accept="image/*" :maxFileSize="1000000" label="Import" chooseLabel="Import" class="mr-2 inline-block" />
          <Button label="Export" icon="pi pi-upload" severity="help" @click="exportCSV($event)"  />
        </template>
      </Toolbar>

      <DataTable ref="dt" :value="actualGrades" v-model:selection="selectedProducts" dataKey="code"
                 :paginator="true" :rows="10" :filters="filters"
                 paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" :rowsPerPageOptions="[5,10,25]"
                 currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products">
        <template #header>
          <div class="flex flex-wrap gap-2 align-items-center justify-content-between">
            <h4 class="m-0">Manage Products</h4>
<!--            <IconField iconPosition="left">-->
<!--              <InputIcon>-->
<!--                <i class="pi pi-search" />-->
<!--              </InputIcon>-->
<!--              <InputText v-model="filters['global'].value" placeholder="Search..." />-->
<!--            </IconField>-->
          </div>
        </template>

        <Column selectionMode="multiple" style="width: 3rem" :exportable="false"></Column>
        <Column field="code" header="Code" sortable style="min-width:12rem"></Column>
        <Column field="courseName" header="courseName" sortable style="min-width:16rem"></Column>
<!--        <Column header="Image">-->
<!--          <template #body="slotProps">-->
<!--            <img :src="`https://primefaces.org/cdn/primevue/images/product/${slotProps.data.image}`" :alt="slotProps.data.image" class="border-round" style="width: 64px" />-->
<!--          </template>-->
<!--        </Column>-->
<!--        <Column field="price" header="Price" sortable style="min-width:8rem">-->
<!--          <template #body="slotProps">-->
<!--            {{formatCurrency(slotProps.data.price)}}-->
<!--          </template>-->
<!--        </Column>-->
        <Column field="studentName" header="studentName" sortable style="min-width:10rem"></Column>
        <Column field="grade" header="grade" sortable style="min-width:10rem"></Column>
        <Column field="formatGradeDate" header="formatGradeDate" sortable style="min-width:10rem"></Column>
<!--        <Column field="rating" header="Reviews" sortable style="min-width:12rem">-->
<!--          <template #body="slotProps">-->
<!--            <Rating :modelValue="slotProps.data.rating" :readonly="true" :cancel="false" />-->
<!--          </template>-->
<!--        </Column>-->
<!--        <Column field="inventoryStatus" header="Status" sortable style="min-width:12rem">-->
<!--          <template #body="slotProps">-->
<!--            <Tag :value="slotProps.data.inventoryStatus" :severity="getStatusLabel(slotProps.data.inventoryStatus)" />-->
<!--          </template>-->
<!--        </Column>-->
        <Column :exportable="false" style="min-width:8rem">
          <template #body="slotProps">
            <Button icon="pi pi-pencil" outlined rounded class="mr-2" @click="editProduct(slotProps.data)" />
            <Button icon="pi pi-trash" outlined rounded severity="danger" @click="confirmDeleteProduct(slotProps.data)" />
          </template>
        </Column>
      </DataTable>
    </div>

    <Dialog v-model:visible="productDialog" :style="{width: '450px'}" header="Product Details" :modal="true" class="p-fluid">
      <div class="code">
        <label for="code">code</label>
        <InputText id="code" v-model.trim="product.code" required="true" autofocus :invalid="submitted && !product.code" />
      </div>
      <div class="courseName">
        <label for="courseName">studentName</label>
        <Textarea id="courseName" v-model="product.courseName" required="true" rows="3" cols="20" />
      </div>
      <div class="studentName">
        <label for="studentName">studentName</label>
        <Textarea id="studentName" v-model="product.studentName" required="true" rows="3" cols="20" />
      </div>
      <div class="grade">
        <label for="grade">grade</label>
        <InputNumber id="grade" v-model="product.grade" integeronly />
      </div>
      <div class="formatGradeDate">
        <label for="formatGradeDate">formatGradeDate</label>
        <Textarea id="formatGradeDate" v-model="product.formatGradeDate" required="true" rows="3" cols="20" />
      </div>
      <template #footer>
        <Button label="Cancel" icon="pi pi-times" text @click="hideDialog"/>
        <Button label="Save" icon="pi pi-check" text @click="saveProduct" />
      </template>
    </Dialog>

<!--    <Dialog v-model:visible="deleteProductDialog" :style="{width: '450px'}" header="Confirm" :modal="true">-->
<!--      <div class="confirmation-content">-->
<!--        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />-->
<!--        <span v-if="product">Are you sure you want to delete <b>{{product.name}}</b>?</span>-->
<!--      </div>-->
<!--      <template #footer>-->
<!--        <Button label="No" icon="pi pi-times" text @click="deleteProductDialog = false"/>-->
<!--        <Button label="Yes" icon="pi pi-check" text @click="deleteProduct" />-->
<!--      </template>-->
<!--    </Dialog>-->

<!--    <Dialog v-model:visible="deleteProductsDialog" :style="{width: '450px'}" header="Confirm" :modal="true">-->
<!--      <div class="confirmation-content">-->
<!--        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />-->
<!--        <span v-if="product">Are you sure you want to delete the selected products?</span>-->
<!--      </div>-->
<!--      <template #footer>-->
<!--        <Button label="No" icon="pi pi-times" text @click="deleteProductsDialog = false"/>-->
<!--        <Button label="Yes" icon="pi pi-check" text @click="deleteSelectedProducts" />-->
<!--      </template>-->
<!--    </Dialog>-->
  </div>
</template>

<script>
import { FilterMatchMode } from 'primevue/api';
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import ColumnGroup from "primevue/columngroup"; // optional
import Row from "primevue/row"; // optional
import Toolbar from "primevue/toolbar";
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import Dropdown from "primevue/dropdown";
import Tag from "primevue/tag";
import InputNumber from "primevue/inputnumber";
import InputText from "primevue/inputtext";
import Textarea from "primevue/textarea";
import RadioButton from "primevue/radiobutton";
// import { ProductService } from '@/service/ProductService';
import { useStudentStore } from '@/stores/modules/student.js'
import { useGradeStore } from '@/stores/modules/grade.js'
import Grade from "@/model/Grade.js";

export default {
  components: {
    DataTable,
    Column,
    ColumnGroup,
    Row,
    Toolbar,
    Button,
    Dialog,
    Dropdown,
    Tag,
    InputNumber,
    InputText,
    Textarea,
    RadioButton
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
      products: null,
      productDialog: false,
      deleteProductDialog: false,
      deleteProductsDialog: false,
      product: {},
      selectedProducts: null,
      filters: {},
      submitted: false,
    }
  },
  created() {
    this.initFilters();
  },
  computed: {
    actualGrades() {
      const o = this.gradeStore.grades.filter((grade) => !grade.isDelete);

      return o;
    },
  },
  async mounted() {
    await this.gradeStore.getCourses();
    await this.studentStore.getStudents();
    await this.gradeStore.getGrades();
    console.log(this.gradeStore.grades)
    this.product = this.gradeStore.grades.map(grade => new Grade(
        grade.code,
        grade.courseCode,
        grade.studentCode,
        grade.grade,
        grade.gradeDate,
        grade.isDelete
    ));
    console.log(this.product)
  },
  methods: {
    deleteItem(grade) {
      this.gradeStore.deleteGrade(grade);
    },
    openNew() {
      this.product = {};
      this.submitted = false;
      this.productDialog = true;
    },
    hideDialog() {
      this.productDialog = false;
      this.submitted = false;
    },
    saveProduct() {
      this.submitted = true;

      if (this.product?.courseName?.trim()) {
        if (this.product.code) {
          this.product.courseName = this.product.courseName.value ? this.product.courseName.value : this.product.courseName;
          console.log(this.product.courseName);
          // this.products[this.findIndexById(this.product.id)] = this.product;
          // this.$toast.add({severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000});
        } else {
          // this.product.id = this.createId();
          // this.product.code = this.createId();
          // this.product.image = 'product-placeholder.svg';
          // this.product.inventoryStatus = this.product.inventoryStatus ? this.product.inventoryStatus.value : 'INSTOCK';
          // this.products.push(this.product);
          // this.$toast.add({severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000});
        }

        this.productDialog = false;
        this.product = {};
      }
    },
    editProduct(product) {
      this.product = product;
      console.log('hello', product)
      this.productDialog = true;
    },
    confirmDeleteProduct(product) {
      this.product = product;
      this.deleteItem(product);
      this.deleteProductDialog = true;
    },
    deleteProduct() {
      this.products = this.products.filter(val => val.id !== this.product.id);
      this.deleteProductDialog = false;
      this.product = {};
      this.$toast.add({severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000});
    },
    findIndexById(id) {
      let index = -1;
      for (let i = 0; i < this.products.length; i++) {
        if (this.products[i].id === id) {
          index = i;
          break;
        }
      }

      return index;
    },
    createId() {
      let id = '';
      var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      for (var i = 0; i < 5; i++) {
        id += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return id;
    },
    confirmDeleteSelected() {
      // this.deleteProductsDialog = true;
      console.log(this.products);
      this.products = this.products.filter(val => !this.selectedProducts.includes(val));
      console.log(this.products);
    },
    deleteSelectedProducts() {
      this.products = this.products.filter(val => !this.selectedProducts.includes(val));
      this.deleteProductsDialog = false;
      this.selectedProducts = null;
      this.$toast.add({severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000});
    },
    initFilters() {
      this.filters = {
        'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
      }
    }
  }
}
</script>