<template>

    <Head>
        <Title>{{ runtimeConfig?.public?.appName }} | Events</Title>
    </Head>

    <div>
        <Loader v-if="state.isPageLoading" />
        <div>
            <Breadcrumbs :pages="pages" />
        </div>

        <div class="mt-4">
            <span class="text-3xl font-bold text-blue-500">Events</span>
        </div>

        <ErrorAlert v-if="state.error" :message="state.error.message" />
        <div class="w-full flex justify-end">
            <FormButton @click="goToCreateEvent" class="flex items-center gap-x-2">
                <PlusIcon class="w-6 h-6" />
                New event
            </FormButton>
        </div>
        <div class="w-full mt-4">
            <form @submit.prevent="search" class="flex w-full space-x-4">
                <FormTextField name="search" v-model=state.searchFilter class="w-full" placeholder="Search event" />
                <FormButton type="submit" class="flex items-center gap-x-2">
                    <MagnifyingGlassIcon class="w-6 h-6" />
                    Search
                </FormButton>
            </form>
        </div>
        <TableEvent :head=state.head :body="state.body" />
        <Pagination v-if="state.body?.data?.length > 0" :data="state.body" @previous="previous()" @next="next()" />
    </div>
</template>

<script setup lang="ts">
import { PlusIcon, MagnifyingGlassIcon } from '@heroicons/vue/20/solid'
import { eventService } from '@/api/event/EventService'
import { TableEvent } from '#components'

let currentPage = 1

const runtimeConfig = useRuntimeConfig()

const route = useRoute()
const path = route.fullPath

const pages = [
    { name: 'Events', href: path, current: true },
]

definePageMeta({
    layout: 'main'
})

const state = reactive({
    isPageLoading: false,
    error: null as any,
    head: [
        { name: 'ID' },
        { name: 'Event name' },
        { name: 'Event type' },
        { name: 'Sport' },
        { name: 'Organizer' },
        { name: 'Event status' }
    ],
    body: [] as any,
    search: null as any,
    searchFilter: null as any
})

onMounted(() => {
    getEvents()
})

async function getEvents() {
    state.isPageLoading = true
    try {
        let params = {
            page: currentPage,
            search: state.search
        }
        const response = await eventService.fetchEvents(params)
        if (response.data) {
            state.body = response
        }
    } catch (error) {
        state.error = error
    }
    state.isPageLoading = false
}

async function search() {
    currentPage = 1
    if (typeof state.searchFilter === 'string') {
        state.search = state.searchFilter?.trim() || ''
    } else if (Array.isArray(state.searchFilter)) {
        state.search = JSON.stringify(state.searchFilter?.filter(Boolean) || [])
    }
    getEvents()
}

async function previous() {
    currentPage--
    getEvents()
}

async function next() {
    currentPage++
    getEvents()
}

function goToCreateEvent() {
    navigateTo(`${path}/create`)
}
</script>