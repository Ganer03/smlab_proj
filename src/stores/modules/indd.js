import { defineStore } from 'pinia';
import api from '@/stores/api';

export const useDrawerStore = defineStore({
    id: 'indd',
    state: () => ({
        drawer: true,
        isLoading: true
    }),
    actions: {
        toggleDrawer() {
            this.drawer = !this.drawer;
        },
        setIsLoading(flag) {
            this.isLoading = flag
        }
    },
    // Мутация для переключения открытия ящика
    // mutations: {
    //     toggleDrawer() {
    //         this.drawer = !this.drawer;
    //     },
    //     setIsLoading(flag) {
    //         this.isLoading = flag
    //     }
    // }
});