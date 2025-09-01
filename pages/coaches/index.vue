<template>

    <Head>
        <Title>{{ runtimeConfig?.public?.appName }} | Coaches</Title>
    </Head>

    <div>
        <Loader v-if="state.isPageLoading" />
        <div>
            <Breadcrumbs :pages="pages" />
        </div>

        <div class="mt-4">
            <span class="text-3xl font-bold text-blue-500">Coaches</span>
        </div>

        <ErrorAlert v-if="state.error" :message="state.error.message" />

        <div class="w-full flex justify-end">
            <FormButton @click="goToCreateCoach" class="flex items-center gap-x-2">
                <PlusIcon class="w-6 h-6" />
                New coach
            </FormButton>
        </div>
        <div class="w-full mt-4">
            <form @submit.prevent="search" class="flex w-full space-x-4">
                <FormTextField name="search" v-model=state.searchFilter class="w-full" placeholder="Search coach" />
                <FormButton type="submit" class="flex items-center gap-x-2">
                    <MagnifyingGlassIcon class="w-6 h-6" />
                    Search
                </FormButton>
            </form>
        </div>
        <TableAthleteCoach :head=state.head :body="state.body" />
        <Pagination v-if="state.body?.data?.length > 0" :data="state.body" @previous="previous()" @next="next()" />
    </div>
</template>

<script setup lang="ts">
import { coachService } from '@/api/coach/CoachService'
import { PlusIcon, MagnifyingGlassIcon } from '@heroicons/vue/20/solid'

let currentPage = 1

const runtimeConfig = useRuntimeConfig()

const route = useRoute()
const path = route.fullPath

const pages = [
    { name: 'Coaches', href: path, current: true },
]

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
        { name: 'Civil Status' },
        { name: 'Contact no.' },
    ],
    body: [] as any,
    search: null as any,
    searchFilter: null as any
})

onMounted(() => {
    getCoaches()
})

async function getCoaches() {
    state.isPageLoading = true
    try {
        let params = {
            page: currentPage,
            search: state.search
        }
        const response = await coachService.fetchCoaches(params)
        if (response.data) {
            state.body = response
        }
    } catch (error) {
        state.error = error
    }
    state.isPageLoading = false
}

async function search() {
    currentPage = 1
    let filterString = JSON.stringify(state.searchFilter?.trim()?.split(/\s+/).filter(Boolean) || [])
    state.search = filterString
    getCoaches()
}

async function previous() {
    currentPage--
    getCoaches()
}

async function next() {
    currentPage++
    getCoaches()
}

function goToCreateCoach() {
    navigateTo(`${path}/create`)
}
</script>