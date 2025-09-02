import { defineStore } from "pinia";

export const useQualifiedStore = defineStore("qualifiedStore", {
    persist: true,
    state: () => ({
        qualified: null,
        currentQualifiedsPage: 1,
        selectedQualified: null,
    }),
    actions: {
        setQualified(qualified) {
            this.qualified = qualified;
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