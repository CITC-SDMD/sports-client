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
        <ModulesAthleteCoachProfile :identity="'coach'" class="mt-4" v-if="state.coach" :model="state.coach" />
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
        <ModalEditCoachAthleteDocuments v-model:open="state.isRequirementOpen" :model="state.coach"
            @editDocuments="editDocuments" :identity="'coach'"
            @closeRequirement="(value: any) => state.isRequirementOpen = value" />
    </div>
</template>

<script setup lang="ts">
import { coachService } from '@/api/coach/CoachService'
import { documentService } from '@/api/document/DocumentService'
import { PlusIcon } from '@heroicons/vue/20/solid'
import { useAlert } from '@/composables/alert'

const { successAlert } = useAlert()

const runtimeConfig = useRuntimeConfig()

const router = useRouter()
const uuid = String(router?.currentRoute?.value?.params?.uuid)

const route = useRoute()
const path = route.fullPath
const baseUrl = path.replace(path, '/coaches')
const athleteUrl = path.replace('/documents', '/athletes')
const careersUrl = path.replace('/documents', '/careers')

const pages = [
    { name: 'Coaches', href: athleteUrl, current: false },
    { name: 'Documents', href: path, current: true },
]

const tabs = [
    { name: 'Performance and Career', href: careersUrl, current: false },
    { name: 'Documents', href: path, current: true },
    { name: 'Athletes', href: athleteUrl, current: false },
]

definePageMeta({
    layout: 'main'
})

onMounted(() => {
    getCoach()
    getDocuments()
})

const state = reactive({
    isPageLoading: false,
    isRequirementOpen: false,
    head: [
        { name: 'File name' },
        { name: 'File' },
    ],
    coach: null as any,
    files: [] as any,
    error: null as any
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
        params.append('firstname', state.coach.firstname)
        params.append('middlename', state.coach.middlename)
        params.append('lastname', state.coach.lastname)
        params.append('email', state.coach.email)
        params.append('nationality', state.coach.nationality)
        params.append('address', state.coach.address)
        params.append('birth_date', state.coach.birth_date)
        params.append('sex', state.coach.sex)
        params.append('civil_status', state.coach.civil_status)
        params.append('birth_place', state.coach.birth_place)
        params.append('contact_no', state.coach.contact_no)
        params.append('school_id', state.coach.school_id)
        params.append('occupation', state.coach.occupation)
        params.append('club_name', state.coach.club_name)
        params.append('is_assistance', state.coach.is_assistance)
        params.append('photo', state.coach.image)
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
        const response = await coachService.updateCoach(params, uuid)
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
