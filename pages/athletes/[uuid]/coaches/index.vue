<template>

    <Head>
        <Title>{{ runtimeConfig?.public?.appName }} | Athlete Profile</Title>
    </Head>

    <div>
        <Loader v-if="state.isPageLoading" />
        <Breadcrumbs :pages="pages" class="mt-4" />
        <div class="mt-4">
            <span class="text-3xl font-bold text-blue-500">Coaches</span>
        </div>
        <div class="flex items-center justify-between">
            <FormBackButton @click="goToPreviousPage" class="mt-4" />
            <!-- <FormButton @click="openRequirement">View Documents</FormButton> -->
        </div>
        <ErrorAlert v-if="state.error" :message="state.error.message" class="my-4" />
        <ModulesAthleteCoachProfile :identity="'athlete'" class="mt-4" v-if="state.athlete" :model="state.athlete" />
        <Tabs :tabs="tabs" class="mt-4" />
        <div class="mt-4">
            <div class="w-full flex justify-end">
                <FormButton @click="goToCreateCoach" class="flex items-center gap-x-2 w-full sm:w-auto">
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
        <ModalNewCoachAthlete v-model:open="state.isNewCoachOpen" :model="'coach'" :buttonText="'New Coach'"
            @saveCoach="saveAthleteCoach" />
    </div>
</template>

<script setup lang="ts">
import { athleteService } from '@/api/athlete/AthleteService'
import { coachAthleteService } from '@/api/coachAthlete/CoachAthleteService'
import { PlusIcon, MagnifyingGlassIcon } from '@heroicons/vue/20/solid'
import { useAlert } from '@/composables/alert'

let currentPage = 1

const { successAlert } = useAlert()

const runtimeConfig = useRuntimeConfig()

const router = useRouter()
const uuid = router?.currentRoute?.value?.params?.uuid

const route = useRoute()
const path = route.fullPath

const athleteUrl = path.replace(path, '/athletes')
const careerUrl = path.replace('/coaches', '/careers')
const documentUrl = path.replace('/coaches', '/documents')

const pages = [
    { name: 'Athletes', href: athleteUrl, current: false },
    { name: 'Coaches', href: path, current: true },
]

const tabs = [
    { name: 'Performance and Career', href: careerUrl, current: false },
    { name: 'Documents', href: documentUrl, current: false },
    { name: 'Coaches', href: path, current: true },
]


definePageMeta({
    layout: 'main'
})

onMounted(() => {
    getAthlete()
    getCoaches()
    state.age = computedAge
})

const state = reactive({
    isPageLoading: false,
    athlete: null as any,
    error: null as any,
    athleteUuid: uuid as string,
    age: null as any,
    head: [
        { name: 'ID' },
        { name: 'Name' },
        { name: 'Sex' },
        { name: 'Birthday' },
        { name: 'Civil Status' },
        { name: 'Contact no.' },
    ],
    body: [] as any,
    searchFilter: null as any,
    search: null as any,
    isNewCoachOpen: false,
    isRequirementOpen: false
})

const computedAge = computed(() => {
    const birthDate = state.athlete?.birth_date
    if (!birthDate) return ''

    const today = new Date()
    const birth = new Date(birthDate)

    if (isNaN(birth.getTime())) return ''

    let age = today.getFullYear() - birth.getFullYear()
    const m = today.getMonth() - birth.getMonth()

    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
        age--
    }

    return age
})

async function saveAthleteCoach(data: any) {
    state.isPageLoading = true
    try {
        let params = {
            athlete_uuid: state.athleteUuid,
            coach_uuid: data
        }
        const response = await coachAthleteService.createCoachAthlete(params)
        if (response.data) {
            successAlert('Success!', 'Coach saved.')
            getCoaches()
            state.isNewCoachOpen = false
        }
    } catch (error) {
        state.error = error
    }
    state.isPageLoading = false
}

async function getAthlete() {
    state.isPageLoading = true
    try {
        const response = await athleteService.fetchAthlete(state.athleteUuid)
        if (response.data) {
            state.athlete = response.data
        }
    } catch (error) {
        state.error = error
    }
    state.isPageLoading = false
}

async function getCoaches() {
    state.isPageLoading = true
    try {
        let params = {
            page: currentPage,
            athlete_uuid: state.athleteUuid,
            search: state.search
        }
        const response = await athleteService.fetchCoachesByAthlete(params)
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

function goToPreviousPage() {
    const url = path.replace('/profile', '')
    navigateTo('/athletes')
}

function goToCreateCoach() {
    state.isNewCoachOpen = true
}

function openRequirement() {
    state.isRequirementOpen = true
}

</script>