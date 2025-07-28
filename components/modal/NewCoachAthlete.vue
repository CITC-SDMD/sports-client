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
                                <div class="flex justify-end">
                                    <a @click="newCoach" class="text-sm cursor-pointer text-blue-500 underline">
                                        {{ props.buttonText }}
                                    </a>
                                </div>
                                <div>
                                    <FormSelect :options="state.option.model"
                                        :placeholder="props.model == 'coach' ? 'Select coach' : 'Select athlete'"
                                        v-model="state.selectedCoachAthlete" />
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
        <ModalCreateCoachAthlete v-model:open="state.isCreateCoachModalOpen"
            @createNewCoachAthlete="createCoachAthlete" />
    </div>
</template>

<script setup lang="ts">
import { coachService } from '@/api/coach/CoachService'
import { athleteService } from '@/api/athlete/AthleteService'
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { useVuelidate } from "@vuelidate/core"
import { required, helpers } from '@vuelidate/validators'
import { useAlert } from '@/composables/alert'

const { successAlert } = useAlert()

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

const emit = defineEmits(['update:open', 'saveCoach'])

const state = reactive({
    error: null as any,
    option: {
        model: []
    },
    selectedCoachAthlete: null as any,
    isCreateCoachModalOpen: false
})

onMounted(() => {
    fetchModel()
})

async function fetchModel() {
    try {
        if (props.model === 'athlete') {
            const response = await athleteService.fetchAthleteList()
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
        } else if (props.model === 'coach') {
            const response = await coachService.fetchCoatchList()
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
        }
    } catch (error) {
        state.error = error
    }
}

const rules = computed(() => {
    return {
        selectedCoachAthlete: {
            required: helpers.withMessage('This field is required.', required),
        },
    }
})

const v$ = useVuelidate(rules, state)

function submitCoach() {
    v$.value.$validate()
    if (!v$.value.$error) {
        emit('saveCoach', state.selectedCoachAthlete)
        state.selectedCoachAthlete = false
    }
}

async function createCoachAthlete(data: any) {
    try {
        let params = new FormData
        params.append('firstname', data.firstname)
        params.append('middlename', data.middlename)
        params.append('lastname', data.lastname)
        params.append('email', data.email)
        params.append('nationality', data.nationality)
        params.append('address', data.address)
        params.append('age', data.age)
        params.append('birth_date', data.birth_date)
        params.append('birth_place', data.birth_place)
        params.append('civil_status', data.civil_status)
        params.append('sex', data.sex)
        params.append('contact_no', data.contact_no)
        params.append('school_id', data.school_id)
        params.append('occupation', data.occupation)
        params.append('club_name', data.club_name)
        params.append('photo', data.photo)
        if (props.model === 'coach') {
            const response = await coachService.createCoach(params)
            if (response.data) {
                successAlert('Success!', 'Coach created.')
                fetchModel()
                state.selectedCoachAthlete = response.data.uuid
            }
        } else {
            const response = await athleteService.createAthlete(params)
            if (response.data) {
                successAlert('Success!', 'Athlete created.')
                fetchModel()
                state.selectedCoachAthlete = response.data.uuid
            }
        }
    } catch (error) {
        state.error = error
    }
}

function newCoach() {
    state.isCreateCoachModalOpen = true
}

function closeModal() {
    emit('update:open', false)
}

</script>
