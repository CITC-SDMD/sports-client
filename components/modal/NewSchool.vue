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
                        class="relative transform overflow-visible rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                        <ErrorAlert v-if="state.error" :message="state.error.message" />
                        <div>
                            <div class="flex">
                                <FormLabel for="school_name" label="School name" />
                            </div>
                            <div>
                                <FormTextField name="school_name" v-model="state.school_name" class="w-full"
                                    placeholder="Enter new school name" />
                                <FormError :error="v$?.school_name?.$errors[0]?.$message.toString()" />
                                <FormError :error="state.error?.errors?.school_name?.[0]" />
                            </div>
                        </div>
                        <div class="flex space-x-2 mt-4 justify-between items-center">
                            <FormButton
                                class="w-full bg-white border !border-gray-200 !text-black hover:!text-black hover:!bg-gray-100"
                                @click="closeModal">
                                Cancel
                            </FormButton>
                            <FormButton @click="submitSchool" class="w-full">
                                Save
                            </FormButton>
                        </div>
                    </DialogPanel>
                </TransitionChild>
            </div>
        </Dialog>
    </TransitionRoot>
</template>

<script setup lang="ts">
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { useVuelidate } from "@vuelidate/core"
import { required, helpers, requiredIf } from '@vuelidate/validators'

const props = defineProps({
    open: {
        type: Boolean,
        required: true
    },
})

const emit = defineEmits(['update:open', 'saveSchool'])

const state = reactive({
    error: null as any,
    school_name: null as any,
})

const rules = computed(() => {
    return {
        school_name: {
            required: helpers.withMessage('This field is required.', requiredIf(props.open)),
        },
    }
})

const v$ = useVuelidate(rules, state)

function submitSchool() {
    v$.value.$validate()
    if (!v$.value.$error) {
        emit('saveSchool', state.school_name)
        closeModal()
    }
}

function closeModal() {
    emit('update:open', false)
}

</script>
