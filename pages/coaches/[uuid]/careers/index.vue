<template>

    <Head>
        <Title>{{ runtimeConfig?.public?.appName }} | Coach Career</Title>
    </Head>

    <div>
        <Loader v-if="state.isPageLoading" />
        <FormBackButton @click="goToPreviousPage" />
        <div class="mt-8">
            <ModulesCoachCareer v-if="state.coach" :coach="state.coach">
                <TableCareer v-if="state.body" :head="state.head" :body="state.body" />
                <Pagination v-if="state.body?.data?.length > 0" :data="state.body" @previous="previous()"
                    @next="next()" />
            </ModulesCoachCareer>
        </div>
    </div>
</template>

<script setup lang="ts">
import { careerService } from '@/api/career/CareerService'
import { coachService } from '@/api/coach/CoachService'

let currentPage = 1

const runtimeConfig = useRuntimeConfig()

const router = useRouter()
const uuid = router?.currentRoute?.value?.params?.uuid

const route = useRoute()
const path = route.fullPath
const profileUrl = path.replace('/career', '/profile')
const baseUrl = path.replace(`/${uuid}/career`, '')

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
    body: [] as any
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
            model_uuid: uuid
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
</script>