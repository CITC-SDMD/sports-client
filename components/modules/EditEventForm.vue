<template>
    <form @submit.prevent="submit">
        <div class="divide-y divide-gray-900/10">
            <div class="grid grid-cols-1 gap-x-8 gap-y-8 py-10 md:grid-cols-3">
                <div class="px-4 sm:px-0">
                    <h2 class="text-base/7 font-semibold text-gray-900">Event Information</h2>
                    <p class="mt-1 text-sm/6 text-gray-600">
                        Essential details of the event.
                    </p>
                </div>

                <div class="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
                    <div class="px-4 py-6 sm:p-8">
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-8 mt-4">
                            <div>
                                <div class="flex">
                                    <FormLabel for="event_name" label="Event name" />
                                    <span class="text-red-500">*</span>
                                </div>
                                <div class="mt-2">
                                    <FormTextField name="event_name" class="w-full" v-model="state.form.event_name" />
                                    <FormError :error="v$?.form.event_name?.$errors[0]?.$message.toString()" />
                                    <FormError :error="state.error?.errors?.form.event_name?.[0]" />
                                </div>
                            </div>
                            <div>
                                <div class="flex">
                                    <FormLabel for="event_type" label="Event type" />
                                    <span class="text-red-500">*</span>
                                </div>
                                <div class="mt-2">
                                    <FormSelect :options="state.options.event_type" name="event_type" class="w-full"
                                        v-model="state.form.event_type" />
                                    <FormError :error="v$?.form.event_name?.$errors[0]?.$message.toString()" />
                                    <FormError :error="state.error?.errors?.form.event_name?.[0]" />
                                </div>
                            </div>
                            <div>
                                <div class="flex">
                                    <FormLabel for="sport_id" label="Sports name" />
                                    <span class="text-red-500">*</span>
                                </div>
                                <div class="mt-2">
                                    <FormSelect :options="state.options.sport" name="sport_id" class="w-full"
                                        v-model="state.form.sport_id" />
                                    <FormError :error="v$?.form.sport_id?.$errors[0]?.$message.toString()" />
                                    <FormError :error="state.error?.errors?.form.sport_id?.[0]" />
                                </div>
                            </div>
                            <div>
                                <div class="flex">
                                    <FormLabel for="organizer" label="Organizer" />
                                    <span class="text-red-500">*</span>
                                </div>
                                <div class="mt-2">
                                    <FormSelect :options="state.options.organizer" name="organizer" class="w-full"
                                        v-model="state.form.organizer" />
                                    <FormError :error="v$?.form.organizer?.$errors[0]?.$message.toString()" />
                                    <FormError :error="state.error?.errors?.form.organizer?.[0]" />
                                </div>
                            </div>
                            <div class="col-span-2">
                                <div class="flex">
                                    <FormLabel for="description" label="Description" />
                                </div>
                                <div class="mt-2">
                                    <FormTextarea name="description" class="w-full" v-model="state.form.description" />
                                    <FormError :error="v$?.form.description?.$errors[0]?.$message.toString()" />
                                    <FormError :error="state.error?.errors?.form.description?.[0]" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="grid grid-cols-1 gap-x-8 gap-y-8 py-10 md:grid-cols-3">
                <div class="px-4 sm:px-0">
                    <h2 class="text-base/7 font-semibold text-gray-900">Schedule</h2>
                    <p class="mt-1 text-sm/6 text-gray-600">
                        Essential details of the event.
                    </p>
                </div>

                <div class="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
                    <div class="px-4 py-6 sm:p-8">
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-8 mt-4">
                            <div>
                                <div class="flex">
                                    <FormLabel for="event_start" label="Event start" />
                                    <span class="text-red-500">*</span>
                                </div>
                                <div class="mt-2">
                                    <FormDatePicker name="event_start" class="w-full"
                                        v-model="state.form.event_start" />
                                    <FormError :error="v$?.form.event_start?.$errors[0]?.$message.toString()" />
                                    <FormError :error="state.error?.errors?.form.event_start?.[0]" />
                                </div>
                            </div>
                            <div>
                                <div class="flex">
                                    <FormLabel for="event_end" label="Event end" />
                                    <span class="text-red-500">*</span>
                                </div>
                                <div class="mt-2">
                                    <FormDatePicker name="event_end" class="w-full" v-model="state.form.event_end" />
                                    <FormError :error="v$?.form.event_end?.$errors[0]?.$message.toString()" />
                                    <FormError :error="state.error?.errors?.form.event_end?.[0]" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="grid grid-cols-1 gap-x-8 gap-y-8 py-10 md:grid-cols-3">
                <div class="px-4 sm:px-0">
                    <h2 class="text-base/7 font-semibold text-gray-900">Categories & Divisions</h2>
                    <p class="mt-1 text-sm/6 text-gray-600">
                        Essential details of the event.
                    </p>
                </div>

                <div class="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
                    <div class="px-4 py-6 sm:p-8">
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-8 mt-4">
                            <div>
                                <div class="flex">
                                    <FormLabel for="age_category" label="Age category" />
                                    <span class="text-red-500">*</span>
                                </div>
                                <div class="mt-2">
                                    <FormSelect :options="state.options.age_category" name="age_category" class="w-full"
                                        v-model="state.form.age_category" />
                                    <FormError :error="v$?.form.age_category?.$errors[0]?.$message.toString()" />
                                    <FormError :error="state.error?.errors?.form.age_category?.[0]" />
                                </div>
                            </div>
                            <div>
                                <div class="flex">
                                    <FormLabel for="gender_category" label="Gender category" />
                                    <span class="text-red-500">*</span>
                                </div>
                                <div class="mt-2">
                                    <FormSelect :options="state.options.gender_category" name="gender_category"
                                        class="w-full" v-model="state.form.gender_category" />
                                    <FormError :error="v$?.form.gender_category?.$errors[0]?.$message.toString()" />
                                    <FormError :error="state.error?.errors?.form.gender_category?.[0]" />
                                </div>
                            </div>
                            <div>
                                <div class="flex">
                                    <FormLabel for="participant_type" label="Participant type" />
                                    <span class="text-red-500">*</span>
                                </div>
                                <div class="mt-2">
                                    <FormSelect :options="state.options.participant_type" name="participant_type"
                                        class="w-full" v-model="state.form.participant_type" />
                                    <FormError :error="v$?.form.participant_type?.$errors[0]?.$message.toString()" />
                                    <FormError :error="state.error?.errors?.form.participant_type?.[0]" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="grid grid-cols-1 gap-x-8 gap-y-8 py-10 md:grid-cols-3">
                <div class="px-4 sm:px-0">
                    <h2 class="text-base/7 font-semibold text-gray-900">Venue</h2>
                    <p class="mt-1 text-sm/6 text-gray-600">
                        Essential details of the event.
                    </p>
                </div>

                <div class="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
                    <div class="px-4 py-6 sm:p-8">
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-8 mt-4">
                            <div>
                                <div class="flex">
                                    <FormLabel for="venue_name" label="Venue name" />
                                    <span class="text-red-500">*</span>
                                </div>
                                <div class="mt-2">
                                    <FormTextField name="venue_name" class="w-full" v-model="state.form.venue_name" />
                                    <FormError :error="v$?.form.venue_name?.$errors[0]?.$message.toString()" />
                                    <FormError :error="state.error?.errors?.form.venue_name?.[0]" />
                                </div>
                            </div>
                            <div>
                                <div class="flex">
                                    <FormLabel for="location" label="Location" />
                                    <span class="text-red-500">*</span>
                                </div>
                                <div class="mt-2">
                                    <FormTextField name="location" class="w-full" v-model="state.form.location" />
                                    <FormError :error="v$?.form.location?.$errors[0]?.$message.toString()" />
                                    <FormError :error="state.error?.errors?.form.location?.[0]" />
                                </div>
                            </div>
                            <div>
                                <div class="flex">
                                    <FormLabel for="capacity" label="Capacity" />
                                </div>
                                <div class="mt-2">
                                    <FormTextField name="capacity" class="w-full" v-model="state.form.capacity" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="flex items-center justify-end gap-x-4">
                <FormButton type="button" @click="cancelEdit"
                    class="w-full bg-gray-300 !text-gray-900 hover:!bg-gray-200">
                    Cancel
                </FormButton>
                <FormButton type="submit" class="w-full">Submit</FormButton>
            </div>
        </div>
    </form>
</template>

<script setup lang="ts">
import { sportService } from "@/api/sport/SportService"
import { useVuelidate } from "@vuelidate/core"
import { required, helpers } from '@vuelidate/validators'

const emit = defineEmits(['submitForm', 'showError', 'cancelAction'])

const props = defineProps({
    event: {
        type: Object,
        required: true
    }
})

const state = reactive({
    form: {
        event_name: props.event.event_name,
        event_type: props.event.event_type,
        sport_id: props.event.sport_id,
        organizer: props.event.organizer,
        description: props.event.description,
        event_start: props.event.event_start,
        event_end: props.event.event_end,
        age_category: props.event.age_category,
        gender_category: props.event.gender_category,
        participant_type: props.event.participant_type,
        venue_name: props.event.venue_name,
        location: props.event.location,
        capacity: props.event.capacity
    },
    error: null as any,
    options: {
        event_type: [
            { value: 'tournament', label: 'Tournament' },
            { value: 'league', label: 'League' },
            { value: 'training session', label: 'Training session' },
            { value: 'other', label: 'Other' },
        ],
        organizer: [
            { value: 'LGU', label: 'LGU' },
            { value: 'barangay', label: 'Barangay' },
            { value: 'school', label: 'School' },
            { value: 'psc', label: 'PSC' },
        ],
        age_category: [
            { value: 'u12', label: 'under 12 years old' },
            { value: 'u15', label: 'under 15 years old' },
            { value: 'u18', label: 'under 18 years old' },
            { value: 'u21', label: 'under 21 years old' },
            { value: 'Open', label: 'Open' },
        ],
        gender_category: [
            { value: 'male', label: 'Male' },
            { value: 'female', label: 'Female' },
        ],
        participant_type: [
            { value: 'team', label: 'Team' },
            { value: 'individual', label: 'Individual' },
        ],
        sport: []
    }
})


onMounted(() => {
    fetchEvents()
})

const rules = computed(() => {
    return {
        form: {
            event_name: {
                required: helpers.withMessage('This field is required.', required),
            },
            event_type: {
                required: helpers.withMessage('This field is required.', required),
            },
            sport_id: {
                required: helpers.withMessage('This field is required.', required),
            },
            organizer: {
                required: helpers.withMessage('This field is required.', required),
            },
            event_start: {
                required: helpers.withMessage('This field is required.', required),
            },
            event_end: {
                required: helpers.withMessage('This field is required.', required),
            },
            age_category: {
                required: helpers.withMessage('This field is required.', required),
            },
            gender_category: {
                required: helpers.withMessage('This field is required.', required),
            },
            participant_type: {
                required: helpers.withMessage('This field is required.', required),
            },
            venue_name: {
                required: helpers.withMessage('This field is required.', required),
            },
            location: {
                required: helpers.withMessage('This field is required.', required),
            },
        }
    }
})


const v$ = useVuelidate(rules, state)

function submit() {
    v$.value.$validate()
    if (!v$.value.$error) {
        emit('submitForm', state.form)
    }
}

async function fetchEvents() {
    try {
        const response = await sportService.fetchSportList()
        if (response.data) {
            let options: any = []
            response.data.forEach(
                (item: any) => options.push({
                    value: item.id,
                    label: item.sports_name,
                })
            )
            state.options.sport = options
            console.log(response.data)
        }
    } catch (error) {
        emit('showError', state.error)
    }
}

function cancelEdit() {
    emit('cancelAction')
}

</script>
