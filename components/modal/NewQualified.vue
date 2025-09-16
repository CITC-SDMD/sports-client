<template>
    <div>
        <TransitionRoot as="template" :show="props.open">
            <Dialog class="relative z-50">
                <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0"
                    enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
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
                            <div class="grid grid-cols-1 gap-y-2">
                                <div>
                                    <FormSelect :options="state.option.model" placeholder="Select Qualified Athlete"
                                        v-model="state.selectedQualified" />
                                    <FormError :error="v$?.selectedQualified?.$errors[0]?.$message.toString()" />
                                    <FormError :error="state.error?.errors?.selectedQualified?.[0]" />
                                </div>
                            </div>
                            <div class="flex space-x-2 mt-4 justify-between items-center">
                                <FormButton
                                    class="w-full bg-white border !border-gray-200 !text-black hover:!text-black hover:!bg-gray-100"
                                    @click="closeModal">
                                    Cancel
                                </FormButton>
                                <FormButton @click="submitQualified" class="w-full">
                                    Save
                                </FormButton>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </Dialog>
        </TransitionRoot>
    </div>
</template>

<script setup lang="ts">
import { eventService } from '@/api/event/EventService'
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { useVuelidate } from "@vuelidate/core"
import { required, helpers } from '@vuelidate/validators'

const router = useRouter()
const uuid = String(router?.currentRoute?.value?.params?.uuid)

const props = defineProps({
    open: {
        type: Boolean,
        required: true
    },
    buttonText: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    }
})

const emit = defineEmits(['update:open', 'saveQualified'])

const state = reactive({
    error: null as any,
    option: {
        model: []
    },
    selectedQualified: null as any,
})

onMounted(() => {
    fetchModel()
})

async function fetchModel() {
    try {
        const response = await eventService.fetchQualifiedAthletes(uuid)
        if (response.data) {
            let options: any = []
            response.data.forEach(
                (item: any) => options.push({
                    value: item.uuid,
                    label: item.firstname + ' ' + item.lastname,
                })
            )
            state.option.model = options
        }
    } catch (error) {
        state.error = error
    }
}

const rules = computed(() => {
    return {
        selectedQualified: {
            required: helpers.withMessage('This field is required.', required),
        },
    }
})

const v$ = useVuelidate(rules, state)

function submitQualified() {
    v$.value.$validate()
    if (!v$.value.$error) {
        emit('saveQualified', state.selectedQualified)
        state.selectedQualified = false
    }
}

function closeModal() {
    emit('update:open', false)
}

</script>
