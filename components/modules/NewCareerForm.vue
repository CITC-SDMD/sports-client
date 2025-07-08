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
                            <FormLabel for="sports_name" label="Sports name" />
                            <span class="text-red-500">*</span>
                        </div>
                        <div class="mt-2">
                            <FormTextField name="sports_name" class="w-full" v-model="state.form.sports_name" />
                            <FormError :error="v$?.form.sports_name?.$errors[0]?.$message.toString()" />
                            <FormError :error="state.error?.errors?.form.sports_name?.[0]" />
                        </div>
                    </div>

                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                    <div>
                        <div class="flex">
                            <FormLabel for="highlights" label="Highlights" />
                        </div>
                        <div class="mt-2">
                            <FormTextField name="highlights" class="w-full" v-model="state.form.highlights" />
                        </div>
                    </div>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                        <div class="flex">
                            <FormLabel for="awards" label="Awards" />
                        </div>
                        <div class="mt-2">
                            <FormTextField name="awards" class="w-full" v-model="state.form.awards" />
                        </div>
                    </div>
                    <div>
                        <div class="flex">
                            <FormLabel for="coach_status" label="Coach status" />
                        </div>
                        <div class="mt-2">
                            <FormTextField name="coach_status" class="w-full" v-model="state.form.coach_status" />
                        </div>
                    </div>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                        <div class="flex">
                            <FormLabel for="history_injury" label="History injury" />
                        </div>
                        <div class="mt-2">
                            <FormTextField name="history_injury" class="w-full" v-model="state.form.history_injury" />
                        </div>
                    </div>
                    <div>
                        <div class="flex">
                            <FormLabel for="injury_date" label="Injury date" />
                        </div>
                        <div class="mt-2">
                            <FormDatePicker name="injury_date" class="w-full" v-model="state.form.injury_date" />
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
                            <FormLabel for="training_seminar" label="Training seminars" />
                        </div>
                        <div class="mt-2">
                            <FormTextField name="training_seminar" class="w-full"
                                v-model="state.form.training_seminar" />
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
import { required, helpers } from '@vuelidate/validators'

const emit = defineEmits(['submitForm'])

const state = reactive({
    form: {
        id_number: null as any,
        performance: null as any,
        career_date: null as any,
        sports_name: null as any,
        position_role: null as any,
        highlights: null as any,
        awards: null as any,
        coach_status: null as any,
        history_injury: null as any,
        injury_date: null as any,
        affiliations: null as any,
        sports_asso: null as any,
        training_seminar: null as any,
    },
    error: null as any,
})

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
            sports_name: {
                required: helpers.withMessage('This field is required.', required),
            },
            position_role: {
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
</script>