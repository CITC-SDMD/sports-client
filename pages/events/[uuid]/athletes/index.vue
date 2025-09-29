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
                <MenuInvitation @isPageLoading="isPageLoading" @showError="state.error" />
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
            <TableQualified :head=state.head :body="state.body" @selected="hasSelected" :selected="state.selected" />
            <Pagination v-if="state.body?.data?.length > 0" :data="state.body" @previous="previous()" @next="next()" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { eventService } from '@/api/event/EventService'
import { eventAthleteService } from '@/api/eventAthlete/eventAthlete'
import { MagnifyingGlassIcon } from '@heroicons/vue/20/solid'
import { useAlert } from '@/composables/alert'

const { successAlert } = useAlert()

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
        { name: '' },
        { name: 'Full name' },
        { name: 'Gender' },
        { name: 'Date of birth' },
        { name: 'Civil Status' },
        { name: 'Contact no.' },
    ],
    selected: [] as any,
    body: [] as any,
    event: null as any,
    error: null as any,
    searchFilter: null as any,
    search: null as any,
})

onMounted(() => {
    getEvent()
    getEventAthlete()
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

async function getEventAthlete() {
    state.isPageLoading = true
    try {
        let params = {
            search: state.search
        }
        const response = await eventAthleteService.fetchEventAthlete(params, uuid)
        if (response.data) {
            state.body = response
            state.selected = response.data
                .filter((row: any) => row.is_interested === true)
                .map((row: any) => row.athlete?.uuid)
        }
    } catch (error) {
        state.error = error
    }
    state.isPageLoading = false
}


async function saveEventAtheleInterest(athleteUuid: string, isInterested: boolean) {
    state.isPageLoading = true
    try {
        let params = {
            athlete_uuid: [athleteUuid],
            is_interested: isInterested
        }
        const response = await eventAthleteService.saveEventAthleteInterest(params)
        if (response.data) {
            successAlert('Success!', 'Athlete interest has been created.')
            getEventAthlete()
        }
    } catch (error) {
        state.error = error
    }
    state.isPageLoading = false
}

async function hasSelected(value: { uuid: string, is_interested: boolean }) {
    await saveEventAtheleInterest(value.uuid, value.is_interested);
}

function isPageLoading(value: any) {
    state.isPageLoading = value
    getEventAthlete()
}

async function previous() {
    currentPage--
    getEventAthlete()
}

async function next() {
    currentPage++
    getEventAthlete()
}

async function search() {
    currentPage = 1
    let filterString = JSON.stringify(state.searchFilter?.trim()?.split(/\s+/).filter(Boolean) || [])
    state.search = filterString
    getEventAthlete()
}


function goToPreviousPage() {
    navigateTo(baseUrl)
}
</script>