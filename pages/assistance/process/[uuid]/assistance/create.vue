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
            <span class="text-3xl font-bold text-blue-500">New Assistance</span>
        </div>
        <FormBackButton @click="goToPreviousPage" />
        <div class="mt-8">
            <ErrorAlert v-if="state.error" :message="state.error.message" />
            <ModulesNewAssistance @cancelAction="goToPreviousPage" @submitForm="saveAssistance"
                @showError="showErrorMessage" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { assistanceService } from '@/api/assistance/AssistanceService';
import { useAlert } from '@/composables/alert'
import moment from 'moment';

const { successAlert } = useAlert()

const runtimeConfig = useRuntimeConfig()
const router = useRouter()
const uuid = String(router?.currentRoute?.value?.params?.uuid)

const route = useRoute()
const path = route.fullPath
const processUrl = path.replace(`/${uuid}/assistance/create`, `/${uuid}/assistance`)

const pages = [
    { name: 'Assistances', href: processUrl, current: false },
    { name: 'New Assistance', href: path, current: true },
]

definePageMeta({
    layout: 'main'
})

const state = reactive({
    isPageLoading: false,
    error: null as any,
})

async function saveAssistance(data: any) {
    console.log('date_applied', data.date_applied)
    console.log('date_released', data.date_released)

    state.isPageLoading = true
    try {
        let params = {
            athlete_uuid: uuid,
            type_assistance: data.type_assistance,
            amount: data.amount,
            provider: data.provider,
            date_applied: moment(data.date_applied).format('MM/DD/YYYY'),
            date_released: moment(data.date_released).isValid()
                ? moment(data.date_released).format('MM/DD/YYYY')
                : null,
        }
        const response = await assistanceService.createAssistance(params)
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