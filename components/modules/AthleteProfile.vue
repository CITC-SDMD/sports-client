<template>
    <div class="flex h-screen">
        <div class="border-b border-gray-200 bg-white">
            <div class="flex min-w-0 flex-1 flex-col overflow-hidden">
                <div class="relative z-0 flex flex-1 overflow-hidden">
                    <main class="relative z-0 flex-1 overflow-y-auto focus:outline-none xl:order-last">
                        <article>
                            <!-- Profile header -->
                            <div>
                                <div>
                                    <img class="h-32 w-full object-cover lg:h-48" :src="profile.coverImageUrl" alt="" />
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
                                                <h1 class="truncate text-2xl font-bold text-gray-900">{{ profile.name }}
                                                </h1>
                                            </div>
                                            <div
                                                class="mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-x-4 sm:space-y-0">
                                                <button type="button"
                                                    class="inline-flex justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                                                    <EnvelopeIcon class="-ml-0.5 size-5 text-gray-400"
                                                        aria-hidden="true" />
                                                    Message
                                                </button>
                                                <button type="button"
                                                    class="inline-flex justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                                                    <PhoneIcon class="-ml-0.5 size-5 text-gray-400"
                                                        aria-hidden="true" />
                                                    Call
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="mt-6 hidden min-w-0 flex-1 sm:block 2xl:hidden">
                                        <h1 class="truncate text-2xl font-bold text-gray-900">{{ profile.name }}</h1>
                                    </div>
                                </div>
                            </div>

                            <!-- Tabs -->
                            <div class="mt-6 sm:mt-2 2xl:mt-5">
                                <div class="border-b border-gray-200">
                                    <div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                                        <nav class="-mb-px flex space-x-8" aria-label="Tabs">
                                            <a v-for="tab in tabs" :key="tab.name" :href="tab.href"
                                                :class="[tab.current ? 'border-pink-500 text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700', 'whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium']"
                                                :aria-current="tab.current ? 'page' : undefined">{{ tab.name }}</a>
                                        </nav>
                                    </div>
                                </div>
                            </div>

                            <!-- Description list -->
                            <div class="mx-auto mt-6 max-w-5xl px-4 sm:px-6 lg:px-8">
                                <dl class="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                                    <div v-for="field in Object.keys(profile.fields)" :key="field"
                                        class="sm:col-span-1">
                                        <dt class="text-sm font-medium text-gray-500">{{ field }}</dt>
                                        <dd class="mt-1 text-sm text-gray-900">{{ profile.fields[field] }}</dd>
                                    </div>
                                    <div class="sm:col-span-2">
                                        <dt class="text-sm font-medium text-gray-500">About</dt>
                                        <dd class="mt-1 max-w-prose space-y-5 text-sm text-gray-900"
                                            v-html="profile.about" />
                                    </div>
                                </dl>
                            </div>

                            <!-- Team member list -->
                            <div class="mx-auto mt-8 max-w-5xl px-4 pb-12 sm:px-6 lg:px-8">
                                <h2 class="text-sm font-medium text-gray-500">Team members</h2>
                                <div class="mt-1 grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <div v-for="person in team" :key="person.handle"
                                        class="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-pink-500 focus-within:ring-offset-2 hover:border-gray-400">
                                        <div class="shrink-0">
                                            <img class="size-10 rounded-full" :src="person.imageUrl" alt="" />
                                        </div>
                                        <div class="min-w-0 flex-1">
                                            <a href="#" class="focus:outline-none">
                                                <span class="absolute inset-0" aria-hidden="true" />
                                                <p class="text-sm font-medium text-gray-900">{{ person.name }}</p>
                                                <p class="truncate text-sm text-gray-500">{{ person.role }}</p>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </article>
                    </main>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue'
import {
    Bars3Icon,
    CalendarIcon,
    CogIcon,
    HomeIcon,
    MagnifyingGlassCircleIcon,
    MapIcon,
    MegaphoneIcon,
    SquaresPlusIcon,
    UserGroupIcon,
    XMarkIcon,
} from '@heroicons/vue/24/outline'
import { ChevronLeftIcon, EnvelopeIcon, FunnelIcon, MagnifyingGlassIcon, PhoneIcon } from '@heroicons/vue/20/solid'

const user = {
    name: 'Tom Cook',
    imageUrl:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}
const navigation = [
    { name: 'Dashboard', href: '#', icon: HomeIcon, current: false },
    { name: 'Calendar', href: '#', icon: CalendarIcon, current: false },
    { name: 'Teams', href: '#', icon: UserGroupIcon, current: false },
    { name: 'Directory', href: '#', icon: MagnifyingGlassCircleIcon, current: true },
    { name: 'Announcements', href: '#', icon: MegaphoneIcon, current: false },
    { name: 'Office Map', href: '#', icon: MapIcon, current: false },
]
const secondaryNavigation = [
    { name: 'Apps', href: '#', icon: SquaresPlusIcon },
    { name: 'Settings', href: '#', icon: CogIcon },
]
const tabs = [
    { name: 'Profile', href: '#', current: true },
    { name: 'Calendar', href: '#', current: false },
    { name: 'Recognition', href: '#', current: false },
]
const profile = {
    name: 'Ricardo Cooper',
    imageUrl:
        'https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
    coverImageUrl:
        'https://images.unsplash.com/photo-1444628838545-ac4016a5418a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    about: `
    <p>Tincidunt quam neque in cursus viverra orci, dapibus nec tristique. Nullam ut sit dolor consectetur urna, dui cras nec sed. Cursus risus congue arcu aenean posuere aliquam.</p>
    <p>Et vivamus lorem pulvinar nascetur non. Pulvinar a sed platea rhoncus ac mauris amet. Urna, sem pretium sit pretium urna, senectus vitae. Scelerisque fermentum, cursus felis dui suspendisse velit pharetra. Augue et duis cursus maecenas eget quam lectus. Accumsan vitae nascetur pharetra rhoncus praesent dictum risus suspendisse.</p>
  `,
    fields: {
        Phone: '(555) 123-4567',
        Email: 'ricardocooper@example.com',
        Title: 'Senior Front-End Developer',
        Team: 'Product Development',
        Location: 'San Francisco',
        Sits: 'Oasis, 4th floor',
        Salary: '$145,000',
        Birthday: 'June 8, 1990',
    },
}
const directory = {
    A: [
        {
            id: 1,
            name: 'Leslie Abbott',
            role: 'Co-Founder / CEO',
            imageUrl:
                'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
        {
            id: 2,
            name: 'Hector Adams',
            role: 'VP, Marketing',
            imageUrl:
                'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
        {
            id: 3,
            name: 'Blake Alexander',
            role: 'Account Coordinator',
            imageUrl:
                'https://images.unsplash.com/photo-1520785643438-5bf77931f493?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
        {
            id: 4,
            name: 'Fabricio Andrews',
            role: 'Senior Art Director',
            imageUrl:
                'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
    ],
    B: [
        {
            id: 5,
            name: 'Angela Beaver',
            role: 'Chief Strategy Officer',
            imageUrl:
                'https://images.unsplash.com/photo-1501031170107-cfd33f0cbdcc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
        {
            id: 6,
            name: 'Yvette Blanchard',
            role: 'Studio Artist',
            imageUrl:
                'https://images.unsplash.com/photo-1506980595904-70325b7fdd90?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
        {
            id: 7,
            name: 'Lawrence Brooks',
            role: 'Content Specialist',
            imageUrl:
                'https://images.unsplash.com/photo-1513910367299-bce8d8a0ebf6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
    ],
    C: [
        {
            id: 8,
            name: 'Jeffrey Clark',
            role: 'Senior Art Director',
            imageUrl:
                'https://images.unsplash.com/photo-1517070208541-6ddc4d3efbcb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
        {
            id: 9,
            name: 'Kathryn Cooper',
            role: 'Associate Creative Director',
            imageUrl:
                'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
    ],
    E: [
        {
            id: 10,
            name: 'Alicia Edwards',
            role: 'Junior Copywriter',
            imageUrl:
                'https://images.unsplash.com/photo-1509783236416-c9ad59bae472?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
        {
            id: 11,
            name: 'Benjamin Emerson',
            role: 'Director, Print Operations',
            imageUrl:
                'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
        {
            id: 12,
            name: 'Jillian Erics',
            role: 'Designer',
            imageUrl:
                'https://images.unsplash.com/photo-1504703395950-b89145a5425b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
        {
            id: 13,
            name: 'Chelsea Evans',
            role: 'Human Resources Manager',
            imageUrl:
                'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
    ],
    G: [
        {
            id: 14,
            name: 'Michael Gillard',
            role: 'Co-Founder / CTO',
            imageUrl:
                'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
        {
            id: 15,
            name: 'Dries Giuessepe',
            role: 'Manager, Business Relations',
            imageUrl:
                'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
    ],
    M: [
        {
            id: 16,
            name: 'Jenny Harrison',
            role: 'Studio Artist',
            imageUrl:
                'https://images.unsplash.com/photo-1507101105822-7472b28e22ac?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
        {
            id: 17,
            name: 'Lindsay Hatley',
            role: 'Front-end Developer',
            imageUrl:
                'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
        {
            id: 18,
            name: 'Anna Hill',
            role: 'Partner, Creative',
            imageUrl:
                'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
    ],
    S: [
        {
            id: 19,
            name: 'Courtney Samuels',
            role: 'Designer',
            imageUrl:
                'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
        {
            id: 20,
            name: 'Tom Simpson',
            role: 'Director, Product Development',
            imageUrl:
                'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
    ],
    T: [
        {
            id: 21,
            name: 'Floyd Thompson',
            role: 'Principal Designer',
            imageUrl:
                'https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
        {
            id: 22,
            name: 'Leonard Timmons',
            role: 'Senior Designer',
            imageUrl:
                'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
        {
            id: 23,
            name: 'Whitney Trudeau',
            role: 'Copywriter',
            imageUrl:
                'https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
    ],
    W: [
        {
            id: 24,
            name: 'Kristin Watson',
            role: 'VP, Human Resources',
            imageUrl:
                'https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
        {
            id: 25,
            name: 'Emily Wilson',
            role: 'VP, User Experience',
            imageUrl:
                'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
    ],
    Y: [
        {
            id: 26,
            name: 'Emma Young',
            role: 'Senior Front-end Developer',
            imageUrl:
                'https://images.unsplash.com/photo-1505840717430-882ce147ef2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
    ],
}
const team = [
    {
        name: 'Leslie Alexander',
        handle: 'lesliealexander',
        role: 'Co-Founder / CEO',
        imageUrl:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
        name: 'Michael Foster',
        handle: 'michaelfoster',
        role: 'Co-Founder / CTO',
        imageUrl:
            'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
        name: 'Dries Vincent',
        handle: 'driesvincent',
        role: 'Business Relations',
        imageUrl:
            'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
        name: 'Lindsay Walton',
        handle: 'lindsaywalton',
        role: 'Front-end Developer',
        imageUrl:
            'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
]

const sidebarOpen = ref(false)
</script>