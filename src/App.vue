<template>
<!--  <v-app>-->
<!--    <app-loading-mask></app-loading-mask>-->
    <template v-if="authStore.$state.session">
      <AppBar/>
    </template>
  <template v-else>
    <i class="pi pi-spin pi-spinner" style="font-size: 2rem"></i>
  </template>
  <main>
    <router-view>
    </router-view>
  </main>
  <link id="theme-link" rel="stylesheet" href="/themes/themes/aura-dark-purple/theme.css">
  <link id="theme-link1"  rel="stylesheet" href="/themes/themes/aura-light-purple/theme.css">
</template>

<script>
import { useAuthStore } from '@/stores/modules/auth.js'
import AppBar from "@/components/base/AppBar.vue";
export default {
  setup(){
    const authStore = useAuthStore()
    return {
      authStore,
    }
  },
  components:{
    AppBar
  },
  data() {
  },
  methods:{
  }
}
</script>