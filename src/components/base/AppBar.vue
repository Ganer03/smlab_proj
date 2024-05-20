<template>
  <Menubar>
    <template #start>
      <a v-ripple class="card flex align-items-center">
        <span class="pi pi-home" />
        <span class="ml-2 text-xl"> КубГУ </span>
      </a>
    </template>
    <template #end>
      <Button icon="pi pi-bars" @click="toggleDrawer" style="margin-right:10px;"/>
      <Button icon="pi pi-sun" @click="toggleTheme" />
    </template>
    </Menubar>
  <Menuleft/>
</template>
<script>
import Menubar from "primevue/menubar";
import Menuleft from "@/components/base/Menuleft.vue";
import Button from "primevue/button";
import { useDrawerStore } from '@/stores/modules/indd.js'
export default {
  setup(){
    const globalStore = useDrawerStore();
    return {
      globalStore,
    }
  },
  components:{
    Menubar,
    Button,
    Menuleft
  },
  data() {
    return{
      currentTheme: "aura-dark-purple",
      nextTheme: "aura-light-purple"
    }
  },
  methods:{
    toggleDrawer () {
      this.globalStore.toggleDrawer();
    },
    toggleTheme () {
      [this.currentTheme, this.nextTheme] = [this.nextTheme, this.currentTheme];
      this.$primevue.changeTheme(
          this.currentTheme,
          this.nextTheme,
          "theme-link1",
          () => {}
      );
    }
  }
}
// const globalStore = useDrawerStore();
// const toggleDrawer = () => {
//   globalStore.toggleDrawer();
//   console.log()
// }
// const toggleTheme = () => {
//   globalStore.toggleDrawer();
//   console.log()
// }
</script>