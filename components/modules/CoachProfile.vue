<template>
    <div class="flex bg-white rounded-lg">
        <div class="flex min-w-0 flex-1 flex-col overflow-hidden">
            <div class="relative z-0 flex flex-1 overflow-hidden rounded-lg">
                <main class="relative z-0 flex-1 overflow-y-auto focus:outline-none xl:order-last">
                    <article>
                        <div>
                            <div>
                                <img class="h-32 w-full object-cover lg:h-72"
                                    src="https://images.unsplash.com/photo-1667967699372-1c26d40dec46?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                    alt="cover photo" />
                            </div>
                            <div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                                <div class="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
                                    <div class="flex">
                                        <img v-if="props.coach.photo"
                                            class="size-24 rounded-full ring-4 ring-white sm:size-32 bg-white"
                                            :src="props.coach.photo" alt="profile photo" />
                                        <img v-else class="size-24 rounded-full ring-4 ring-white sm:size-32 bg-white"
                                            :src="avatarUrl" alt="profile photo" />
                                    </div>
                                    <div
                                        class="mt-6 sm:flex sm:min-w-0 sm:flex-1 sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
                                        <div class="mt-6 min-w-0 flex-1 sm:hidden 2xl:block">
                                            <h1 class="truncate text-2xl font-bold text-gray-900">
                                                {{ props.coach.firstname }} {{ props.coach.middlename }}
                                                {{ props.coach.lastname }}
                                            </h1>
                                        </div>
                                        <div
                                            class="mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-x-4 sm:space-y-0">
                                            <FormButton @click="goToEditPage" class="flex items-center gap-x-2">
                                                <PencilSquareIcon class="-ml-0.5 size-5 text-white"
                                                    aria-hidden="true" />
                                                Update
                                            </FormButton>
                                        </div>
                                    </div>
                                </div>
                                <div class="mt-6 hidden min-w-0 flex-1 sm:block 2xl:hidden">
                                    <h1 class="truncate text-2xl font-bold text-gray-900">
                                        {{ props.coach.firstname }} {{ props.coach.middlename }}
                                        {{ props.coach.lastname }}
                                    </h1>
                                </div>
                            </div>
                        </div>

                        <!-- Tabs -->
                        <div class="mt-6 sm:mt-2 2xl:mt-5">
                            <div class="border-b border-gray-200">
                                <div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                                    <nav class="-mb-px flex space-x-8" aria-label="Tabs">
                                        <NuxtLink v-for="tab in tabs" :key="tab.name" :href="tab.href"
                                            :class="[tab.current ? 'border-gray-900 text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-900', 'whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium']"
                                            :aria-current="tab.current ? 'page' : undefined">
                                            {{ tab.name }}
                                        </NuxtLink>
                                    </nav>
                                </div>
                            </div>
                        </div>

                        <!-- Description list -->
                        <div class="mx-auto mt-6 max-w-5xl px-4 sm:px-6 lg:px-8 pb-10">
                            <dl class="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                                <div class="sm:col-span-1">
                                    <dt class="text-sm font-bold text-gray-900">Full name</dt>
                                    <dd class="mt-1 text-sm text-gray-600">
                                        {{ props.coach?.firstname }}
                                        {{ props.coach?.middlename }}
                                        {{ props.coach?.lastname }}
                                    </dd>
                                </div>
                                <div class="sm:col-span-1">
                                    <dt class="text-sm font-bold text-gray-900">Date of birth</dt>
                                    <dd class="mt-1 text-sm text-gray-600">
                                        {{ moment(props.coach?.birthdate).format('MMMM D, YYYY') ?? '' }}
                                    </dd>
                                </div>
                                <div class="sm:col-span-1">
                                    <dt class="text-sm font-bold text-gray-900">Address</dt>
                                    <dd class="mt-1 text-sm text-gray-600">
                                        {{ props.coach?.age }}
                                    </dd>
                                </div>
                                <div class="sm:col-span-1">
                                    <dt class="text-sm font-bold text-gray-900">Address</dt>
                                    <dd class="mt-1 text-sm text-gray-600">
                                        {{ props.coach?.address }}
                                    </dd>
                                </div>
                                <div class="sm:col-span-1">
                                    <dt class="text-sm font-bold text-gray-900">Birth place</dt>
                                    <dd class="mt-1 text-sm text-gray-600">
                                        {{ props.coach?.birth_place }}
                                    </dd>
                                </div>
                                <div class="sm:col-span-1">
                                    <dt class="text-sm font-bold text-gray-900">Civil status</dt>
                                    <dd class="mt-1 text-sm text-gray-600">
                                        {{ props.coach?.civil_status }}
                                    </dd>
                                </div>
                                <div class="sm:col-span-1">
                                    <dt class="text-sm font-bold text-gray-900">Gender</dt>
                                    <dd class="mt-1 text-sm text-gray-600">
                                        {{ props.coach?.gender }}
                                    </dd>
                                </div>
                                <div class="sm:col-span-1">
                                    <dt class="text-sm font-bold text-gray-900">Contact number</dt>
                                    <dd class="mt-1 text-sm text-gray-600">
                                        {{ props.coach?.contact_no }}
                                    </dd>
                                </div>
                                <div class="sm:col-span-1">
                                    <dt class="text-sm font-bold text-gray-900">Religion</dt>
                                    <dd class="mt-1 text-sm text-gray-600">
                                        {{ props.coach?.religion?.name }}
                                    </dd>
                                </div>
                                <div class="sm:col-span-1">
                                    <dt class="text-sm font-bold text-gray-900">School</dt>
                                    <dd class="mt-1 text-sm text-gray-600">
                                        {{ props.coach.school?.school_name }}
                                    </dd>
                                </div>
                                <div class="sm:col-span-1">
                                    <dt class="text-sm font-bold text-gray-900">Occupation</dt>
                                    <dd class="mt-1 text-sm text-gray-600">
                                        {{ props.coach?.occupation }}
                                    </dd>
                                </div>
                                <div class="sm:col-span-1">
                                    <dt class="text-sm font-bold text-gray-900">Team</dt>
                                    <dd class="mt-1 text-sm text-gray-600">
                                        {{ props.coach?.sports_team }}
                                    </dd>
                                </div>
                                <div class="sm:col-span-1">
                                    <dt class="text-sm font-bold text-gray-900">Date registered</dt>
                                    <dd class="mt-1 text-sm text-gray-600">
                                        {{ moment(props.coach?.registry_date).format('MMMM DD, YYYY') ?? '' }}
                                    </dd>
                                </div>
                            </dl>
                        </div>
                    </article>
                </main>
            </div>
        </div>
    </div>
</template>

<script setup>
import { PencilSquareIcon } from '@heroicons/vue/20/solid'
import moment from 'moment'

const avatarUrl = ref('/img/avatars/user.svg')

const route = useRoute()
const path = route.fullPath
const careerUrl = path.replace('/profile', '/careers')
const athleteUrl = path.replace('/profile', '/athletes')
const tabs = [
    { name: 'Profile', href: path, current: true },
    { name: 'Careers', href: careerUrl, current: false },
    { name: 'Athletes', href: athleteUrl, current: false },
]

const props = defineProps({
    coach: {
        type: Object,
        required: true
    }
})

function goToEditPage() {
    navigateTo(`${path}/edit`)
}
</script>