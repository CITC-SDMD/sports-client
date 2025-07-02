<template>

    <Head>
        <Title>{{ runtimeConfig?.public?.appName }} | Athletes</Title>
    </Head>

    <div>
        <Loader v-if="state.isPageLoading" />
        <ErrorAlert v-if="state.error" :message="state.error.message" />
        <TableAthlete :head=state.head :body="state.body" />
    </div>
</template>

<script setup lang="ts">
import { athleteService } from '@/api/athlete/AthleteService'

let currentPage = 1

const runtimeConfig = useRuntimeConfig()

definePageMeta({
    layout: 'main'
})

const state = reactive({
    isPageLoading: false,
    error: null as any,
    head: [
        { name: 'Full name' },
        { name: 'Gender' },
        { name: 'Date of birth' },
        { name: 'Age' },
        { name: 'Contact no.' },
    ],
    body: []
})

onMounted(() => {
    getAthletes()
})

async function getAthletes() {
    state.isPageLoading = true
    try {
        let params = {
            page: currentPage
        }
        const response = await athleteService.fetchAthletes(params)
        if (response.data) {
            state.body = response
        }
    } catch (error) {
        state.error = error
    }
    state.isPageLoading = false
}

</script>