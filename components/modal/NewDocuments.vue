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
                        <div class="md:col-span-2">
                            <div class="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl space-y-6 p-6">
                                <div>
                                    <div class="flex">
                                        <FormLabel for="letter_request" label="Letter Request" />
                                        <span class="text-red-500">*</span>
                                    </div>
                                    <div class="mt-2">
                                        <FormFileUpload name="letter_request"
                                            @fileSelected="(value) => state.form.letter = value" />
                                    </div>
                                </div>
                                <div>
                                    <div class="flex">
                                        <FormLabel for="parent_consent" label="Parent`s Consent" />
                                        <span class="text-red-500">*</span>
                                    </div>
                                    <div class="mt-2">
                                        <FormFileUpload name="parent_consent"
                                            @fileSelected="(value) => state.form.consent = value" />
                                    </div>
                                </div>
                                <div>
                                    <div class="flex">
                                        <FormLabel for="Brgy_clearance" label="Brgy Clearance" />
                                        <span class="text-red-500">*</span>
                                    </div>
                                    <div class="mt-2">
                                        <FormFileUpload name="Brgy_clearance"
                                            @fileSelected="(value) => state.form.clearance = value" />
                                    </div>
                                </div>
                                <div class="mt-4 col-span-2">
                                    <FormButton type="submit" class="w-full">Submit</FormButton>
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
    form: {
        letter: null as any,
        consent: null as any,
        clearance: null as any
    },
    error: null as any,
    files: null as any,
})

function closeAction() {
    emit('closeRequirement', false)
}


</script>
