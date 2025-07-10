<template>

    <Head>
        <Title>{{ runtimeConfig?.public?.appName }} | Update Coach</Title>
    </Head>

    <div>
        <Loader v-if=state.isPageLoading />
        <FormBackButton @click="goToPreviousPage" />
        <div class="mt-8">
            <ErrorAlert v-if="state.error" :message="state.error.message" />
            <ModulesEditCoachAthleteForm v-if="state.coach" :data="state.coach"
                @loadPage="(value: boolean) => state.isPageLoading = value" @submitForm="updateCoach" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { coachService } from '@/api/coach/CoachService'
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
    fetchCoach()
})

const state = reactive({
    isPageLoading: false,
    coach: null as any,
    error: null as any
})

async function fetchCoach() {
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

async function updateCoach(data: any) {
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
        params.append('school', data.school)
        params.append('occupation', data.occupation)
        params.append('sports_team', data.sports_team)
        params.append('photo', data.photo)
        params.append('registry_date', data.registry_date)
        const response = await coachService.updateCoach(params, uuid)
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