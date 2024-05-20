<template>
  <Sidebar v-model:visible="globalStore.$state.drawer">
    <template #container="{ globalStore }">
      <div class="flex flex-column h-full">
        <div class="flex align-items-center justify-content-between px-4 pt-3 flex-shrink-0">
                <span class="inline-flex align-items-center gap-2">
                    <AppLogo/>
                </span>
          <span>
                    <Button type="button" @click="toggleDrawer" icon="pi pi-times" rounded outlined class="h-2rem w-2rem"></Button>
                </span>
        </div>
        <div class="overflow-y-auto">
          <ul class="list-none p-3 m-0">
            <li>
              <ul class="list-none p-0 m-0 overflow-hidden">
                <li>
                  <router-link :to="{name: 'home'}">
                  <a v-ripple class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple">
                    <i class="pi pi-home mr-2"></i>
                    <span class="font-medium">Грейды</span>
                  </a>
                  </router-link>
                </li>
                <li>
                  <router-link :to="{name: 'about'}">
                  <a to="/about" v-ripple class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple">
                    <i class="pi pi-bookmark mr-2"></i>
                    <span class="font-medium">Представление 2</span>
                  </a>
                  </router-link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <div class="mt-auto">
          <hr class="mb-3 mx-3 border-top-1 border-none surface-border" />
          <a v-ripple class="m-3 flex align-items-center cursor-pointer p-3 gap-2 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple">
            <Avatar image="" shape="circle" class="bg-gray-500"/>
            <span class="font-bold">Student</span>
          </a>
        </div>
      </div>
    </template>
  </Sidebar>
</template>
<script>
import Avatar from "primevue/avatar";
import Button from "primevue/button";
import Sidebar from "primevue/sidebar"
import { useDrawerStore } from '@/stores/modules/indd.js'
import AppLogo from "@/components/base/AppLogo.vue";
export default {
  setup(){
    const globalStore = useDrawerStore();
    return {
      globalStore,
    }
  },
  components:{
    Sidebar,
    Button,
    Avatar,
    AppLogo
  },
  data() {
  },
  methods:{
    toggleDrawer () {
      this.globalStore.toggleDrawer();
    }
  }
}
</script>