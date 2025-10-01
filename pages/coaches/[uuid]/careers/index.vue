<template>

    <Head>
        <Title>{{ runtimeConfig?.public?.appName }} | Coach Career</Title>
    </Head>

    <div>
        <Loader v-if="state.isPageLoading" />
        <Breadcrumbs :pages="pages" class="mt-4" />
        <div class="mt-4">
            <span class="text-3xl font-bold text-blue-500">Performance & Career</span>
        </div>
        <div class="flex items-center justify-between">
            <FormBackButton @click="goToPreviousPage" class="mt-4" />
        </div>
        <ErrorAlert v-if="state.error" :message="state.error.message" class="my-4" />
        <ModulesAthleteCoachProfile :identity="'coach'" class="mt-4" v-if="state.coach" :model="state.coach" />
        <Tabs :tabs="tabs" class="mt-4" />
        <div class="mt-4">
            <div class="w-full flex justify-end">
                <FormButton @click="goToCreateCareer" class="flex items-center gap-x-2 w-full sm:w-auto">
                    <PlusIcon class="w-6 h-6" />
                    New career
                </FormButton>
            </div>
            <div class="w-full mt-4">
                <form @submit.prevent="search" class="flex w-full space-x-4">
                    <FormTextField name="search" v-model=state.searchFilter class="w-full"
                        placeholder="Search career" />
                    <FormButton type="submit" class="flex items-center gap-x-2">
                        <MagnifyingGlassIcon class="w-6 h-6" />
                        Search
                    </FormButton>
                </form>
            </div>
            <TableCareer :head=state.head :body="state.body" />
            <Pagination v-if="state.body?.data?.length > 0" :data="state.body" @previous="previous()" @next="next()" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { careerService } from '@/api/career/CareerService'
import { coachService } from '@/api/coach/CoachService'
import { PlusIcon, MagnifyingGlassIcon } from '@heroicons/vue/20/solid'

let currentPage = 1

const runtimeConfig = useRuntimeConfig()

const router = useRouter()
const uuid = router?.currentRoute?.value?.params?.uuid

const route = useRoute()
const path = route.fullPath
const baseUrl = path.replace(`/${uuid}/careers`, '')
const documentUrl = path.replace('/careers', '/documents')
const athleteUrl = path.replace('/careers', '/athletes')

const pages = [
    { name: 'Coaches', href: baseUrl, current: false },
    { name: 'Performance and Career', href: path, current: true },
]

const tabs = [
    { name: 'Performance and Career', href: path, current: true },
    { name: 'Documents', href: documentUrl, current: false },
    { name: 'Athletes', href: athleteUrl, current: false },
]

definePageMeta({
    layout: 'main'
})

onMounted(() => {
    getCoach()
    fetchCareers()
})

const state = reactive({
    isPageLoading: false,
    coach: null as any,
    error: null as any,
    coachUuid: uuid as string,
    head: [
        {
            name: 'ID number'
        },
        {
            name: 'Competition'
        },
        {
            name: 'Sport'
        },
        {
            name: 'Role'
        },
        {
            name: 'Date'
        },
    ],
    body: [] as any,
    search: null as any,
    searchFilter: null as any,
    isRequirementOpen: false
})

async function getCoach() {
    state.isPageLoading = true
    try {
        const response = await coachService.fetchCoach(state.coachUuid)
        if (response.data) {
            state.coach = response.data
        }
    } catch (error) {
        state.error = error
    }
    state.isPageLoading = false
}

async function fetchCareers() {
    state.isPageLoading = true
    try {
        let params = {
            page: currentPage,
            model_uuid: uuid,
            search: state.search
        }
        const response = await careerService.fetchCareers(params)
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
    fetchCareers()
}

function openRequirement() {
    state.isRequirementOpen = true
}

function goToPreviousPage() {
    navigateTo(baseUrl)
}

async function previous() {
    currentPage--
    fetchCareers()
}

async function next() {
    currentPage++
    fetchCareers()
}

function goToCreateCareer() {
    navigateTo(`${path}/create`)
}
</script>