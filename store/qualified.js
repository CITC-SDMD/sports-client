import { defineStore } from "pinia";

export const useUserStore = defineStore("userStore", {
    persist: true,
    state: () => ({
        qualified: null,
        currentQualifiedsPage: 1,
        selectedQualified: null,
    }),
    actions: {
        setQualified(user) {
            this.qualified = user;
        },
        setCurrentQualifiedsPage(pageNumber) {
            this.currentQualifiedsPage = pageNumber;
        },
        setSelectedQualified(data) {
            this.selectedQualified = data;
        },
        resetQualified() {
            this.qualified = null;
        },
        resetCurrentQualifiedsPage() {
            this.currentQualifiedsPage = 1;
        },
        resetSelectedQualified() {
            this.selectedQualified = null;
        },
    },
    getters: {
        getQualified: (state) => state.qualified,
        getCurrentQualifiedsPage: (state) => state.currentQualifiedsPage,
        getSelectedQualified: (state) => state.selectedQualified,
    },
});