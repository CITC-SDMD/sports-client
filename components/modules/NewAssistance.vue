<template>
    <div class="divide-y divide-gray-900/10">
        <form @submit.prevent="submit">
            <div class="grid grid-cols-1 gap-x-8 gap-y-8 py-10 md:grid-cols-3">
                <div class="px-4 sm:px-0">
                    <h2 class="text-base/7 font-semibold text-gray-900">Assistance Information</h2>
                    <p class="text-sm/6 text-gray-600">Other information of the athlete</p>
                </div>

                <div class="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
                    <div class="px-4 py-6 sm:p-8">
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-8 mt-4">
                            <div>
                                <div class="flex">
                                    <FormLabel for="cash_rewards " label="Cash Rewards " />
                                    <span class="text-red-500">*</span>
                                </div>
                                <div class="mt-2">
                                    <FormSelect :options="state.option.cash_rewards" name="cash_rewards" class="w-full"
                                        v-model="state.form.cash_rewards" />
                                    <FormError :error="v$?.form.cash_rewards?.$errors[0]?.$message.toString()" />
                                    <FormError :error="state.error?.errors?.form.cash_rewards?.[0]" />
                                </div>
                            </div>
                            <div>
                                <div class="flex">
                                    <FormLabel for="monthly_pay " label="Monthly Pay " />
                                    <span class="text-red-500">*</span>
                                </div>
                                <div class="mt-2">
                                    <FormSelect :options="state.option.monthly_pay" name="monthly_pay" class="w-full"
                                        v-model="state.form.monthly_pay" />
                                    <FormError :error="v$?.form.monthly_pay?.$errors[0]?.$message.toString()" />
                                    <FormError :error="state.error?.errors?.form.monthly_pay?.[0]" />
                                </div>
                            </div>
                            <div>
                                <div class="flex">
                                    <FormLabel for="school_help " label="School Help " />
                                    <span class="text-red-500">*</span>
                                </div>
                                <div class="mt-2">
                                    <FormSelect :options="state.option.school_help" name="school_help" class="w-full"
                                        v-model="state.form.school_help" />
                                    <FormError :error="v$?.form.school_help?.$errors[0]?.$message.toString()" />
                                    <FormError :error="state.error?.errors?.form.school_help?.[0]" />
                                </div>
                            </div>
                            <div>
                                <div class="flex">
                                    <FormLabel for="gear_training" label="Gear & Training" />
                                    <span class="text-red-500">*</span>
                                </div>
                                <div class="mt-2">
                                    <FormSelect :options="state.option.gear_training" name="gear_training"
                                        class="w-full" v-model="state.form.gear_training" />
                                    <FormError :error="v$?.form.gear_training?.$errors[0]?.$message.toString()" />
                                    <FormError :error="state.error?.errors?.form.gear_training?.[0]" />
                                </div>
                            </div>
                            <div>
                                <div class="flex">
                                    <FormLabel for="trip_money " label="Trip Money" />
                                    <span class="text-red-500">*</span>
                                </div>
                                <div class="mt-2">
                                    <FormSelect :options="state.option.trip_money" name="trip_money" class="w-full"
                                        v-model="state.form.trip_money" />
                                    <FormError :error="v$?.form.trip_money?.$errors[0]?.$message.toString()" />
                                    <FormError :error="state.error?.errors?.form.trip_money?.[0]" />
                                </div>
                            </div>
                            <div>
                                <div class="flex">
                                    <FormLabel for="daily_allowances " label="Daily Allowances" />
                                    <span class="text-red-500">*</span>
                                </div>
                                <div class="mt-2">
                                    <FormSelect :options="state.option.daily_allowances" name="daily_allowances"
                                        class="w-full" v-model="state.form.daily_allowances" />
                                    <FormError :error="v$?.form.daily_allowances?.$errors[0]?.$message.toString()" />
                                    <FormError :error="state.error?.errors?.form.daily_allowances?.[0]" />
                                </div>
                            </div>
                            <div>
                                <div class="flex">
                                    <FormLabel for="lodging " label="Lodging" />
                                    <span class="text-red-500">*</span>
                                </div>
                                <div class="mt-2">
                                    <FormSelect :options="state.option.lodging" name="lodging" class="w-full"
                                        v-model="state.form.lodging" />
                                    <FormError :error="v$?.form.lodging?.$errors[0]?.$message.toString()" />
                                    <FormError :error="state.error?.errors?.form.lodging?.[0]" />
                                </div>
                            </div>
                            <div>
                                <div class="flex">
                                    <FormLabel for="health_support " label="Health Support" />
                                    <span class="text-red-500">*</span>
                                </div>
                                <div class="mt-2">
                                    <FormSelect :options="state.option.health_support" name="health_support"
                                        class="w-full" v-model="state.form.health_support" />
                                    <FormError :error="v$?.form.health_support?.$errors[0]?.$message.toString()" />
                                    <FormError :error="state.error?.errors?.form.health_support?.[0]" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex items-center justify-end gap-x-4">
                <FormButton type="button" @click="cancel" class="w-full bg-gray-300 !text-gray-900 hover:!bg-gray-200">
                    Cancel
                </FormButton>
                <FormButton type="submit" class="w-full">Submit</FormButton>
            </div>
        </form>
    </div>
</template>

<script setup lang="ts">
import { useVuelidate } from "@vuelidate/core"
import { required, helpers, requiredIf } from '@vuelidate/validators'
import { useAlert } from '@/composables/alert'


const emit = defineEmits(['cancelAction', 'submitForm', 'showError'])

const { successAlert } = useAlert()

const state = reactive({
    form: {
        cash_rewards: null as any,
        monthly_pay: null as any,
        school_help: null as any,
        gear_training: null as any,
        trip_money: null as any,
        daily_allowances: null as any,
        lodging: null as any,
        health_support: null as any
    },
    option: {
        cash_rewards: [
            {
                value: 'Cash Incentives for Medals',
                label: 'Cash Incentives for Medals'
            },
            {
                value: 'Competition Performance',
                label: 'Competition Performance'
            },
        ],
        monthly_pay: [
            {
                value: 'Monthly Allowance ',
                label: 'Monthly Allowance '
            },
            {
                value: 'Stipends',
                label: 'Stipends'
            },
        ],
        school_help: [
            {
                value: 'Scholarships ',
                label: 'Scholarships '
            },
            {
                value: 'Educational Support',
                label: 'Educational Support'
            },
        ],
        gear_training: [
            {
                value: 'Training & Equipment Support',
                label: 'Training & Equipment Support'
            },
        ],
        trip_money: [
            {
                value: 'Financial Assistance for Competitions',
                label: 'Financial Assistance for Competitions'
            },
        ],
        daily_allowances: [
            {
                value: 'Meals',
                label: 'Meals'
            },
            {
                value: 'Transportation',
                label: 'Transportation'
            },
            {
                value: 'Uniforms',
                label: 'Uniforms'
            },
        ],
        lodging: [
            {
                value: 'Support during Training Camps ',
                label: 'Support during Training Camps '
            },
            {
                value: 'Billeting ',
                label: 'Billeting '
            },
        ],
        health_support: [
            {
                value: 'Medical  ',
                label: 'Medical  '
            },
            {
                value: 'Health Support ',
                label: 'Health Support '
            },
        ]
    },
    error: null as any,
})


const rules = computed(() => {
    return {
        form: {
            cash_rewards: {
                required: helpers.withMessage('This field is required.', required),
            },
            monthly_pay: {
                required: helpers.withMessage('This field is required.', required),
            },
            school_help: {
                required: helpers.withMessage('This field is required.', required),
            },
            gear_training: {
                required: helpers.withMessage('This field is required.', required),
            },
            trip_money: {
                required: helpers.withMessage('This field is required.', required),
            },
            daily_allowances: {
                required: helpers.withMessage('This field is required.', required),
            },
            lodging: {
                required: helpers.withMessage('This field is required.', required),
            },
            health_support: {
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

function cancel() {
    emit('cancelAction')
}
</script>
