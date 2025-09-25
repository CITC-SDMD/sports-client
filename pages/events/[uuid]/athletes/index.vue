<template>

    <Head>
        <Title>{{ runtimeConfig?.public?.appName }} | Athletes</Title>
    </Head>

    <div>
        <Loader v-if="state.isPageLoading" />
        <Breadcrumbs :pages="pages" class="mt-4" />
        <div class="mt-4">
            <span class="text-3xl font-bold text-blue-500">Qualified athletes</span>
        </div>
        <div class="flex items-center justify-between">
            <FormBackButton @click="goToPreviousPage" class="mt-4" />
        </div>
        <ErrorAlert v-if="state.error" :message="state.error.message" class="my-4" />
        <ModulesEventProfile class="mt-4" v-if="state.event" :model="state.event" />
        <Tabs :tabs="tabs" class="mt-4" />
        <div class="mt-4">
            <div class="w-full flex justify-end gap-2">
                <MenuInvitation @isPageLoading="isPageLoading" @error="state.error" />
            </div>
            <div class="w-full mt-4">
                <form @submit.prevent="search" class="flex w-full space-x-4">
                    <FormTextField name="search" v-model=state.searchFilter class="w-full"
                        placeholder="Search athletes" />
                    <FormButton type="submit" class="flex items-center gap-x-2">
                        <MagnifyingGlassIcon class="w-6 h-6" />
                        Search
                    </FormButton>
                </form>
            </div>
            <TableQualified :head=state.head :body="state.body" />
            <Pagination v-if="state.body?.data?.length > 0" :data="state.body" @previous="previous()" @next="next()" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { eventService } from '@/api/event/EventService'
import { MagnifyingGlassIcon } from '@heroicons/vue/20/solid'

let currentPage = 1

const runtimeConfig = useRuntimeConfig()
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
    { name: 'Qualified athletes', href: path, current: true },
]

definePageMeta({
    layout: 'main'
})

const state = reactive({
    isPageLoading: false,
    head: [
        { name: 'Full name' },
        { name: 'Gender' },
        { name: 'Date of birth' },
        { name: 'Civil Status' },
        { name: 'Contact no.' },
    ],
    body: [] as any,
    event: null as any,
    error: null as any,
    searchFilter: null as any,
    search: null as any,
})

onMounted(() => {
    getEvent()
    getQualifiedAthletes()
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

async function getQualifiedAthletes() {
    state.isPageLoading = true
    try {
        let params = {
            search: state.search
        }
        const response = await eventService.fetchQualifiedAthletes(params, uuid)
        if (response.data) {
            state.body = response
        }
    } catch (error) {
        state.error = error
    }
    state.isPageLoading = false
}

function isPageLoading(value: any) {
    state.isPageLoading = value
}

async function previous() {
    currentPage--
    getQualifiedAthletes()
}

async function next() {
    currentPage++
    getQualifiedAthletes()
}

async function search() {
    currentPage = 1
    let filterString = JSON.stringify(state.searchFilter?.trim()?.split(/\s+/).filter(Boolean) || [])
    state.search = filterString
    getQualifiedAthletes()
}


function goToPreviousPage() {
    navigateTo(baseUrl)
}
</script>