<template>

    <Head>
        <Title>{{ runtimeConfig?.public?.appName }} | Athlete Career</Title>
    </Head>

    <div>
        <Loader v-if="state.isPageLoading" />
        <FormBackButton @click="goToPreviousPage" />
        <div class="mt-8">
            <ErrorAlert v-if="state.error" :message="state.error.message" />
            <ModulesAthleteCoach v-if="state.athlete" :player="state.athlete" @openNewCoachModal="openNewCoachModal">
                <TableCoach :head="state.head" :body="state.body" />
                <Pagination v-if="state.body?.data?.length > 0" :data="state.body" @previous="previous()"
                    @next="next()" />
            </ModulesAthleteCoach>
            <ModalNewCoach v-model:open="state.isNewCoachModalOpen" @saveCoach="saveCoachAthlete" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { athleteService } from '@/api/athlete/AthleteService'
import { coachAthleteService } from '@/api/coachAthlete/CoachAthleteService'
import { useAlert } from '@/composables/alert'

let currentPage = 1

const runtimeConfig = useRuntimeConfig()

const { successAlert } = useAlert()

const router = useRouter()
const uuid = router?.currentRoute?.value?.params?.uuid

const route = useRoute()
const path = route.fullPath
const baseUrl = path.replace(`/${uuid}/coaches`, '')

definePageMeta({
    layout: 'main'
})

onMounted(() => {
    getAthlete()
    getAthleteCoaches()
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
    athlete: null as any,
    error: null as any,
    athleteUuid: uuid as string,
    search: null as any,
    searchFilter: null as any,
    isNewCoachModalOpen: false,
    isCreateCoachModalOpen: false,
})

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

async function getAthleteCoaches() {
    state.isPageLoading = true
    try {
        let params = {
            page: currentPage,
            athlete_uuid: state.athleteUuid
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

async function saveCoachAthlete(data: any) {
    state.isPageLoading = true
    try {
        let params = {
            athlete_uuid: uuid,
            coach_uuid: data
        }
        const response = await coachAthleteService.createCoachAthlete(params)
        if (response.data) {
            successAlert('Success!', 'Coach saved to athlete.')
            getAthleteCoaches()
            state.isNewCoachModalOpen = false
        }
    } catch (error) {
        state.error = error
    }
    state.isPageLoading = false
}

async function previous() {
    currentPage--
    getAthleteCoaches()
}

async function next() {
    currentPage++
    getAthleteCoaches()
}

function showError(data: any) {
    state.error = data
}

function openNewCoachModal(data: any) {
    state.isNewCoachModalOpen = data
}

function goToPreviousPage() {
    navigateTo(baseUrl)
}
</script>