<template>

    <Head>
        <Title>{{ runtimeConfig?.public?.appName }} | Athletes</Title>
    </Head>

    <div>
        <Loader v-if="state.isPageLoading" />
        <ErrorAlert v-if="state.error" :message="state.error.message" />
        <TableAthlete :head=state.head :body="state.body" />
        <Pagination v-if="state.body?.data?.length > 0" :data="state.body" @previous="previous()" @next="next()" />
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
    body: [] as any
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

async function previous() {
    currentPage--
    getAthletes()
}

async function next() {
    currentPage++
    getAthletes()
}
</script>