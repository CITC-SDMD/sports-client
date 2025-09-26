<template>
    <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
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
                        <tr v-if="props.body?.data?.length > 0" v-for="(document, index) in props.body.data"
                            :key="document.id">
                            <td class="whitespace-nowrap px-3 py-4 text-base text-gray-500 max-w-48 truncate">
                                {{ document?.type }}
                            </td>
                            <td class="whitespace-nowrap px-3 py-4 text-base text-gray-500 max-w-48 truncate">
                                <a :href="document.file_url" target="_blank" class="underline text-blue-500">
                                    {{ document.type }}
                                </a>
                            </td>
                            <!-- <td
                                class="whitespace-nowrap py-7 pl-3 pr-4 flex items-center justify-end font-medium sm:pr-6">
                                <MenuDocuementTable :uuid="document.uuid" @refresh="$emit('updateDocuements')"
                                    :is-reversed-dropdown="index >= props.body.data.length - 3" />
                            </td> -->
                            <td
                                class="whitespace-nowrap px-3 py-4 text-base flex items-center justify-end text-gray-500 max-w-48 truncate">
                                <FormButton @click="deleteFile(document.uuid)" class="bg-red-500 hover:!bg-red-700">
                                    Delete
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
import { documentService } from '@/api/document/DocumentService'
import { useAlert } from '@/composables/alert'

const { successAlert } = useAlert()

const emit = defineEmits(['updateDocuements'])

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

const state = reactive({
    error: null as any,
    files: null as any
})


async function deleteFile(data: any) {
    try {
        const response = await documentService.deleteDocuments(data)
        if (response.message == 'Success.') {
            successAlert('Success.', 'File deleted.')
            emit('updateDocuements')
        }
    } catch (error) {
        state.error = error
    }
}
</script>