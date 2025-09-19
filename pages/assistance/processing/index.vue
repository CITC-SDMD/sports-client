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
        <div v-if="state.selected.length > 0" class="w-full flex justify-end">
            <FormButton @click="openSignCertificate" class="flex items-center gap-x-2">
                <PlusIcon class="w-6 h-6" />
                Notify athlete
            </FormButton>
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
            <TableAssistance :head=state.head :body="state.body" @selected="hasSelected" :model="'processing'" />
            <Pagination v-if="state.body?.data?.length > 0" :data="state.body" @previous="previous()" @next="next()" />
        </div>
        <ModalSignCertificate v-model:open="state.isSignCertificateOpen" />
    </div>

</template>

<script setup lang="ts">
import { athleteService } from '@/api/athlete/AthleteService'
import { PlusIcon, MagnifyingGlassIcon } from '@heroicons/vue/20/solid'

let currentPage = 1

const runtimeConfig = useRuntimeConfig()

const route = useRoute()
const path = route.fullPath
const assistanceUrl = path.replace('/assistance/processing', '/assistance')

const pages = [
    { name: 'Assistance', href: path, current: true },
]

const tabs = [
    { name: 'For approval', href: assistanceUrl, current: false },
    { name: 'Processing', href: path, current: true },
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
