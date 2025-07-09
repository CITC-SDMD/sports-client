<template>
    <form @submit.prevent="submit" autocomplete="off" class="max-w-2xl">
        <div class="mt-6 space-y-4 grid grid-cols-1">
            <div class="space-y-4">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                        <div class="flex">
                            <FormLabel for="id_number" label="ID number" />
                            <span class="text-red-500">*</span>
                        </div>
                        <div class="mt-2">
                            <FormTextField name="id_number" class="w-full" v-model=state.form.id_number />
                            <FormError :error="v$?.form.id_number?.$errors[0]?.$message.toString()" />
                            <FormError :error="state.error?.errors?.form.id_number?.[0]" />
                        </div>
                    </div>
                    <div>
                        <div class="flex">
                            <FormLabel for="performance" label="Performance" />
                            <span class="text-red-500">*</span>
                        </div>
                        <div class="mt-2">
                            <FormTextField name="performance" class="w-full" v-model="state.form.performance" />
                            <FormError :error="v$?.form.performance?.$errors[0]?.$message.toString()" />
                            <FormError :error="state.error?.errors?.form.performance?.[0]" />
                        </div>
                    </div>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                        <div class="flex">
                            <FormLabel for="competition_id" label="Competition" />
                            <span class="text-red-500">*</span>
                        </div>
                        <div class="mt-2">
                            <FormSelect :options="state.option.competitions" name="competition_id" class="w-full"
                                v-model="state.form.competition_id" />
                            <FormError :error="v$?.form.competition_id?.$errors[0]?.$message.toString()" />
                            <FormError :error="state.error?.errors?.form.competition_id?.[0]" />
                        </div>
                    </div>
                    <div>
                        <div class="flex">
                            <FormLabel for="sport_id" label="Sport" />
                            <span class="text-red-500">*</span>
                        </div>
                        <div class="mt-2">
                            <FormSelect :options="state.option.sports" name="sport_id" class="w-full"
                                v-model="state.form.sport_id" />
                            <FormError :error="v$?.form.sport_id?.$errors[0]?.$message.toString()" />
                            <FormError :error="state.error?.errors?.form.sport_id?.[0]" />
                        </div>
                    </div>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                        <div class="flex">
                            <FormLabel for="career_date" label="Career date" />
                            <span class="text-red-500">*</span>
                        </div>
                        <div class="mt-2">
                            <FormDatePicker name="career_date" class="w-full" v-model="state.form.career_date" />
                            <FormError :error="v$?.form.career_date?.$errors[0]?.$message.toString()" />
                            <FormError :error="state.error?.errors?.form.career_date?.[0]" />
                        </div>
                    </div>
                    <div>
                        <div class="flex">
                            <FormLabel for="position_role" label="Position role" />
                            <span class="text-red-500">*</span>
                        </div>
                        <div class="mt-2">
                            <FormTextField name="position_role" class="w-full" v-model="state.form.position_role" />
                            <FormError :error="v$?.form.position_role?.$errors[0]?.$message.toString()" />
                            <FormError :error="state.error?.errors?.form.position_role?.[0]" />
                        </div>
                    </div>

                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                        <div class="flex">
                            <FormLabel for="highlights" label="Highlights" />
                            <span class="text-red-500">*</span>
                        </div>
                        <div class="mt-2">
                            <FormSelect :options="state.option.award_hightlight" name="highlights" class="w-full"
                                v-model="state.form.highlights" />
                            <FormError :error="v$?.form.highlights?.$errors[0]?.$message.toString()" />
                            <FormError :error="state.error?.errors?.form.highlights?.[0]" />
                        </div>
                    </div>
                    <div>
                        <div class="flex">
                            <FormLabel for="awards" label="Awards" />
                            <span class="text-red-500">*</span>
                        </div>
                        <div class="mt-2">
                            <FormSelect :options="state.option.award_hightlight" name="awards" class="w-full"
                                v-model="state.form.awards" />
                            <FormError :error="v$?.form.awards?.$errors[0]?.$message.toString()" />
                            <FormError :error="state.error?.errors?.form.awards?.[0]" />
                        </div>
                    </div>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                        <div class="flex">
                            <FormLabel for="coach_status" label="Coach status" />
                        </div>
                        <div class="mt-2">
                            <FormTextField name="coach_status" class="w-full" v-model="state.form.coach_status" />
                        </div>
                    </div>
                    <div>
                        <div class="flex">
                            <FormLabel for="training_seminar" label="Training seminars" />
                        </div>
                        <div class="mt-2">
                            <FormTextField name="training_seminar" class="w-full"
                                v-model="state.form.training_seminar" />
                        </div>
                    </div>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                        <div class="flex">
                            <FormLabel for="affiliations" label="Affiliations" />
                        </div>
                        <div class="mt-2">
                            <FormTextField name="affiliations" class="w-full" v-model="state.form.affiliations" />
                        </div>
                    </div>
                    <div>
                        <div class="flex">
                            <FormLabel for="sports_asso" label="Sports association" />
                        </div>
                        <div class="mt-2">
                            <FormTextField name="sports_asso" class="w-full" v-model="state.form.sports_asso" />
                        </div>
                    </div>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                        <div class="flex">
                            <FormLabel for="is_injured" label="Was the player injured?" />
                        </div>
                        <div class="mt-4 flex items-center justify-start">
                            <FormToggle name="is_injured" v-model="state.form.is_injured" />
                        </div>
                    </div>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3" v-if="state.form.is_injured">
                    <div>
                        <div class="flex">
                            <FormLabel for="play_status" label="Play status" />
                            <span class="text-red-500">*</span>
                        </div>
                        <div class="mt-2">
                            <FormTextField name="play_status" class="w-full" v-model="state.form.play_status" />
                            <FormError :error="v$?.form.play_status?.$errors[0]?.$message.toString()" />
                            <FormError :error="state.error?.errors?.form.play_status?.[0]" />
                        </div>
                    </div>
                    <div>
                        <div class="flex">
                            <FormLabel for="health_status" label="Health Status" />
                            <span class="text-red-500">*</span>
                        </div>
                        <div class="mt-2">
                            <FormTextField name="health_status" class="w-full" v-model="state.form.health_status" />
                            <FormError :error="v$?.form.health_status?.$errors[0]?.$message.toString()" />
                            <FormError :error="state.error?.errors?.form.health_status?.[0]" />
                        </div>
                    </div>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3" v-if="state.form.is_injured">
                    <div>
                        <div class="flex">
                            <FormLabel for="injury" label="Injury" />
                            <span class="text-red-500">*</span>
                        </div>
                        <div class="mt-2">
                            <FormTextField name="injury" class="w-full" v-model="state.form.injury" />
                            <FormError :error="v$?.form.injury?.$errors[0]?.$message.toString()" />
                            <FormError :error="state.error?.errors?.form.injury?.[0]" />
                        </div>
                    </div>
                    <div>
                        <div class="flex">
                            <FormLabel for="injury_date" label="Date of Injury" />
                            <span class="text-red-500">*</span>
                        </div>
                        <div class="mt-2">
                            <FormDatePicker name="injury_date" class="w-full" v-model="state.form.injury_date" />
                            <FormError :error="v$?.form.injury_date?.$errors[0]?.$message.toString()" />
                            <FormError :error="state.error?.errors?.form.injury_date?.[0]" />
                        </div>
                    </div>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3" v-if="state.form.is_injured">
                    <div class="col-span-2">
                        <div class="flex">
                            <FormLabel for="injury_desc" label="Injury Description" />
                            <span class="text-red-500">*</span>
                        </div>
                        <div class="mt-2">
                            <FormTextarea name="injury_desc" class="w-full" v-model="state.form.injury_desc" />
                            <FormError :error="v$?.form.injury_desc?.$errors[0]?.$message.toString()" />
                            <FormError :error="state.error?.errors?.form.injury_desc?.[0]" />
                        </div>
                    </div>
                </div>
            </div>

            <div class="mt-4 col-span-2">
                <FormButton type="submit" class="w-full">Submit</FormButton>
            </div>
        </div>
    </form>
</template>

<script setup lang="ts">
import { useVuelidate } from "@vuelidate/core"
import { required, helpers, requiredIf } from '@vuelidate/validators'
import { sportService } from '@/api/sport/SportService'
import { competitionService } from "@/api/competition/CompetitionService"

const emit = defineEmits(['submitForm'])

const state = reactive({
    form: {
        id_number: null as any,
        performance: null as any,
        career_date: null as any,
        sport_id: null as any,
        competition_id: null as any,
        position_role: null as any,
        highlights: null as any,
        awards: null as any,
        coach_status: null as any,
        is_injured: null as any,
        affiliations: null as any,
        sports_asso: null as any,
        training_seminar: null as any,
        play_status: null as any,
        health_status: null as any,
        injury: null as any,
        injury_date: null as any,
        injury_desc: null as any,
    },
    option: {
        award_hightlight: [
            {
                value: 'Local',
                label: 'Local'
            },
            {
                value: 'National',
                label: 'National'
            },
            {
                value: 'International',
                label: 'International'
            },
        ],
        sports: [],
        competitions: []
    },
    error: null as any,
})

onMounted(() => {
    fetchSports()
    fetchCompetitions()
})

async function fetchSports() {
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
            state.option.sports = options
        }
    } catch (error) {
        state.error = error
    }
}

async function fetchCompetitions() {
    try {
        const response = await competitionService.fetchCompetitionList()
        if (response.data) {
            let options: any = []
            response.data.forEach(
                (item: any) => options.push({
                    value: item.id,
                    label: item.competition_name,
                })
            )
            state.option.competitions = options
        }
    } catch (error) {
        state.error = error
    }
}

const rules = computed(() => {
    return {
        form: {
            id_number: {
                required: helpers.withMessage('This field is required.', required),
            },
            performance: {
                required: helpers.withMessage('This field is required.', required),
            },
            career_date: {
                required: helpers.withMessage('This field is required.', required),
            },
            sport_id: {
                required: helpers.withMessage('This field is required.', required),
            },
            competition_id: {
                required: helpers.withMessage('This field is required.', required),
            },
            position_role: {
                required: helpers.withMessage('This field is required.', required),
            },
            highlights: {
                required: helpers.withMessage('This field is required.', required),
            },
            awards: {
                required: helpers.withMessage('This field is required.', required),
            },
            play_status: {
                required: helpers.withMessage('This field is required.', requiredIf(state.form.is_injured)),
            },
            health_status: {
                required: helpers.withMessage('This field is required.', requiredIf(state.form.is_injured)),
            },
            injury: {
                required: helpers.withMessage('This field is required.', requiredIf(state.form.is_injured)),
            },
            injury_date: {
                required: helpers.withMessage('This field is required.', requiredIf(state.form.is_injured)),
            },
            injury_desc: {
                required: helpers.withMessage('This field is required.', requiredIf(state.form.is_injured)),
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
</script>