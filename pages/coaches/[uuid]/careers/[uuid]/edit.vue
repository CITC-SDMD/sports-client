<template>

    <Head>
        <Title>{{ runtimeConfig?.public?.appName }} | Edit career</Title>
    </Head>

    <div>
        <Loader v-if="state.isPageLoading" />
        <FormBackButton @click="goToPreviousPage" />
        <div class="mt-8">
            <ErrorAlert v-if="state.error" :message="state.error.message" />
            <ModulesEditCareerForm v-if="state.career" :career="state.career" @submitForm="editCareer"
                :model="'coach'" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { careerService } from '~/api/career/CareerService'
import { useAlert } from '~/composables/alert'


const { successAlert } = useAlert()

const route = useRoute()
const path = route.fullPath

const runtimeConfig = useRuntimeConfig()

const router = useRouter()
const uuid = String(router?.currentRoute?.value?.params?.uuid)

definePageMeta({
    layout: 'main'
})

onMounted(() => {
    fetchCareer()
})

const state = reactive({
    isPageLoading: false,
    error: null as any,
    career: null as any
})

async function fetchCareer() {
    state.isPageLoading = true
    try {
        const response = await careerService.fetchCareer(uuid)
        if (response.data) {
            state.career = response.data
        }
    } catch (error) {
        state.error = error
    }
    state.isPageLoading = false
}

async function editCareer(data: any) {
    state.isPageLoading = true
    try {
        let params = {
            model_uuid: uuid,
            id_number: data.id_number,
            performance_id: data.performance_id,
            career_date: data.career_date,
            sport_id: data.sport_id,
            competition_id: data.competition_id,
            position_role: data.position_role,
            highlights: data.highlights,
            awards: data.awards,
            coach_status: data.coach_status ?? null,
            is_injured: data.is_injured ?? null,
            affiliations: data.affiliations ?? null,
            sports_asso: data.sports_asso ?? null,
            training_seminar: data.training_seminar ?? null,
            play_status: data.play_status ?? null,
            health_status: data.health_status ?? null,
            injury: data.injury ?? null,
            injury_date: data.injury_date ?? null,
            injury_desc: data.injury_desc ?? null,
        }
        const response = await careerService.updateCareer(params, uuid)
        if (response.data) {
            successAlert('Success!', 'Career updated.')
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