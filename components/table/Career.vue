<template>
    <div class="mt-8 flow-root">
        <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <div class="overflow-hidden shadow ring-1 ring-black/5 sm:rounded-lg">
                    <table class="min-w-full divide-y divide-gray-300">
                        <thead class="bg-blue-500">
                            <tr>
                                <th v-for="(head, index) in props.head" :key="index" scope="col"
                                    class="px-3 py-3.5 text-left text-lg font-bold text-gray-100">
                                    {{ head.name }}
                                </th>
                                <th scope=" col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                    <span class="sr-only">Edit</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-200 bg-white">
                            <tr v-for="career in props.body.data" :key="career.id">
                                <td class="whitespace-nowrap px-3 py-4 text-base text-gray-500 max-w-48 truncate">
                                    {{ career.competition.competition_name }}
                                </td>
                                <td class="whitespace-nowrap px-3 py-4 text-base text-gray-500 max-w-48 truncate">
                                    {{ career.sport.sports_name }}
                                </td>
                                <td class="whitespace-nowrap px-3 py-4 text-base text-gray-500 max-w-48 truncate">
                                    {{ career.position_role }}
                                </td>
                                <td class="whitespace-nowrap px-3 py-4 text-base text-gray-500">
                                    {{ moment(career.career_date).format('MMMM DD, YYYY') }}
                                </td>
                                <td
                                    class="relative whitespace-nowrap py-4 pl-3 pr-4 flex justify-end font-medium sm:pr-6">
                                    <FormButton @click="goToViewPage(career.uuid)" class="flex items-center gap-x-2">
                                        <EyeIcon class="w-4 h-4" />
                                        <span class="text-sm">View</span>
                                    </FormButton>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { EyeIcon } from '@heroicons/vue/24/outline'
import moment from 'moment'

const props = defineProps({
    head: {
        type: Object,
        required: true
    },
    body: {
        type: Object,
        required: true
    }
})

const route = useRoute()
const path = route.fullPath

function goToViewPage(data: any) {
    navigateTo(`${path}/${data}`)
}
</script>