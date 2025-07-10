<template>

    <Head>
        <Title>{{ runtimeConfig?.public?.appName }} | Athlete Career</Title>
    </Head>

    <div>
        <Loader v-if="state.isPageLoading" />
        <FormBackButton @click="goToPreviousPage" />
        <div class="mt-8">
            <ErrorAlert v-if="state.error" :message="state.error.message" />
            <ModulesCoachAthlete v-if="state.coach" :coach="state.coach" @openNewCoachModal="openNewCoachModal">
                <TableCoach :head="state.head" :body="state.body" />
                <Pagination v-if="state.body?.data?.length > 0" :data="state.body" @previous="previous()"
                    @next="next()" />
            </ModulesCoachAthlete>
            <ModalNewAthlete v-model:open="state.isNewCoachModalOpen" @saveAthlete="saveCoachAthlete" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { coachAthleteService } from '@/api/coachAthlete/CoachAthleteService'
import { useAlert } from '@/composables/alert'
import { coachService } from '~/api/coach/CoachService'

let currentPage = 1

const runtimeConfig = useRuntimeConfig()

const { successAlert } = useAlert()

const router = useRouter()
const uuid = String(router?.currentRoute?.value?.params?.uuid)

const route = useRoute()
const path = route.fullPath
const baseUrl = path.replace(`/${uuid}/coaches`, '')

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
    search: null as any,
    searchFilter: null as any,
    isNewCoachModalOpen: false,
    isCreateCoachModalOpen: false,
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
            coach_uuid: uuid
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
            state.isNewCoachModalOpen = false
        }
    } catch (error) {
        state.error = error
    }
    state.isPageLoading = false
}

async function previous() {
    currentPage--
    getCoachAthletes()
}

async function next() {
    currentPage++
    getCoachAthletes()
}

function openCreateCoachModal(data: any) {
    state.isCreateCoachModalOpen = data
}

function openNewCoachModal(data: any) {
    state.isNewCoachModalOpen = data
}

function goToPreviousPage() {
    navigateTo(baseUrl)
}
</script>