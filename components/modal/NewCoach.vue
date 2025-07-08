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
                        <div v-if="state.error != null" class="mb-4">
                            <div class="rounded-md bg-red-50 p-4">
                                <div class="flex">
                                    <div class="shrink-0">
                                        <XCircleIcon class="size-5 text-red-400" aria-hidden="true" />
                                    </div>
                                    <div class="ml-3">
                                        <h3 class="text-sm font-medium text-red-800">
                                            {{ state.error }}
                                        </h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="grid grid-cols-1 gap-y-2">
                            <div class="flex justify-end">
                                <a @click="" class="text-sm cursor-pointer text-blue-500 underline">
                                    Add new coach
                                </a>
                            </div>
                            <div>
                                <FormSelect :options="state.option.coach" placeholder="Select coach"
                                    v-model="state.selectedCoach" />
                                <FormError :error="v$?.selectedCoach?.$errors[0]?.$message.toString()" />
                                <FormError :error="state.error?.errors?.selectedCoach?.[0]" />
                            </div>
                        </div>
                        <div class="flex space-x-2 mt-4 justify-between items-center">
                            <FormButton
                                class="w-full bg-white border !border-gray-200 !text-black hover:!text-black hover:!bg-gray-100"
                                @click="closeModal">
                                Cancel
                            </FormButton>
                            <FormButton @click="submitCoach" class="w-full">
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
import { coachService } from '@/api/coach/CoachService'
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { XCircleIcon } from '@heroicons/vue/24/outline'
import { useVuelidate } from "@vuelidate/core"
import { required, helpers } from '@vuelidate/validators'

const props = defineProps({
    open: {
        type: Boolean,
        required: true
    },
})

const emit = defineEmits(['update:open', 'saveCoach'])

const state = reactive({
    error: null as any,
    option: {
        coach: []
    },
    selectedCoach: null as any
})

onMounted(() => {
    fetchCoaches()
})

async function fetchCoaches() {
    try {
        const response = await coachService.fetchCoatchList()
        if (response.data) {
            let options: any = []
            response.data.forEach(
                (item: any) => options.push({
                    value: item.uuid,
                    label: item.firstname + ' ' + item.middlename + ' ' + item.lastname,
                })
            )
            state.option.coach = options
        }
    } catch (error) {
        state.error = error
    }
}

const rules = computed(() => {
    return {
        selectedCoach: {
            required: helpers.withMessage('This field is required.', required),
        },
    }
})

const v$ = useVuelidate(rules, state)

function submitCoach() {
    v$.value.$validate()
    if (!v$.value.$error) {
        emit('saveCoach', state.selectedCoach)
    }
}

function closeModal() {
    emit('update:open', false)
}

</script>
