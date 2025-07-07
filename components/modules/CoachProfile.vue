<template>
    <div class="flex bg-white dark:bg-gray-600 rounded-lg">
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
                                        <img class="size-24 rounded-full ring-4 ring-white sm:size-32"
                                            :src="profile.imageUrl" alt="" />
                                    </div>
                                    <div
                                        class="mt-6 sm:flex sm:min-w-0 sm:flex-1 sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
                                        <div class="mt-6 min-w-0 flex-1 sm:hidden 2xl:block">
                                            <h1 class="truncate text-2xl font-bold text-gray-900 dark:text-gray-100">
                                                {{ props.coach.firstname }} {{ props.coach.middlename }}
                                                {{ props.coach.lastname }}
                                            </h1>
                                        </div>
                                        <div
                                            class="mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-x-4 sm:space-y-0">
                                            <FormButton class="flex items-center gap-x-2">
                                                <PencilSquareIcon class="-ml-0.5 size-5 text-white"
                                                    aria-hidden="true" />
                                                Update
                                            </FormButton>
                                        </div>
                                    </div>
                                </div>
                                <div class="mt-6 hidden min-w-0 flex-1 sm:block 2xl:hidden">
                                    <h1 class="truncate text-2xl font-bold text-gray-900 dark:text-gray-100">
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
                                            :class="[tab.current ? 'border-gray-900 text-gray-900 dark:text-gray-100' : 'border-transparent text-gray-500 dark:text-gray-100 hover:border-gray-300 hover:text-gray-900 dark:hover:text-gray-400', 'whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium']"
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
                                    <dt class="text-sm font-bold text-gray-900 dark:text-gray-100">Full name</dt>
                                    <dd class="mt-1 text-sm text-gray-600 dark:text-white">
                                        {{ props.coach.firstname }}
                                        {{ props.coach.middlename }}
                                        {{ props.coach.lastname }}
                                    </dd>
                                </div>
                                <div class="sm:col-span-1">
                                    <dt class="text-sm font-bold text-gray-900 dark:text-gray-100">Date of birth</dt>
                                    <dd class="mt-1 text-sm text-gray-600 dark:text-white">
                                        {{ moment(props.coach.birthdate).format('MMMM D, YYYY') ?? '' }}
                                    </dd>
                                </div>
                                <div class="sm:col-span-1">
                                    <dt class="text-sm font-bold text-gray-900 dark:text-gray-100">Address</dt>
                                    <dd class="mt-1 text-sm text-gray-600 dark:text-white">
                                        {{ props.coach.age }}
                                    </dd>
                                </div>
                                <div class="sm:col-span-1">
                                    <dt class="text-sm font-bold text-gray-900 dark:text-gray-100">Address</dt>
                                    <dd class="mt-1 text-sm text-gray-600 dark:text-white">
                                        {{ props.coach.address }}
                                    </dd>
                                </div>
                                <div class="sm:col-span-1">
                                    <dt class="text-sm font-bold text-gray-900 dark:text-gray-100">Birth place</dt>
                                    <dd class="mt-1 text-sm text-gray-600 dark:text-white">
                                        {{ props.coach.birth_place }}
                                    </dd>
                                </div>
                                <div class="sm:col-span-1">
                                    <dt class="text-sm font-bold text-gray-900 dark:text-gray-100">Civil status</dt>
                                    <dd class="mt-1 text-sm text-gray-600 dark:text-white">
                                        {{ props.coach.civil_status }}
                                    </dd>
                                </div>
                                <div class="sm:col-span-1">
                                    <dt class="text-sm font-bold text-gray-900 dark:text-gray-100">Gender</dt>
                                    <dd class="mt-1 text-sm text-gray-600 dark:text-white">
                                        {{ props.coach.gender }}
                                    </dd>
                                </div>
                                <div class="sm:col-span-1">
                                    <dt class="text-sm font-bold text-gray-900 dark:text-gray-100">Contact number</dt>
                                    <dd class="mt-1 text-sm text-gray-600 dark:text-white">
                                        {{ props.coach.contact_no }}
                                    </dd>
                                </div>
                                <div class="sm:col-span-1">
                                    <dt class="text-sm font-bold text-gray-900 dark:text-gray-100">Religion</dt>
                                    <dd class="mt-1 text-sm text-gray-600 dark:text-white">
                                        {{ props.coach.religion?.name }}
                                    </dd>
                                </div>
                                <div class="sm:col-span-1">
                                    <dt class="text-sm font-bold text-gray-900 dark:text-gray-100">School</dt>
                                    <dd class="mt-1 text-sm text-gray-600 dark:text-white">
                                        {{ props.coach.school }}
                                    </dd>
                                </div>
                                <div class="sm:col-span-1">
                                    <dt class="text-sm font-bold text-gray-900 dark:text-gray-100">Occupation</dt>
                                    <dd class="mt-1 text-sm text-gray-600 dark:text-white">
                                        {{ props.coach.occupation }}
                                    </dd>
                                </div>
                                <div class="sm:col-span-1">
                                    <dt class="text-sm font-bold text-gray-900 dark:text-gray-100">Team</dt>
                                    <dd class="mt-1 text-sm text-gray-600 dark:text-white">
                                        {{ props.coach.sports_team }}
                                    </dd>
                                </div>
                                <div class="sm:col-span-1">
                                    <dt class="text-sm font-bold text-gray-900 dark:text-gray-100">Date registered</dt>
                                    <dd class="mt-1 text-sm text-gray-600 dark:text-white">
                                        {{ moment(props.coach.registry_date).format('MMMM DD, YYYY') ?? '' }}
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
import { EnvelopeIcon, PencilSquareIcon, PhoneIcon } from '@heroicons/vue/20/solid'
import moment from 'moment'

const router = useRouter()
const uuid = router?.currentRoute?.value?.params?.uuid

const route = useRoute()
const path = route.fullPath;
const careerUrl = path.replace('/profile', '/career')
const tabs = [
    { name: 'Profile', href: `${path}`, current: true },
    { name: 'Career', href: careerUrl, current: false },
    { name: 'Recognition', href: '#', current: false },
]

const props = defineProps({
    coach: {
        type: Object,
        required: true
    }
})

const profile = {
    imageUrl:
        'https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
}
</script>