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
                                <div class="flex items-center gap-x-2">
                                    <input type="checkbox" :value="body.athlete?.uuid"
                                        :checked="isRowSelected(body.athlete?.uuid).value"
                                        @change="Selected(body.athlete?.uuid, $event.target?.checked)"
                                        class=" w-5 h-5 border-gray-500 rounded-sm text-blue-600 focus:ring-blue-500">
                                </div>
                            </td>
                            <td class="whitespace-nowrap px-3 py-4 text-base text-gray-500">
                                {{ body?.athlete?.firstname }}
                                {{ (body?.athlete?.middlename != 'null') ? body?.athlete?.middlename : '' }}
                                {{ body?.athlete?.lastname }}
                            </td>
                            <td class="whitespace-nowrap px-3 py-4 text-base text-gray-500">
                                {{ body?.athlete?.sex }}
                            </td>
                            <td class="whitespace-nowrap px-3 py-4 text-base text-gray-500">
                                {{ body?.athlete?.birth_date ? moment(body?.athlete?.birth_date).format('MMMM DD, YYYY')
                                    : '' }}
                            </td>
                            <td class="whitespace-nowrap px-3 py-4 text-base text-gray-500">
                                {{ body?.athlete?.civil_status }}
                            </td>
                            <td class="whitespace-nowrap px-3 py-4 text-base text-gray-500">
                                {{ body?.athlete?.contact_no }}
                            </td>
                            <td
                                class="whitespace-nowrap py-7 pl-3 pr-4 flex items-center justify-end font-medium sm:pr-6">
                                <MenuQualifiedTable :uuid="body.uuid"
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
    selected: {
        type: Array,
        default: () => [],
    } as any,
})

const emit = defineEmits(['Selected'])

const isRowSelected = (uuid: string) => {
    return computed(() => props.selected.includes(uuid, console.log(uuid)));
};

const Selected = (uuid: string, checked: any) => {
    let newSelected = [...props.selected];

    if (checked) {
        newSelected.push(uuid);
    } else {
        newSelected = newSelected.filter((item) => item !== uuid);
    }

    emit('Selected', newSelected);
};


</script>