<template>
    <TransitionRoot as="template" :show="props.open">
        <Dialog class="relative z-50">
            <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100"
                leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
                <div class="fixed inset-0 bg-gray-500/75 transition-opacity" />
            </TransitionChild>
            <div class="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-4 text-center sm:p-0">
                <TransitionChild as="template" enter="ease-out duration-300"
                    enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200"
                    leave-from="opacity-100 translate-y-0 sm:scale-100"
                    leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                    <DialogPanel
                        class="relative transform overflow-visible rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 w-full sm:max-w-7xl sm:p-6">
                        <div class="flex items-center justify-end">
                            <button type="button" @click="closeAction"
                                class="rounded-md bg-white px-3 py-2 text-xs font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-100">
                                <XMarkIcon class="h-5 w-5" />
                            </button>
                        </div>
                        <ErrorAlert v-if="state.error" :message="state.error.message" />
                        <div class="flow-root">
                            <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                                    <div class="overflow-hidden shadow-sm outline-1 outline-black/5 sm:rounded-lg">
                                        <table class="relative min-w-full divide-y divide-gray-300">
                                            <thead class="bg-gray-50">
                                                <tr>
                                                    <th scope="col"
                                                        class="py-3.5 pr-3 pl-4 text-left text-base font-semibold text-gray-900 sm:pl-6">
                                                        Files
                                                    </th>
                                                    <th scope="col" class="py-3.5 pr-4 pl-3 sm:pr-6">
                                                        <span class="sr-only">Edit</span>
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody class="divide-y divide-gray-200 bg-white">
                                                <tr v-for="file in state.files" :key="file.id">
                                                    <td
                                                        class="py-4 pr-3 pl-4 text-base font-medium whitespace-nowrap text-gray-900 sm:pl-6">
                                                        <a :href="file.file_url" target="_blank"
                                                            class="underline text-blue-500">
                                                            {{ file.type }}

                                                        </a>
                                                    </td>
                                                    <td class="py-4 flex justify-end">
                                                        <FormButton @click="deleteFile(file.uuid)"
                                                            class="bg-red-500 hover:!bg-red-700">
                                                            Delete
                                                        </FormButton>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </DialogPanel>
                </TransitionChild>
            </div>
        </Dialog>
    </TransitionRoot>
</template>

<script setup lang="ts">
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { XMarkIcon } from '@heroicons/vue/20/solid'
import { documentService } from '@/api/document/DocumentService'
import { useAlert } from '@/composables/alert'

const { successAlert } = useAlert()

const router = useRouter()
const uuid = String(router?.currentRoute?.value?.params?.uuid)

const emit = defineEmits(['closeRequirement'])

const props = defineProps({
    open: {
        type: Boolean,
        required: true
    }
})

const state = reactive({
    error: null as any,
    files: null as any
})

onMounted(() => {
    getDocuments()
})

function closeAction() {
    emit('closeRequirement', false)
}

async function getDocuments() {
    try {
        let params = {
            model_uuid: uuid
        }
        const response = await documentService.fetchDocuments(params)
        if (response.data) {
            state.files = response.data
        }
    } catch (error) {
        state.error = error
    }
}

async function deleteFile(data: any) {
    try {
        const response = await documentService.deleteDocuments(data)
        if (response.message == 'Success.') {
            successAlert('Success.', 'File deleted.')
            getDocuments()
        }
    } catch (error) {
        state.error = error
    }
}

</script>
