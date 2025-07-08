<template>

    <Head>
        <Title>{{ runtimeConfig?.public?.appName }} | Coach Profile</Title>
    </Head>

    <div>
        <Loader v-if="state.isPageLoading" />
        <ErrorAlert v-if="state.error" :message="state.error.message" />
        <FormBackButton @click="goToPreviousPage" />
        <div class="mt-8">
            <ModulesCoachProfile v-if="state.coach" :coach="state.coach" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { coachService } from '@/api/coach/CoachService'

const runtimeConfig = useRuntimeConfig()

const router = useRouter()
const uuid = router?.currentRoute?.value?.params?.uuid

const route = useRoute()
const path = route.fullPath;

definePageMeta({
    layout: 'main'
})

onMounted(() => {
    getCoach()
})

const state = reactive({
    isPageLoading: false,
    coach: null as any,
    error: null as any,
    coachUuid: uuid as string
})

async function getCoach() {
    state.isPageLoading = true
    try {
        const response = await coachService.fetchCoach(state.coachUuid)
        if (response.data) {
            state.coach = response.data
        }
    } catch (error) {
        state.error = error
    }
    state.isPageLoading = false
}


function goToPreviousPage() {
    const url = path.replace(`/${uuid}/profile`, '')
    navigateTo(url)
}

</script>