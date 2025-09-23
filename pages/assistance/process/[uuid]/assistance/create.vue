<template>

    <Head>
        <Title>{{ runtimeConfig?.public?.appName }} | Create Assistance</Title>
    </Head>

    <div>
        <Loader v-if=state.isPageLoading />
        <Breadcrumbs :pages="pages" class="mt-4" />
        <div class="mt-4">
            <span class="text-3xl font-bold text-blue-500">New Assistance</span>
        </div>
        <FormBackButton @click="goToPreviousPage" />
        <div class="mt-8">
            <ErrorAlert v-if="state.error" :message="state.error.message" />
            <ModulesNewAssistance @cancelAction="goToPreviousPage" @submitForm="saveEvent"
                @showError="showErrorMessage" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { eventService } from '@/api/event/EventService'
import { useAlert } from '@/composables/alert'
import moment from 'moment';

const { successAlert } = useAlert()

const runtimeConfig = useRuntimeConfig()
const router = useRouter()
const uuid = String(router?.currentRoute?.value?.params?.uuid)

const route = useRoute()
const path = route.fullPath
const processUrl = path.replace(`/${uuid}/assistance/create`, '')

const pages = [
    { name: 'Assistance', href: processUrl, current: false },
    { name: 'New Assistance', href: path, current: true },
]

definePageMeta({
    layout: 'main'
})

const state = reactive({
    isPageLoading: false,
    error: null as any,
})

// async function saveAssistance(data: any) {
//     state.isPageLoading = true
//     try {
//         let params = {

//         }
//         const response = await eventService.createEvent(params)
//         if (response.data) {
//             successAlert('Success!', 'Event created.')
//             goToPreviousPage()
//         }
//     } catch (error) {
//         state.error = error
//     } finally {
//         state.isPageLoading = false
//     }
// }

function showErrorMessage(data: any) {
    state.error = data
}

function goToPreviousPage() {
    navigateTo(processUrl)
}
</script>