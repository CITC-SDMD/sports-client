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
                        class="relative transform rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 w-full sm:max-w-7xl sm:p-6">
                        <div class="flex items-center justify-end">
                            <button type="button" @click="closeAction"
                                class="rounded-md bg-white px-3 py-2 text-xs font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-100">
                                <XMarkIcon class="h-5 w-5" />
                            </button>
                        </div>
                        <div class="max-h-[80vh] overflow-y-auto mt-5">
                            <ErrorAlert v-if="state.error" :message="state.error.message" />
                            <div class="md:col-span-2">
                                <form @submit.prevent="submit">
                                    <div v-if="hasComplete"
                                        class="flex items-center justify-center bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl p-6 gap-2">
                                        <CheckCircleIcon class="w-10 h-10 text-blue-600" />
                                        <div class="font-bold text-xl text-blue-500">All documents have been uploaded.
                                        </div>
                                    </div>
                                    <div v-else
                                        class="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl space-y-6 p-6">
                                        <div v-if="!hasDocument('Identification')">
                                            <div class="flex">
                                                <FormLabel for="identification" label="Proof of Identification" />
                                                <span class="text-red-500">*</span>
                                            </div>
                                            <div class="mt-2">
                                                <FormFileUpload name="identification"
                                                    @fileSelected="(value) => state.form.identification = value" />
                                                <FormError
                                                    :error="v$?.form.identification?.$errors[0]?.$message.toString()" />
                                                <FormError :error="state.error?.errors?.form.identification?.[0]" />
                                            </div>
                                        </div>
                                        <div v-if="!hasDocument('Birth Certificate')">
                                            <div class="flex">
                                                <FormLabel for="birth_certificate" label="Birth Certificate" />
                                                <span class="text-red-500">*</span>
                                            </div>
                                            <div class="mt-2">
                                                <FormFileUpload name="birth_certificate"
                                                    @fileSelected="(value) => state.form.birth_certificate = value" />
                                                <FormError
                                                    :error="v$?.form.birth_certificate?.$errors[0]?.$message.toString()" />
                                                <FormError :error="state.error?.errors?.form.birth_certificate?.[0]" />
                                            </div>
                                        </div>
                                        <div v-if="!hasDocument('Pre-Qualifying Results')">
                                            <div class="flex">
                                                <FormLabel for="pre_qualifying" label="Pre-Qualifying Results" />
                                                <span class="text-red-500">*</span>
                                            </div>
                                            <div class="mt-2">
                                                <FormFileUpload name="pre_qualifying"
                                                    @fileSelected="(value) => state.form.pre_qualifying = value" />
                                                <FormError
                                                    :error="v$?.form.pre_qualifying?.$errors[0]?.$message.toString()" />
                                                <FormError :error="state.error?.errors?.form.pre_qualifying?.[0]" />
                                            </div>
                                        </div>
                                        <div v-if="!hasDocument('Entry Form')">
                                            <div class="flex">
                                                <FormLabel for="entry_form" label="Entry Form" />
                                                <span class="text-red-500">*</span>
                                            </div>
                                            <div class="mt-2">
                                                <FormFileUpload name="entry_form"
                                                    @fileSelected="(value) => state.form.entry_form = value" />
                                                <FormError
                                                    :error="v$?.form.entry_form?.$errors[0]?.$message.toString()" />
                                                <FormError :error="state.error?.errors?.form.entry_form?.[0]" />
                                            </div>
                                        </div>
                                        <div v-if="!hasDocument('Passport')">
                                            <div class="flex">
                                                <FormLabel for="passport" label="Passport" />
                                                <span class="text-red-500">*</span>
                                            </div>
                                            <div class="mt-2">
                                                <FormFileUpload name="passport"
                                                    @fileSelected="(value) => state.form.passport = value" />
                                                <FormError
                                                    :error="v$?.form.passport?.$errors[0]?.$message.toString()" />
                                                <FormError :error="state.error?.errors?.form.passport?.[0]" />
                                            </div>
                                        </div>
                                        <div v-if="state.age < 18 && !hasDocument('Parent Consent')">
                                            <div class=" flex gap-1">
                                                <FormLabel for="parent_consent" label="Parent Consent" />
                                                <span class="text-red-500">*</span>
                                            </div>
                                            <div class="mt-2">
                                                <FormFileUpload name="parent_consent"
                                                    @fileSelected="(value) => state.form.parent_consent = value" />
                                                <FormError
                                                    :error="v$?.form.parent_consent?.$errors[0]?.$message.toString()" />
                                                <FormError :error="state.error?.errors?.form.parent_consent?.[0]" />
                                            </div>
                                        </div>
                                        <div v-if="!hasDocument('Request Letter')">
                                            <div class="flex">
                                                <FormLabel for="letter_request" label="Letter Request" />
                                                <span class="text-red-500">*</span>
                                            </div>
                                            <div class="mt-2">
                                                <FormFileUpload name="letter_request"
                                                    @fileSelected="(value) => state.form.request_letter = value" />
                                                <FormError
                                                    :error="v$?.form.request_letter?.$errors[0]?.$message.toString()" />
                                                <FormError :error="state.error?.errors?.form.request_letter?.[0]" />
                                            </div>
                                        </div>
                                        <div v-if="!hasDocument('Brgy Clearance')">
                                            <div class="flex">
                                                <FormLabel for="brgy_clearance" label="Brgy Clearance" />
                                                <span class="text-red-500">*</span>
                                            </div>
                                            <div class="mt-2">
                                                <FormFileUpload name="brgy_clearance"
                                                    @fileSelected="(value) => state.form.brgy_clearance = value" />
                                                <FormError
                                                    :error="v$?.form.brgy_clearance?.$errors[0]?.$message.toString()" />
                                                <FormError :error="state.error?.errors?.form.brgy_clearance?.[0]" />
                                            </div>
                                        </div>
                                        <div class="mt-4 col-span-2">
                                            <FormButton type="submit" class="w-full">Submit</FormButton>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </DialogPanel>
                </TransitionChild>
            </div>
        </Dialog>
    </TransitionRoot>
</template>

<script setup lang="ts">
import { useVuelidate } from "@vuelidate/core"
import { required, helpers, requiredIf } from '@vuelidate/validators'
import { documentService } from '@/api/document/DocumentService'
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { XMarkIcon, CheckCircleIcon } from '@heroicons/vue/20/solid'

const router = useRouter()
const uuid = String(router?.currentRoute?.value?.params?.uuid)

const emit = defineEmits(['closeRequirement', 'saveDocuments'])

const props = defineProps({
    open: {
        type: Boolean,
        required: true
    },
    model: {
        type: String,
        required: true
    }
})

const state = reactive({
    form: {
        identification: null as any,
        birth_certificate: null as any,
        pre_qualifying: null as any,
        entry_form: null as any,
        passport: null as any,
        parent_consent: null as any,
        request_letter: null as any,
        brgy_clearance: null as any
    },
    files: [] as any[],
    age: null as any,
    error: null as any,
})

const hasDocument = computed(() => {
    return (docType: any) => {
        return state.files.some((file: any) => file.type === docType);
    };
});

const hasComplete = computed(() => {
    return state.files.length === 8;
});

watch(() => props.model, (newValue: any) => {
    const currentYear = new Date().getFullYear()
    const birthDate = newValue?.birth_date
    const birthYear = new Date(birthDate).getFullYear()
    const age = currentYear - birthYear
    state.age = age
})


onMounted(() => {
    getDocuments()
})

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

watch(
    () => props.open,
    (newValue) => {
        if (newValue) {
            getDocuments();
        }
    }
);

const rules = computed(() => {
    return {
        form: {
            identification: {
                required: helpers.withMessage('This field is required.', requiredIf(() => !hasDocument.value('Identification'))),
            },
            birth_certificate: {
                required: helpers.withMessage('This field is required.', requiredIf(() => !hasDocument.value('Birth Certificate'))),
            },
            pre_qualifying: {
                required: helpers.withMessage('This field is required.', requiredIf(() => !hasDocument.value('Pre-Qualifying Results'))),
            },
            entry_form: {
                required: helpers.withMessage('This field is required.', requiredIf(() => !hasDocument.value('Entry Form'))),
            },
            passport: {
                required: helpers.withMessage('This field is required.', requiredIf(() => !hasDocument.value('Passport'))),
            },
            request_letter: {
                required: helpers.withMessage('This field is required.', requiredIf(() => !hasDocument.value('Request Letter'))),
            },
            brgy_clearance: {
                required: helpers.withMessage('This field is required.', requiredIf(() => !hasDocument.value('Brgy Clearance'))),
            },
            parent_consent: {
                required: helpers.withMessage('This field is required.', requiredIf(() => state.age < 18 && !hasDocument.value('Parent Consent'))),
            }
        }
    }
})

const v$ = useVuelidate(rules, state)

function submit() {
    v$.value.$validate()
    if (!v$.value.$error) {
        emit('saveDocuments', state.form)
    }
}

function closeAction() {
    emit('closeRequirement', false)
}
</script>
