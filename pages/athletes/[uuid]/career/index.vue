<template>
    <div>
        <Loader v-if="state.isPageLoading" />
        <FormBackButton @click="goToPreviousPage" />
        <div class="mt-8">
            <ModulesAthleteCareer v-if="state.athlete" :player="state.athlete" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { athleteService } from '@/api/athlete/AthleteService';

const router = useRouter()
const uuid = router?.currentRoute?.value?.params?.uuid

const route = useRoute()
const path = route.fullPath;
const profileUrl = path.replace('/career', '/profile')
const baseUrl = path.replace(`/${uuid}/career`, '')

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
    athleteUuid: uuid as string
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