<template>
    <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div class="overflow-hidden shadow ring-1 ring-black/5 dark:ring-slate-700 sm:rounded-lg">
                <table class="min-w-full divide-y divide-gray-100 dark:divide-black">
                    <thead class="bg-blue-500 dark:bg-gray-700">
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
                    <tbody class="divide-y divide-gray-200 dark:divide-white bg-white dark:bg-gray-600">
                        <!-- Show table rows if there's data -->
                        <tr v-if="props.body?.data?.length > 0" v-for="body in props.body.data" :key="body.uuid">
                            <td class="whitespace-nowrap px-3 py-4 text-base text-gray-500 dark:text-gray-100">
                                {{ body.firstname }}
                                {{ (body.middlename != 'null') ? body.middlename : '' }}
                                {{ body.lastname }}
                            </td>
                            <td class="whitespace-nowrap px-3 py-4 text-base text-gray-500 dark:text-gray-100">
                                {{ body.gender }}
                            </td>
                            <td class="whitespace-nowrap px-3 py-4 text-base text-gray-500 dark:text-gray-100">
                                {{ body.birthdate }}
                            </td>
                            <td class="whitespace-nowrap px-3 py-4 text-base text-gray-500 dark:text-gray-100">
                                {{ body.age }}
                            </td>
                            <td class="whitespace-nowrap px-3 py-4 text-base text-gray-500 dark:text-gray-100">
                                {{ body.contact_no }}
                            </td>
                            <td class="relative whitespace-nowrap py-4 pl-3 pr-4 flex justify-end font-medium sm:pr-6">
                                <FormButton @click="goToViewPage(body.uuid)" class="flex gap-x-2 items-center">
                                    <EyeIcon class="text-white dark:text-gray-100 w-5 h-5" />
                                    View
                                </FormButton>
                            </td>
                        </tr>
                        <tr v-else>
                            <td :colspan="props.head.length + 1"
                                class="text-center py-6 text-gray-400 text-lg dark:text-gray-100">
                                No records found.
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script setup>
import { EyeIcon } from '@heroicons/vue/24/outline';

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
    navigateTo(`${path}/${uuid}/profile`)
}
</script>