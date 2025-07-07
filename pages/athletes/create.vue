<template>

    <Head>
        <Title>{{ runtimeConfig?.public?.appName }} | Create Athlete</Title>
    </Head>

    <div>
        <Loader v-if=state.isPageLoading />
        <FormBackButton @click="goToPreviousPage" />
        <ErrorAlert v-if="state.error" :message="state.error.message" />
        <ModulesCoachAthleteForm @loadPage="(value) => state.isPageLoading = value" />
    </div>
</template>

<script setup lang="ts">

const runtimeConfig = useRuntimeConfig()
const route = useRoute()
const path = route.fullPath;

definePageMeta({
    layout: 'main'
})

const state = reactive({
    isPageLoading: false,
    error: null as any
})

function goToPreviousPage() {
    const url = path.replace('/create', '')
    navigateTo(url)
}
</script>