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
            <span class="text-3xl font-bold text-blue-500">Athlete Assistance</span>
        </div>
        <FormBackButton @click="goToPreviousPage" />
        <ErrorAlert v-if="state.error" :message="state.error.message" />
        <div class="w-full flex justify-end mb-5">
            <FormButton @click="goToCreateAssistance" class="flex items-center gap-x-2">
                <PlusIcon class="w-6 h-6" />
                New assistance
            </FormButton>
        </div>
        <TableRequestAssistance :head=state.head :body="state.body" />
        <Pagination v-if="state.body?.data?.length > 0" :data="state.body" @previous="previous()" @next="next()" />
    </div>
</template>

<script setup lang="ts">
import { assistanceService } from '@/api/assistance/AssistanceService';
import { PlusIcon, MagnifyingGlassIcon } from '@heroicons/vue/20/solid'
import { useAlert } from '@/composables/alert'

let currentPage = 1

const { successAlert } = useAlert()

const runtimeConfig = useRuntimeConfig()
const router = useRouter()
const uuid = String(router?.currentRoute?.value?.params?.uuid)

const route = useRoute()
const path = route.fullPath
const processUrl = path.replace(`/${uuid}/assistance`, '')

const pages = [
    { name: 'Assistance', href: processUrl, current: false },
    { name: 'Athlete Assistance', href: path, current: true },
]

definePageMeta({
    layout: 'main'
})

const state = reactive({
    head: [
        { name: 'Assistance' },
        { name: 'Discription' },
        { name: 'Provider' },
    ],
    body: [] as any,
    search: null as any,
    searchFilter: null as any,
    isPageLoading: false,
    error: null as any,
})

onMounted(() => {
    getAssistance()
})

async function getAssistance() {
    state.isPageLoading = true
    try {
        let params = {
            athlete_uuid: uuid,
        }
        const response = await assistanceService.fetchAssistances(params)
        if (response.data) {
            state.body = response
        }
    } catch (error) {
        state.error = error
    } finally {
        state.isPageLoading = false
    }
}

async function previous() {
    currentPage--
}

async function next() {
    currentPage++
}

function showErrorMessage(data: any) {
    state.error = data
}

function goToCreateAssistance() {
    navigateTo(`${path}/create`)
}

function goToPreviousPage() {
    navigateTo(processUrl)
}
</script>