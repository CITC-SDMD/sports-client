<template>

    <Head>
        <Title>{{ runtimeConfig?.public?.appName }} | Athletes</Title>
    </Head>

    <div>
        <Loader v-if="state.isPageLoading" />
        <Breadcrumbs :pages="pages" class="mt-4" />
        <div class="mt-4">
            <span class="text-3xl font-bold text-blue-500">Events</span>
        </div>
        <div class="flex items-center justify-between">
            <FormBackButton @click="goToPreviousPage" class="mt-4" />
        </div>
        <ErrorAlert v-if="state.error" :message="state.error.message" class="my-4" />
        <ModulesEventProfile class="mt-4" v-if="state.event" :model="state.event" />
        <Tabs :tabs="tabs" class="mt-4" />
        <div class="mt-4">
            <div class="w-full flex justify-end">
                <FormButton @click="saveQualifiedAthlete" class="flex items-center gap-x-2 w-full sm:w-auto">
                    <PlusIcon class="w-6 h-6" />
                    Qualified athletes
                </FormButton>
            </div>
            <TableAthleteCoach :head=state.head :body="state.body" />
            <Pagination v-if="state.body?.data?.length > 0" :data="state.body" @previous="previous()" @next="next()" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { eventService } from '@/api/event/EventService'
import { useAlert } from '@/composables/alert'
import { PlusIcon } from '@heroicons/vue/20/solid'

let currentPage = 1

const runtimeConfig = useRuntimeConfig()

const { successAlert } = useAlert()

const router = useRouter()
const uuid = String(router?.currentRoute?.value?.params?.uuid)

const route = useRoute()
const path = route.fullPath
const baseUrl = path.replace(`/${uuid}/athletes`, '')

const pages = [
    { name: 'Events', href: baseUrl, current: false },
    { name: 'Qualified athletes', href: path, current: true },
]

const tabs = [
    { name: 'Qualified Athletes', href: path, current: true },
]

definePageMeta({
    layout: 'main'
})

onMounted(() => {
    getEvent()
})

const state = reactive({
    isPageLoading: false,
    head: [
        { name: 'Full name' },
        { name: 'Gender' },
        { name: 'Date of birth' },
        { name: 'Age' },
        { name: 'Contact no.' },
    ],
    body: [] as any,
    event: null as any,
    error: null as any,
    searchFilter: null as any,
    search: null as any,
})

async function getEvent() {
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

async function saveQualifiedAthlete() {
    state.isPageLoading = true
    try {
        const response = await eventService.fetchQualifiedAthletes(uuid)
        if (response.data) {
            state.body = response
            successAlert('Success!', 'Qualified created.')
        }
    } catch (error) {
        state.error = error
    }
    state.isPageLoading = false
}

async function previous() {
    currentPage--
}

async function next() {
    currentPage++

}

function goToPreviousPage() {
    navigateTo(baseUrl)
}
</script>