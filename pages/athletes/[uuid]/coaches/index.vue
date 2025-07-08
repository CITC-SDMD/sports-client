<template>

    <Head>
        <Title>{{ runtimeConfig?.public?.appName }} | Athlete Career</Title>
    </Head>

    <div>
        <Loader v-if="state.isPageLoading" />
        <ErrorAlert v-if="state.error" :message="state.error.message" />
        <FormBackButton @click="goToPreviousPage" />
        <div class="mt-8">
            <ModulesAthleteCoach v-if="state.athlete" :player="state.athlete">
            </ModulesAthleteCoach>
        </div>
    </div>
</template>

<script setup lang="ts">
import { athleteService } from '@/api/athlete/AthleteService';

const runtimeConfig = useRuntimeConfig()

const router = useRouter()
const uuid = router?.currentRoute?.value?.params?.uuid

const route = useRoute()
const path = route.fullPath;
const baseUrl = path.replace(`/${uuid}/coaches`, '')

definePageMeta({
    layout: 'main'
})

onMounted(() => {
    getAthlete()
})

const state = reactive({
    isPageLoading: false,
    athlete: null as any,
    error: null as any,
    athleteUuid: uuid as string,
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

function goToPreviousPage() {
    navigateTo(baseUrl)
}
</script>