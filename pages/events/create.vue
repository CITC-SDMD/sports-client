<template>

    <Head>
        <Title>{{ runtimeConfig?.public?.appName }} | Create Event</Title>
    </Head>

    <div>
        <Loader v-if=state.isPageLoading />
        <Breadcrumbs :pages="pages" class="mt-4" />
        <div class="mt-4">
            <span class="text-3xl font-bold text-blue-500">New Event</span>
        </div>
        <FormBackButton @click="goToPreviousPage" />
        <div class="mt-8">
            <ErrorAlert v-if="state.error" :message="state.error.message" />
            <ModulesNewEventForm @cancelAction="goToPreviousPage" @submitForm="saveEvent"
                @showError="showErrorMessage" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { eventService } from '@/api/event/EventService'
import { useAlert } from '@/composables/alert'
import moment from 'moment';

const runtimeConfig = useRuntimeConfig()

const { successAlert } = useAlert()

const route = useRoute()
const path = route.fullPath

const eventeUrl = path.replace('/create', '')

const pages = [
    { name: 'Events', href: eventeUrl, current: false },
    { name: 'New Event', href: path, current: true },
]

definePageMeta({
    layout: 'main'
})

const state = reactive({
    isPageLoading: false,
    error: null as any,
})

async function saveEvent(data: any) {
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
        const response = await eventService.createEvent(params)
        if (response.data) {
            successAlert('Success!', 'Event created.')
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
    const url = path.replace('/create', '')
    navigateTo(url)
}
</script>