<template>

    <Head>
        <Title>{{ runtimeConfig?.public?.appName }} | Career</Title>
    </Head>

    <div>
        <Loader v-if="state.isPageLoading" />
        <ErrorAlert v-if="state.error" :message="state.error.message" />
        <FormBackButton @click="goToPreviousPage" />
        <div class="mt-8">
            <div class="overflow-hidden rounded-lg bg-white shadow mb-6">
                <div class="px-4 py-5 sm:p-6 flex items-center gap-x-4">
                    <div>
                        <img :src="state.career?.model?.photo" alt="Profile Photo" v-if="state.career?.model?.photo" />
                        <img v-else :src="avatarUrl" />
                    </div>
                    <div>
                        <span class="text-4xl font-bold">
                            {{ state.career?.model?.firstname }}
                            {{ state.career?.model?.middlename ?? '' }}
                            {{ state.career?.model?.lastname }}
                        </span>
                    </div>
                </div>
            </div>
            <ModulesCareerInfo v-if="state.career" :career="state.career" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { careerService } from '@/api/career/CareerService';

const runtimeConfig = useRuntimeConfig()

const avatarUrl = ref('/img/avatars/user.svg')

const route = useRoute()
const path = route.fullPath;

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

function goToPreviousPage() {
    const url = path.replace(`/${uuid}`, '')
    navigateTo(url)
}
</script>