<template>

    <Head>
        <Title>{{ runtimeConfig?.public?.appName }} | Documents</Title>
    </Head>

    <div>
        <Loader v-if="state.isPageLoading" />
        <Breadcrumbs :pages="pages" class="mt-4" />
        <div class="mt-4">
            <span class="text-3xl font-bold text-blue-500">Documents</span>
        </div>
        <div class="flex items-center justify-between">
            <FormBackButton @click="goToPreviousPage" class="mt-4" />
        </div>
        <ErrorAlert v-if="state.error" :message="state.error.message" class="my-4" />
        <ModulesAthleteCoachProfile :identity="'athlete'" class="mt-4" v-if="state.athlete" :model="state.athlete" />
        <Tabs :tabs="tabs" class="mt-4" />
        <div class="mt-4">
            <div class="w-full flex justify-end gap-2">
                <FormButton @click="openRequirement" class="flex items-center gap-x-2 w-full sm:w-auto">
                    <PlusIcon class="w-6 h-6" />
                    Upload Documents
                </FormButton>
            </div>
            <TableDocument :head=state.head :body="state.files" @updateDocuements="getDocuments" />
        </div>
        <ModalEditCoachAthleteDocuments v-model:open="state.isRequirementOpen" :model="state.athlete"
            :identity="'athlete'" @editDocuments="editDocuments"
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
const athleteUrl = path.replace(path, '/athletes')
const coachUrl = path.replace('/documents', '/coaches')
const careersUrl = path.replace('/documents', '/careers')

const pages = [
    { name: 'Athletes', href: athleteUrl, current: false },
    { name: 'Documents', href: path, current: true },
]

const tabs = [
    { name: 'Performance and Career', href: careersUrl, current: false },
    { name: 'Documents', href: path, current: true },
    { name: 'Coaches', href: coachUrl, current: false },
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

async function editDocuments(data: any) {
    try {
        let params = new FormData()
        params.append('firstname', state.athlete.firstname)
        params.append('middlename', state.athlete.middlename)
        params.append('lastname', state.athlete.lastname)
        params.append('email', state.athlete.email)
        params.append('nationality', state.athlete.nationality)
        params.append('address', state.athlete.address)
        params.append('birth_date', state.athlete.birth_date)
        params.append('sex', state.athlete.sex)
        params.append('civil_status', state.athlete.civil_status)
        params.append('birth_place', state.athlete.birth_place)
        params.append('contact_no', state.athlete.contact_no)
        params.append('school_id', state.athlete.school_id)
        params.append('occupation', state.athlete.occupation)
        params.append('club_name', state.athlete.club_name)
        params.append('is_assistance', state.athlete.is_assistance)
        params.append('photo', state.athlete.image)
        if (data.identification instanceof File) {
            params.append('identification', data.identification)
        }
        if (data.birth_certificate instanceof File) {
            params.append('birth_certificate', data.birth_certificate)
        }
        if (data.pre_qualifying instanceof File) {
            params.append('pre_qualifying', data.pre_qualifying)
        }
        if (data.entry_form instanceof File) {
            params.append('entry_form', data.entry_form)
        }
        if (data.passport instanceof File) {
            params.append('passport', data.passport)
        }
        if (data.parent_consent instanceof File) {
            params.append('parent_consent', data.parent_consent)
        }
        const response = await athleteService.updateAthlete(params, uuid)
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
    navigateTo(athleteUrl)
}
</script>
