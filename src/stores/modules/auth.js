import { defineStore } from 'pinia';
import api from '@/stores/api';

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        session: true,
        user: "Студент",
        drawer: true,
        isLoading: true
    }),
    actions: {
        async getSession() {
            this.session = await api.auth.getSession();
        },
        async getUser() {
            this.user = await api.auth.getUser();
        }
    },
    // Мутация для переключения открытия ящика
});