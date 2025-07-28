<template>

    <Head>
        <Title>{{ runtimeConfig?.public?.appName }} | Edit Athlete</Title>
    </Head>

    <div>
        <Loader v-if="state.isPageLoading" />
        <Breadcrumbs :pages="pages" class="mt-4" />
        <div class="mt-4">
            <span class="text-3xl font-bold text-blue-500">Edit Athlete</span>
        </div>
        <FormBackButton @click="goToPreviousPage" class="mt-4" />
        <ErrorAlert v-if="state.error" :message="state.error.message" class="my-4" />
        <ModulesEditCoachAthleteForm v-if="state.athlete" :model="state.athlete" class="mt-4"
            @cancelAction="goToPreviousPage" @submitAction="editAthlete" @showError="showErrorMessage" />
    </div>
</template>

<script setup lang="ts">
import { athleteService } from '@/api/athlete/AthleteService'
import { useAlert } from '@/composables/alert'

const { successAlert, errorAlert } = useAlert()

const runtimeConfig = useRuntimeConfig()

const route = useRoute()
const path = route.fullPath

const router = useRouter()
const uuid = String(router?.currentRoute?.value?.params?.uuid)

const athleteUrl = path.replace(`/${uuid}/edit`, '')

const pages = [
    { name: 'Athletes', href: athleteUrl, current: false },
    { name: 'Edit Athlete', href: path, current: true },
]

definePageMeta({
    layout: 'main'
})

onMounted(() => {
    getAthlete()
})

const state = reactive({
    isPageLoading: false,
    error: null as any,
    athlete: null as any
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
        params.append('photo', data.image)
        params.append('address', data.address)
        const response = await athleteService.updateAthlete(params, uuid)
        if (response.data) {
            state.athlete = response.data
            successAlert('Success!', 'Athlete updated.')
            navigateTo(athleteUrl)
        }
    } catch (error) {
        errorAlert('Error!', 'Error in updating athlete.')
        state.error = error
    }
    state.isPageLoading = false
}

function showErrorMessage(data: any) {
    state.error = data
}

function goToPreviousPage() {
    navigateTo(athleteUrl)
}
</script>