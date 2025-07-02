<template>
    <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
        <div class="overflow-hidden shadow ring-1 ring-black/5 dark:ring-slate-700 sm:rounded-lg">
            <table class="min-w-full divide-y divide-gray-100 dark:divide-black">
                <thead class="bg-blue-500 dark:bg-gray-900">
                    <tr>
                        <th v-for="(head, index) in props.head" :key="index" scope="col"
                            class="px-3 py-3.5 text-left text-lg font-bold text-white">
                            {{ head.name }}
                        </th>
                        <th scope=" col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
                            <span class="sr-only">Edit</span>
                        </th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 dark:divide-white bg-white dark:bg-gray-800">
                    <tr v-for="body in props.body?.data" :key="body.id">
                        <td class="whitespace-nowrap px-3 py-4 text-base text-gray-500 dark:text-gray-200">
                            {{ body.full_name }}
                        </td>
                        <td class="whitespace-nowrap px-3 py-4 text-base text-gray-500 dark:text-gray-200">
                            {{ body.gender }}
                        </td>
                        <td class="whitespace-nowrap px-3 py-4 text-base text-gray-500 dark:text-gray-200">
                            {{ body.birthdate }}
                        </td>
                        <td class="whitespace-nowrap px-3 py-4 text-base text-gray-500 dark:text-gray-200">
                            {{ body.age }}
                        </td>
                        <td class="whitespace-nowrap px-3 py-4 text-base text-gray-500 dark:text-gray-200">
                            {{ body.phone_number }}
                        </td>
                        <td class="relative whitespace-nowrap py-4 pl-3 pr-4 flex justify-end font-medium sm:pr-6">
                            <FormButton class="flex gap-x-2 items-center dark:bg-gray-900 dark:hover:bg-slate-700">
                                <EyeIcon class="text-white dark:text-gray-200 w-5 h-5" />
                                View
                            </FormButton>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
import { EyeIcon } from '@heroicons/vue/24/outline';

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
</script>