<template>

    <Head>
        <Title>{{ runtimeConfig?.public?.appName }} | Update Athlete</Title>
    </Head>

    <div>
        <Loader v-if=state.isPageLoading />
        <FormBackButton @click="goToPreviousPage" />
        <div class="mt-8">
            <ErrorAlert v-if="state.error" :message="state.error.message" />
            <ModulesEditCoachAthleteForm v-if="state.athlete" :data="state.athlete"
                @loadPage="(value: boolean) => state.isPageLoading = value" @submitForm="updateAthlete" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { athleteService } from '@/api/athlete/AthleteService'
import { useAlert } from '@/composables/alert'

const runtimeConfig = useRuntimeConfig()
const route = useRoute()
const path = route.fullPath
const router = useRouter()
const uuid = String(router?.currentRoute?.value?.params?.uuid)
const { successAlert } = useAlert()

definePageMeta({
    layout: 'main'
})

onMounted(() => {
    fetchAthlete()
})

const state = reactive({
    isPageLoading: false,
    athlete: null as any,
    error: null as any
})

async function fetchAthlete() {
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

async function updateAthlete(data: any) {
    state.isPageLoading = true
    try {
        let params = new FormData
        params.append('firstname', data.firstname)
        params.append('middlename', data.middlename)
        params.append('lastname', data.lastname)
        params.append('address', data.address)
        params.append('age', data.age)
        params.append('birthdate', data.birthdate)
        params.append('birth_place', data.birth_place)
        params.append('civil_status', data.civil_status)
        params.append('gender', data.gender)
        params.append('contact_no', data.contact_no)
        params.append('religion_id', data.religion_id)
        params.append('school_id', data.school_id)
        params.append('occupation', data.occupation)
        params.append('sports_team', data.sports_team)
        params.append('photo', data.photo)
        params.append('registry_date', data.registry_date)
        const response = await athleteService.updateAthlete(params, uuid)
        if (response.data) {
            successAlert('Success!', 'Athlete update.')
            goToPreviousPage()
        }
    } catch (error) {
        state.error = error
    }
    state.isPageLoading = false
}

function goToPreviousPage() {
    const url = path.replace('/edit', '')
    navigateTo(url)
}
</script>