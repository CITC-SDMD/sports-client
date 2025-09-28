<template>

    <Head>
        <Title>{{ runtimeConfig?.public?.appName }} | Athlete Assistance</Title>
    </Head>

    <div>
        <Loader v-if=state.isPageLoading />
        <div>
            <Breadcrumbs :pages="pages" />
        </div>

        <div class="mt-4">
            <span class="text-3xl font-bold text-blue-500">Edit Assistance</span>
        </div>
        <FormBackButton @click="goToPreviousPage" />
        <div class="mt-8">
            <ErrorAlert v-if="state.error" :message="state.error.message" />
            <ModulesEditAssistance v-if="state.assistance" :career="state.assistance" @submitForm="editAssistance"
                :model="'athlete'" @cancelAction="goToPreviousPage" @showError="showErrorMessage" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { assistanceService } from '@/api/assistance/AssistanceService';
import { useAlert } from '@/composables/alert'

const { successAlert } = useAlert()

const runtimeConfig = useRuntimeConfig()
const router = useRouter()
const uuid = String(router?.currentRoute?.value?.params?.uuid)

const route = useRoute()
const path = route.fullPath
const processUrl = path.replace(`/${uuid}/edit`, '')

const pages = [
    { name: 'Assistances', href: processUrl, current: false },
    { name: 'Edit Assistance', href: path, current: true },
]

definePageMeta({
    layout: 'main'
})

const state = reactive({
    assistance: null as any,
    isPageLoading: false,
    error: null as any,
})

onMounted(() => {
    getAssistance()
})

async function getAssistance() {
    state.isPageLoading = true
    try {
        const response = await assistanceService.fetchAssistance(uuid)
        if (response.data) {
            state.assistance = response.data
        }
    } catch (error) {
        state.error = error
    }
    state.isPageLoading = false
}


async function editAssistance(data: any) {
    state.isPageLoading = true
    try {
        let params = {
            type_assistance: data.type_assistance,
            description: data.description,
            provider: data.provider,
        }
        const response = await assistanceService.updateAssistance(params, uuid)
        if (response.data) {
            successAlert('Success!', 'Assistance created.')
            goToPreviousPage()
        }
    } catch (error) {
        state.error = error
    } finally {
        state.isPageLoading = false
    }
}

function showErrorMessage(data: any) {
    state.error = data
}

function goToPreviousPage() {
    navigateTo(processUrl)
}
</script>