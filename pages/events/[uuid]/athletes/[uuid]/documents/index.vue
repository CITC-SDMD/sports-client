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
            <div class="w-full flex justify-end gap-2">
                <FormButton @click="openRequirement" class="flex items-center gap-x-2 w-full sm:w-auto">
                    <PlusIcon class="w-6 h-6" />
                    Upload Documents
                </FormButton>
            </div>
            <TableDocument :head=state.head :body="state.files" @updateDocuements="getDocuments" />
        </div>
        <ModalNewDocuments v-model:open="state.isRequirementOpen" @saveDocuments="saveDocuments"
            @closeRequirement="(value: any) => state.isRequirementOpen = value" />
    </div>
</template>

<script setup lang="ts">
import { athleteService } from '@/api/athlete/AthleteService'
import { documentService } from '@/api/document/DocumentService'
import { PlusIcon } from '@heroicons/vue/20/solid'
import { useAlert } from '@/composables/alert'

const { successAlert } = useAlert()

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
    isRequirementOpen: false,
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
    state.isPageLoading = true
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
    state.isPageLoading = false
}

async function saveDocuments(data: any) {
    try {
        let params = new FormData
        params.append('athlete_uuid', uuid)
        params.append('identification', data.identification)
        params.append('birth_certificate', data.birth_certificate)
        params.append('pre_qualifying', data.pre_qualifying)
        params.append('entry_form', data.entry_form)
        params.append('passport', data.passport)
        params.append('parent_consent', data.parent_consent)
        params.append('request_letter', data.request_letter)
        params.append('brgy_clearance', data.brgy_clearance)
        const response = await documentService.createDocuments(params)
        if (response.data) {
            getDocuments()
            state.isRequirementOpen = false
            successAlert('Success.', 'Documents saved.')
        }
    } catch (error) {
        state.error = error
    }
}

function openRequirement() {
    state.isRequirementOpen = true
}

function goToPreviousPage() {
    navigateTo(baseUrl)
}
</script>
