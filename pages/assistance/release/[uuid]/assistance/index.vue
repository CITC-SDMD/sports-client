<template>

    <Head>
        <Title>{{ runtimeConfig?.public?.appName }} | Athlete Assistance</Title>
    </Head>

    <div>
        <Loader v-if=state.isPageLoading />
        <div>
            <Breadcrumbs :pages="pages" />
        </div>

        <div class="mt-4">
            <span class="text-3xl font-bold text-blue-500">Athlete Assistance</span>
        </div>
        <FormBackButton @click="goToPreviousPage" />
        <ErrorAlert v-if="state.error" :message="state.error.message" />
        <ModulesAthleteCoachProfile :identity="'athlete'" class="mt-4" v-if="state.athlete" :model="state.athlete" />
        <div class="w-full flex justify-end mt-4">
            <FormButton @click="goToCreateAssistance" class="flex items-center gap-x-2">
                <PlusIcon class="w-6 h-6" />
                New assistance
            </FormButton>
        </div>
        <TableRequestAssistance :head=state.head :body="state.body" />
        <Pagination v-if="state.body?.data?.length > 0" :data="state.body" @previous="previous()" @next="next()" />
    </div>
</template>

<script setup lang="ts">
import { athleteService } from '@/api/athlete/AthleteService'
import { assistanceService } from '@/api/assistance/AssistanceService';
import { PlusIcon, MagnifyingGlassIcon } from '@heroicons/vue/20/solid'
import { useAlert } from '@/composables/alert'

let currentPage = 1

const { successAlert } = useAlert()

const runtimeConfig = useRuntimeConfig()
const router = useRouter()
const uuid = String(router?.currentRoute?.value?.params?.uuid)

const route = useRoute()
const path = route.fullPath
console.log('path', path)
const processUrl = path.replace(`/${uuid}/assistance`, '')

const pages = [
    { name: 'Assistance', href: processUrl, current: false },
    { name: 'Athlete Assistance', href: path, current: true },
]

definePageMeta({
    layout: 'main'
})

const state = reactive({
    head: [
        { name: 'Assistance' },
        { name: 'Discription' },
        { name: 'Provider' },
    ],
    athleteUuid: uuid as string,
    athlete: null as any,
    body: [] as any,
    search: null as any,
    searchFilter: null as any,
    isPageLoading: false,
    error: null as any,
})

onMounted(() => {
    getAthlete()
    getAssistance()
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

async function getAssistance() {
    state.isPageLoading = true
    try {
        let params = {
            athlete_uuid: uuid,
        }
        const response = await assistanceService.fetchAssistances(params)
        if (response.data) {
            state.body = response
        }
    } catch (error) {
        state.error = error
    } finally {
        state.isPageLoading = false
    }
}

async function previous() {
    currentPage--
}

async function next() {
    currentPage++
}

function showErrorMessage(data: any) {
    state.error = data
}

function goToCreateAssistance() {
    navigateTo(`${path}/create`)
}

function goToPreviousPage() {
    navigateTo(processUrl)
}
</script>