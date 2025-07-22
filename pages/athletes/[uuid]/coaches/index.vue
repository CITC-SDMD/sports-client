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
        <ModulesAthleteProfile class="mt-4">
            <div class="flex flex-col sm:flex-row sm:gap-x-10 space-y-4 sm:space-y-0">
                <div class="flex items-center justify-center sm:justify-normal">
                    <img class="size-32 rounded-full ring-4 ring-white sm:size-48 bg-white" :src="avatarUrl"
                        alt="profile photo" />
                </div>
                <div class="space-y-3">
                    <div>
                        <span class="font-bold text-3xl">
                            {{ state.athlete?.firstname }} {{ state.athlete?.middlename ?? '' }}
                            {{ state.athlete?.lastname }}
                        </span>
                    </div>
                    <div class="flex items-center gap-x-2">
                        <CakeIcon class="w-5 h-5 text-blue-600" />
                        <span class="text-sm">
                            {{ (state.athlete?.birthdate) ?
                                moment(state.athlete?.birthdate).format('MMMM DD, YYYY') : '' }}
                        </span>
                    </div>
                    <div class="flex items-center gap-x-2">
                        <MapPinIcon class="w-5 h-5 text-blue-600" />
                        <span class="text-sm">
                            {{ state.athlete?.address }}
                        </span>
                    </div>
                    <div class="flex items-center gap-x-2">
                        <ScaleIcon class="w-5 h-5 text-blue-600" />
                        <span class="text-sm">
                            {{ state.athlete?.civil_status }}
                        </span>
                    </div>
                    <div class="flex items-center gap-x-2">
                        <UserIcon class="w-5 h-5 text-blue-600" />
                        <span class="text-sm">
                            {{ state.athlete?.gender }}
                        </span>
                    </div>
                    <div class="flex items-center gap-x-2">
                        <PhoneIcon class="w-5 h-5 text-blue-600" />
                        <span class="text-sm">
                            {{ state.athlete?.contact_no }}
                        </span>
                    </div>
                </div>
                <div class="flex-col space-y-3">
                    <div class="flex items-center gap-x-2">
                        <BuildingLibraryIcon class="w-5 h-5 text-blue-600" />
                        <span class="text-sm">
                            {{ state.athlete?.religion?.name }}
                        </span>
                    </div>
                    <div class="flex items-center gap-x-2">
                        <AcademicCapIcon class="w-5 h-5 text-blue-600" />
                        <span class="text-sm">
                            {{ state.athlete?.school?.school_name }}
                        </span>
                    </div>
                    <div class="flex items-center gap-x-2">
                        <BriefcaseIcon class="w-5 h-5 text-blue-600" />
                        <span class="text-sm">
                            {{ state.athlete?.occupation }}
                        </span>
                    </div>
                    <div class="flex items-center gap-x-2">
                        <TrophyIcon class="w-5 h-5 text-blue-600" />
                        <span class="text-sm">
                            {{ state.athlete?.sports_team }}
                        </span>
                    </div>
                    <div class="flex items-center gap-x-2">
                        <CalendarDateRangeIcon class="w-5 h-5 text-blue-600" />
                        <span class="text-sm">
                            {{ (state.athlete?.registry_date) ?
                                moment(state.athlete?.registry_date).format("MMMM DD, YYYY") : '' }}
                        </span>
                    </div>
                </div>
            </div>
        </ModulesAthleteProfile>
        <Tabs :tabs="tabs" class="mt-4" />
        <div>

        </div>
    </div>
</template>

<script setup lang="ts">
import { athleteService } from '@/api/athlete/AthleteService'
import {
    AcademicCapIcon,
    BriefcaseIcon,
    BuildingLibraryIcon,
    CakeIcon,
    CalendarDateRangeIcon,
    MapPinIcon,
    PhoneIcon,
    ScaleIcon,
    TrophyIcon,
    UserIcon
} from '@heroicons/vue/24/outline'
import moment from 'moment'

const runtimeConfig = useRuntimeConfig()

const avatarUrl = ref('/img/avatars/user.svg')

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
})

const state = reactive({
    isPageLoading: false,
    athlete: null as any,
    error: null as any,
    athleteUuid: uuid as string
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


function goToPreviousPage() {
    const url = path.replace('/profile', '')
    navigateTo('/athletes')
}

</script>