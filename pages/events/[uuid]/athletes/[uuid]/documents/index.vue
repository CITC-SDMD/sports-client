<template>

    <Head>
        <Title>{{ runtimeConfig?.public?.appName }} | Documents</Title>
    </Head>

    <div>
        <Loader v-if="state.isPageLoading" />
        <Breadcrumbs :pages="pages" class="mt-4" />
        <div class="mt-4">
            <span class="text-3xl font-bold text-blue-500">Athlete Documents</span>
        </div>
        <div class="flex items-center justify-between">
            <FormBackButton @click="goToPreviousPage" class="mt-4" />
        </div>
        <ErrorAlert v-if="state.error" :message="state.error.message" class="my-4" />
        <ModulesAthleteCoachProfile class="mt-4" v-if="state.athlete" :model="state.athlete" />
        <div class="mt-4">
            <TableDocument :head=state.head :body="state.files" @refresh="getDocuments" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { athleteService } from '@/api/athlete/AthleteService'
import { documentService } from '@/api/document/DocumentService'

const runtimeConfig = useRuntimeConfig()

const router = useRouter()
const uuid = String(router?.currentRoute?.value?.params?.uuid)

const route = useRoute()
const path = route.fullPath
const baseUrl = path.replace(`/${uuid}/documents`, '')

const pages = [
    { name: 'Events', href: baseUrl, current: false },
    { name: 'Athlete Documents', href: path, current: true },
]

definePageMeta({
    layout: 'main'
})

onMounted(() => {
    getAthlete()
    getDocuments()
})

const state = reactive({
    isPageLoading: false,
    head: [
        { name: 'File name' },
        { name: 'File' },
    ],
    athlete: null as any,
    files: [] as any,
    error: null as any
})

async function getAthlete() {
    state.isPageLoading = true
    try {
        const response = await athleteService.fetchAthlete(uuid)
        if (response.data) {
            state.athlete = response.data
        }
    } catch (error) {
        state.error = error
    }
    state.isPageLoading = false
}

async function getDocuments() {
    try {
        let params = {
            model_uuid: uuid
        }
        const response = await documentService.fetchDocuments(params)
        if (response.data) {
            state.files = response
        }
    } catch (error) {
        state.error = error
    }
}

function goToPreviousPage() {
    navigateTo(baseUrl)
}
</script>
