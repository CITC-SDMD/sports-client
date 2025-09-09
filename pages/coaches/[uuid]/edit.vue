<template>

    <Head>
        <Title>{{ runtimeConfig?.public?.appName }} | Edit coach</Title>
    </Head>

    <div>
        <Loader v-if="state.isPageLoading" />
        <Breadcrumbs :pages="pages" class="mt-4" />
        <div class="mt-4">
            <span class="text-3xl font-bold text-blue-500">Edit Coach</span>
        </div>
        <FormBackButton @click="goToPreviousPage" class="mt-4" />
        <ErrorAlert v-if="state.error" :message="state.error.message" class="my-4" />
        <ModulesEditCoachAthleteForm :entity="'coach'" v-if="state.coach" :model="state.coach" class="mt-4"
            @cancelAction="goToPreviousPage" @submitAction="editAthlete" @showError="showErrorMessage" />
    </div>
</template>

<script setup lang="ts">
import { coachService } from '@/api/coach/CoachService'
import { useAlert } from '@/composables/alert'

const { successAlert, errorAlert } = useAlert()

const runtimeConfig = useRuntimeConfig()

const route = useRoute()
const path = route.fullPath

const router = useRouter()
const uuid = String(router?.currentRoute?.value?.params?.uuid)

const coachUrl = path.replace(`/${uuid}/edit`, '')

const pages = [
    { name: 'Coaches', href: coachUrl, current: false },
    { name: 'Edit coach', href: path, current: true },
]

definePageMeta({
    layout: 'main'
})

onMounted(() => {
    getCoach()
})

const state = reactive({
    isPageLoading: false,
    error: null as any,
    coach: null as any
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

async function editAthlete(data: any) {
    state.isPageLoading = true
    try {
        let params = new FormData()
        params.append('firstname', data.firstname)
        params.append('middlename', data.middlename)
        params.append('lastname', data.lastname)
        params.append('email', data.email)
        params.append('nationality', data.nationality)
        params.append('birth_date', data.birth_date)
        params.append('sex', data.sex)
        params.append('civil_status', data.civil_status)
        params.append('birth_place', data.birth_place)
        params.append('contact_no', data.contact_no)
        params.append('school_id', data.school_id)
        params.append('occupation', data.occupation)
        params.append('club_name', data.club_name)
        params.append('is_assistance', data.is_assistance)
        params.append('photo', data.image)
        params.append('address', data.address)
        params.append('identification', data.identification)
        params.append('birth_certificate', data.birth_certificate)
        params.append('pre_qualifying', data.pre_qualifying)
        params.append('entry_form', data.entry_form)
        params.append('passport', data.passport)
        params.append('parent_consent', data.parent_consent)
        const response = await coachService.updateCoach(params, uuid)
        if (response.data) {
            state.coach = response.data
            successAlert('Success!', 'coache updated.')
            navigateTo(coachUrl)
        }
    } catch (error) {
        errorAlert('Error!', 'Error in updating coache.')
        state.error = error
    }
    state.isPageLoading = false
}

function showErrorMessage(data: any) {
    state.error = data
}

function goToPreviousPage() {
    navigateTo(coachUrl)
}
</script>