<template>

    <Head>
        <Title>{{ runtimeConfig?.public?.appName }} | Athlete Profile</Title>
    </Head>

    <div>
        <Loader v-if="state.isPageLoading" />
        <Breadcrumbs :pages="pages" class="mt-4" />
        <div class="mt-4">
            <span class="text-3xl font-bold text-blue-500">Coaches</span>
        </div>
        <FormBackButton @click="goToPreviousPage" class="mt-4" />
        <ErrorAlert v-if="state.error" :message="state.error.message" class="my-4" />
        <ModulesAthleteCoachProfile class="mt-4" v-if="state.athlete" :model="state.athlete" />
        <Tabs :tabs="tabs" class="mt-4" />
        <div class="mt-4">
            <div class="w-full flex justify-end">
                <FormButton @click="goToCreateCoach" class="flex items-center gap-x-2 w-full sm:w-auto">
                    <PlusIcon class="w-6 h-6" />
                    New coach
                </FormButton>
            </div>
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
            <TableAthleteCoach :head=state.head :body="state.body" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { athleteService } from '@/api/athlete/AthleteService'
import { PlusIcon, MagnifyingGlassIcon } from '@heroicons/vue/20/solid'

let currentPage = 1

const runtimeConfig = useRuntimeConfig()

const router = useRouter()
const uuid = router?.currentRoute?.value?.params?.uuid

const route = useRoute()
const path = route.fullPath

const athleteUrl = path.replace(path, '/athletes')

const pages = [
    { name: 'Athletes', href: athleteUrl, current: false },
    { name: 'Coaches', href: path, current: true },
]

const tabs = [
    { name: 'Coaches', href: path, current: true },
    { name: 'Performance and Career', href: '#', current: false },
]

definePageMeta({
    layout: 'main'
})

onMounted(() => {
    getAthlete()
    state.age = computedAge
})

const state = reactive({
    isPageLoading: false,
    athlete: null as any,
    error: null as any,
    athleteUuid: uuid as string,
    age: null as any,
    head: [
        { name: 'Name' },
        { name: 'Sex' },
        { name: 'Birthday' },
        { name: 'Civil Status' },
        { name: 'Contact no.' },
    ],
    body: [] as any,
    searchFilter: null as any,
    search: null as any
})

const computedAge = computed(() => {
    const birthDate = state.athlete?.birth_date
    if (!birthDate) return ''

    const today = new Date()
    const birth = new Date(birthDate)

    if (isNaN(birth.getTime())) return ''

    let age = today.getFullYear() - birth.getFullYear()
    const m = today.getMonth() - birth.getMonth()

    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
        age--
    }

    return age
})

async function getAthlete() {
    state.isPageLoading = true
    try {
        const response = await athleteService.fetchAthlete(state.athleteUuid)
        if (response.data) {
            state.athlete = response.data
        }
    } catch (error) {
        state.error = error
    }
    state.isPageLoading = false
}

async function search() {
    currentPage = 1
    let filterString = JSON.stringify(state.searchFilter?.trim()?.split(/\s+/).filter(Boolean) || [])
    state.search = filterString
    // getAthletes()
}


function goToPreviousPage() {
    const url = path.replace('/profile', '')
    navigateTo('/athletes')
}

function goToCreateCoach() {
    navigateTo(`${path}/create`)
}

</script>