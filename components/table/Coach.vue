<template>
    <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div class="overflow-hidden shadow ring-1 ring-black/5 sm:rounded-lg">
                <table class="min-w-full divide-y divide-gray-100">
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
                        <!-- Show table rows if there's data -->
                        <tr v-if="props.body?.data?.length > 0" v-for="body in props.body.data" :key="body.uuid">
                            <td class="whitespace-nowrap px-3 py-4 text-base text-gray-500">
                                {{ body.firstname }}
                                {{ (body.middlename != 'null') ? body.middlename : '' }}
                                {{ body.lastname }}
                            </td>
                            <td class="whitespace-nowrap px-3 py-4 text-base text-gray-500">
                                {{ body.gender }}
                            </td>
                            <td class="whitespace-nowrap px-3 py-4 text-base text-gray-500">
                                {{ body.birthdate ? moment(body.birthdate).format('MMMM DD, YYYY') : '' }}
                            </td>
                            <td class="whitespace-nowrap px-3 py-4 text-base text-gray-500">
                                {{ body.age }}
                            </td>
                            <td class="whitespace-nowrap px-3 py-4 text-base text-gray-500">
                                {{ body.contact_no }}
                            </td>
                            <td class="relative whitespace-nowrap py-4 pl-3 pr-4 flex justify-end font-medium sm:pr-6">
                                <FormButton @click="goToViewPage(body.uuid)" class="flex items-center gap-x-2">
                                    <EyeIcon class="w-4 h-4" />
                                    <span class="text-sm">View</span>
                                </FormButton>
                            </td>
                        </tr>
                        <tr v-else>
                            <td :colspan="props.head.length + 1" class="text-center py-6 text-gray-400 text-lg">
                                No records found.
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { EyeIcon } from '@heroicons/vue/24/outline'
import moment from 'moment'

const route = useRoute()
var path = route.fullPath

const props = defineProps({
    head: {
        type: Array,
        required: true
    },
    body: {
        type: Object,
        required: false
    },
})

function goToViewPage(uuid) {
    if (path == '/coaches') {
        navigateTo(`${path}/${uuid}/profile`)
    } else {
        navigateTo(`/coaches/${uuid}/profile`)
    }
}
</script>