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
                        <tr v-if="props.body?.data?.length > 0" v-for="(body, index) in props.body.data"
                            :key="body.uuid">
                            <td class="whitespace-nowrap px-3 py-4 text-base text-gray-500">
                                {{ body.id }}
                            </td>
                            <td class="whitespace-nowrap px-3 py-4 text-base text-gray-500">
                                {{ body.firstname }}
                                {{ (body.middlename != 'null') ? body.middlename : '' }}
                                {{ body.lastname }}
                            </td>
                            <td class="whitespace-nowrap px-3 py-4 text-base text-gray-500">
                                {{ body.sex }}
                            </td>
                            <td class="whitespace-nowrap px-3 py-4 text-base text-gray-500">
                                {{ body.birth_date ? moment(body.birth_date).format('MMMM DD, YYYY') : '' }}
                            </td>
                            <td class="whitespace-nowrap px-3 py-4 text-base text-gray-500">
                                {{ body.civil_status }}
                            </td>
                            <td class="whitespace-nowrap px-3 py-4 text-base text-gray-500">
                                {{ body.contact_no }}
                            </td>
                            <td
                                class="whitespace-nowrap py-7 pl-3 pr-4 flex items-center justify-end font-medium sm:pr-6">
                                <MenuAthleteCoachTable :uuid="body.uuid"
                                    :is-reversed-dropdown="index >= props.body.data.length - 3" />
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
import moment from 'moment'

const props = defineProps({
    head: {
        type: Array,
        required: true
    } as any,
    body: {
        type: Object,
        required: false
    } as any,
})
</script>