<template>
    <div class="mt-8 flow-root">
        <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <div class="overflow-hidden shadow ring-1 ring-black/5 sm:rounded-lg">
                    <table class="min-w-full divide-y divide-gray-300 rounded-lg">
                        <thead class="bg-blue-500">
                            <tr>
                                <th v-for="(head, index) in props.head" :key="index" scope="col" :class="[
                                    (index === 0 || index === 2) ? 'hidden sm:table-cell' : 'sm:table-cell',
                                    'px-3 py-3.5 text-left text-base font-semibold text-white sm:pl-6'
                                ]">
                                    {{ head.name }}
                                </th>
                                <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                    <span class="sr-only">Edit</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-200 bg-white" v-if="props.body?.data?.length > 0">
                            <tr v-for="body in props.body.data" :key="body.uuid">
                                <td
                                    class="hidden sm:table-cell whitespace-nowrap py-4 pl-4 pr-3 text-lg font-medium text-gray-900 sm:pl-6">
                                    {{ body.firstname }} {{ body.middlename ?? '' }} {{ body.lastname }}
                                </td>
                                <td class="whitespace-nowrap py-4 pl-4 pr-3 text-lg font-medium text-gray-900 sm:pl-6">
                                    {{ body.username }}
                                </td>
                                <td class="whitespace-nowrap py-4 pl-4 pr-3 text-lg font-medium text-gray-900 sm:pl-6">
                                    {{ body.role }}
                                </td>
                                <td
                                    class="whitespace-nowrap pl-3 pr-4 flex justify-end gap-x-2 text-base font-medium sm:pr-6">
                                    <MenuUser :uuid="body.uuid" />
                                </td>
                            </tr>
                        </tbody>
                        <tbody v-else>
                            <tr>
                                <td colspan="100%" class="py-4 text-center bg-gray-100">
                                    <div class="flex flex-col items-center justify-center">
                                        <p class="mt-2 text-lg font-semibold text-gray-500">
                                            Table is empty
                                        </p>
                                    </div>
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