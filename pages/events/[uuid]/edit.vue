<template>

    <Head>
        <Title>{{ runtimeConfig?.public?.appName }} | Edit Event</Title>
    </Head>

    <div>
        <Loader v-if="state.isPageLoading" />
        <Breadcrumbs :pages="pages" class="mt-4" />
        <div class="mt-4">
            <span class="text-3xl font-bold text-blue-500">Edit Event</span>
        </div>
        <FormBackButton @click="goToPreviousPage" class="mt-4" />
        <ErrorAlert v-if="state.error" :message="state.error.message" class="my-4" />
        <ModulesEditEventForm v-if="state.event" :event="state.event" @submitForm="editEvent"
            @showError="showErrorMessage" @cancelAction="goToPreviousPage" />
    </div>
</template>

<script setup lang="ts">
import { ModulesEditEventForm } from '#components';
import { eventService } from '@/api/event/EventService';
import { useAlert } from '@/composables/alert'
import moment from 'moment';

const runtimeConfig = useRuntimeConfig()

const { successAlert } = useAlert()

const route = useRoute()
const path = route.fullPath

const router = useRouter()
const uuid = String(router?.currentRoute?.value?.params?.uuid)

const eventUrl = path.replace(`/${uuid}/edit`, '')

const pages = [
    { name: 'Events', href: eventUrl, current: false },
    { name: 'Edit Event', href: path, current: true },
]

definePageMeta({
    layout: 'main'
})

const state = reactive({
    isPageLoading: false,
    error: null as any,
    event: null as any,
})

onMounted(() => {
    fetchUser()
})

async function fetchUser() {
    state.isPageLoading = true
    try {
        const response = await eventService.fetchEvent(uuid)
        if (response.data) {
            state.event = response.data
        }
    } catch (error) {
        state.error = error
    }
    state.isPageLoading = false
}

async function editEvent(data: any) {
    state.isPageLoading = true
    try {
        let params = {
            event_name: data.event_name,
            event_type: data.event_type,
            sport_id: data.sport_id,
            organizer: data.organizer,
            description: data.description,
            event_start: moment(data.event_start).format('MM/DD/YYYY'),
            event_end: moment(data.event_end).format('MM/DD/YYYY'),
            age_category: data.age_category,
            gender_category: data.gender_category,
            participant_type: data.participant_type,
            venue_name: data.venue_name,
            location: data.location,
            capacity: data.capacity
        }
        const response = await eventService.updateEvent(params, uuid)
        if (response.data) {
            successAlert('Success!', 'Event updated.')
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
    navigateTo(eventUrl)
}
</script>
