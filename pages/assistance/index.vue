<template>

    <Head>
        <Title>{{ runtimeConfig?.public?.appName }} | Assistance</Title>
    </Head>

    <div>
        <Loader v-if="state.isPageLoading" />
        <div>
            <Breadcrumbs :pages="pages" />
        </div>

        <div class="mt-4">
            <span class="text-3xl font-bold text-blue-500">Assistance</span>
        </div>

        <ErrorAlert v-if="state.error" :message="state.error.message" />
        <div class="w-full flex justify-end space-x-4 ">
            <div v-if="state.body?.data?.length > 0">
                <FormButton @click="selectAll" class="flex items-center gap-x-2 w-full sm:w-auto">
                    <CheckIcon class="w-6 h-6" />
                    Select all
                </FormButton>
            </div>
            <div v-if="state.selected.length > 0">
                <FormButton @click="openSignCertificate" class="flex items-center gap-x-2 w-full sm:w-auto">
                    <PlusIcon class="w-6 h-6" />
                    Sign certification
                </FormButton>
            </div>
        </div>
        <Tabs :tabs="tabs" class="mt-4" />
        <div class="mt-4">
            <div class="w-full mt-4">
                <form @submit.prevent="search" class="flex w-full space-x-4">
                    <FormTextField name="search" v-model=state.searchFilter class="w-full"
                        placeholder="Search athlete" />
                    <FormButton type="submit" class="flex items-center gap-x-2">
                        <MagnifyingGlassIcon class="w-6 h-6" />
                        Search
                    </FormButton>
                </form>
            </div>
            <TableAssistance :head=state.head :body="state.body" @selected="hasSelected" :selected="state.selected"
                :model="'approval'" />
            <Pagination v-if="state.body?.data?.length > 0" :data="state.body" @previous="previous()" @next="next()" />
        </div>
        <ModalSignCertificate v-model:open="state.isSignCertificateOpen" @saveSignCertificate="saveAssistance"
            @close="state.selected = []" />
    </div>

</template>

<script setup lang="ts">
import { athleteService } from '@/api/athlete/AthleteService'
import { PlusIcon, MagnifyingGlassIcon, CheckIcon } from '@heroicons/vue/20/solid'
import { useAlert } from '@/composables/alert'

let currentPage = 1

const runtimeConfig = useRuntimeConfig()

const { successAlert } = useAlert()

const route = useRoute()
const path = route.fullPath
const assistanceUrl = path.replace('/assistance', '/assistance/processing')

const pages = [
    { name: 'Assistance', href: path, current: true },
]

const tabs = [
    { name: 'For approval', href: path, current: true },
    { name: 'Processing', href: assistanceUrl, current: false },
    { name: 'Done', href: assistanceUrl, current: false },
]

definePageMeta({
    layout: 'main'
})

const state = reactive({
    isPageLoading: false,
    error: null as any,
    head: [
        { name: '' },
        { name: 'Full name' },
        { name: 'Gender' },
        { name: 'Date of birth' },
        { name: 'Civil Status' },
        { name: 'Contact no.' },
    ],
    body: [] as any,
    isSignCertificateOpen: false,
    selected: [] as any,
    search: null as any,
    searchFilter: null as any
})

onMounted(() => {
    getAssistance()
})

async function getAssistance() {
    state.isPageLoading = true
    try {
        let params = {
            page: currentPage,
            search: state.search
        }
        const response = await athleteService.fetchAssistanceList(params)
        if (response.data) {
            state.body = response
        }
    } catch (error) {
        state.error = error
    }
    state.isPageLoading = false
}

async function saveAssistance(data: any) {
    state.isPageLoading = true
    try {
        let params = {
            password: data,
            athlete_uuid: state.selected,
            is_approved: true,
        }
        const response = await athleteService.saveAssistanceApprove(params)
        if (response) {
            successAlert('Success!', 'Athlete approved.')
            getAssistance()
            state.selected = []
            navigateTo(assistanceUrl)
        }
    } catch (error) {
        state.error = error
    }
    state.isPageLoading = false
}

function selectAll() {
    state.selected = state.body.data.map((item: any) => item.uuid)
    if (state.selected.length > 0) {
        openSignCertificate()
    }
}

function openSignCertificate() {
    state.isSignCertificateOpen = true
}

function hasSelected(value: any) {
    state.selected = value
}

async function search() {
    currentPage = 1
    let filterString = JSON.stringify(state.searchFilter?.trim()?.split(/\s+/).filter(Boolean) || [])
    state.search = filterString
    getAssistance()
}

async function previous() {
    currentPage--
    getAssistance()
}

async function next() {
    currentPage++
    getAssistance()
}
</script>
