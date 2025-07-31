<template>

    <Head>
        <Title>{{ runtimeConfig?.public?.appName }} | Athletes</Title>
    </Head>

    <div>
        <Loader v-if="state.isPageLoading" />
        <Breadcrumbs :pages="pages" class="mt-4" />
        <div class="mt-4">
            <span class="text-3xl font-bold text-blue-500">Coaches</span>
        </div>
        <div class="flex items-center justify-between">
            <FormBackButton @click="goToPreviousPage" class="mt-4" />
            <FormButton @click="openRequirement">View Documents</FormButton>
        </div>
        <ErrorAlert v-if="state.error" :message="state.error.message" class="my-4" />
        <ModulesAthleteCoachProfile class="mt-4" v-if="state.coach" :model="state.coach" />
        <Tabs :tabs="tabs" class="mt-4" />
        <div class="mt-4">
            <div class="w-full flex justify-end">
                <FormButton @click="goToCreateAthlete" class="flex items-center gap-x-2 w-full sm:w-auto">
                    <PlusIcon class="w-6 h-6" />
                    New athlete
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
        <ModalNewCoachAthlete v-model:open="state.isNewAthleteOpen" :model="'athlete'" :buttonText="'New Athlete'"
            @saveCoach="saveCoachAthlete" />
        <ModalRequirements v-model:open="state.isRequirementOpen"
            @closeRequirement="(value: any) => state.isRequirementOpen = value" />
    </div>
</template>

<script setup lang="ts">
import { coachAthleteService } from '@/api/coachAthlete/CoachAthleteService'
import { useAlert } from '@/composables/alert'
import { coachService } from '~/api/coach/CoachService'
import { PlusIcon, MagnifyingGlassIcon } from '@heroicons/vue/20/solid'

let currentPage = 1

const runtimeConfig = useRuntimeConfig()

const { successAlert } = useAlert()

const router = useRouter()
const uuid = String(router?.currentRoute?.value?.params?.uuid)

const route = useRoute()
const path = route.fullPath
const baseUrl = path.replace(`/${uuid}/athletes`, '')
const careerUrl = path.replace('/athletes', '/careers')

const pages = [
    { name: 'Coaches', href: baseUrl, current: false },
    { name: 'Athletes', href: path, current: true },
]

const tabs = [
    { name: 'Athletes', href: path, current: true },
    { name: 'Performance and Career', href: careerUrl, current: false },
]

definePageMeta({
    layout: 'main'
})

onMounted(() => {
    getCoach()
    getCoachAthletes()
})

const state = reactive({
    isPageLoading: false,
    head: [
        { name: 'Full name' },
        { name: 'Gender' },
        { name: 'Date of birth' },
        { name: 'Age' },
        { name: 'Contact no.' },
    ],
    body: [] as any,
    coach: null as any,
    error: null as any,
    searchFilter: null as any,
    search: null as any,
    isNewAthleteOpen: false,
    isRequirementOpen: false
})

async function getCoach() {
    state.isPageLoading = true
    try {
        const response = await coachService.fetchCoach(uuid)
        if (response.data) {
            state.coach = response.data
        }
    } catch (error) {
        state.error = error
    }
    state.isPageLoading = false
}

async function getCoachAthletes() {
    state.isPageLoading = true
    try {
        let params = {
            page: currentPage,
            coach_uuid: uuid,
            search: state.search
        }
        const response = await coachService.fetchAthletesByCoach(params)
        if (response.data) {
            state.body = response
        }
    } catch (error) {
        state.error = error
    }
    state.isPageLoading = false
}

async function saveCoachAthlete(data: any) {
    state.isPageLoading = true
    try {
        let params = {
            athlete_uuid: data,
            coach_uuid: uuid
        }
        const response = await coachAthleteService.createCoachAthlete(params)
        if (response.data) {
            successAlert('Success!', 'Coach saved to athlete.')
            getCoachAthletes()
            state.isNewAthleteOpen = false
        }
    } catch (error) {
        state.error = error
    }
    state.isPageLoading = false
}

function openRequirement() {
    state.isRequirementOpen = true
}

async function previous() {
    currentPage--
    getCoachAthletes()
}

async function next() {
    currentPage++
    getCoachAthletes()
}

async function search() {
    currentPage = 1
    let filterString = JSON.stringify(state.searchFilter?.trim()?.split(/\s+/).filter(Boolean) || [])
    state.search = filterString
    getCoachAthletes()
}

function goToCreateAthlete() {
    state.isNewAthleteOpen = true
}

function goToPreviousPage() {
    navigateTo(baseUrl)
}
</script>