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
                                    <FormLabel for="type_assistance " label="Type Assistance " />
                                    <span class="text-red-500">*</span>
                                </div>
                                <div class="mt-2">
                                    <FormSelect :options="state.option.type_assistance" :disable="true"
                                        name="type_assistance" class="w-full" v-model="state.form.type_assistance" />
                                    <FormError :error="v$?.form.type_assistance?.$errors[0]?.$message.toString()" />
                                    <FormError :error="state.error?.errors?.form.type_assistance?.[0]" />
                                </div>
                            </div>
                            <div>
                                <div class="flex">
                                    <FormLabel for="amount" label="Amount" />
                                    <span class="text-red-500">*</span>
                                </div>
                                <div class="mt-2">
                                    <FormTextField name="amount" class="w-full" v-model="state.form.amount"
                                        :disable="true" />
                                    <FormError :error="v$?.form.amount?.$errors[0]?.$message.toString()" />
                                    <FormError :error="state.error?.errors?.form.amount?.[0]" />
                                </div>
                            </div>
                            <div>
                                <div class="flex">
                                    <FormLabel for="provider" label="Provider" />
                                </div>
                                <div class="mt-2">
                                    <FormSelect :options="state.option.provider" :disable="true" name="provider"
                                        class="w-full" v-model="state.form.provider" />
                                </div>
                            </div>
                            <div>
                                <div class="flex">
                                    <FormLabel for="date_applied" label="Date applied" />
                                    <span class="text-red-500">*</span>
                                </div>
                                <div class="mt-2">
                                    <FormDatePicker name="date_applied" class="w-full" v-model="state.form.date_applied"
                                        :disable="true" />
                                    <FormError :error="v$?.form.date_applied?.$errors[0]?.$message.toString()" />
                                    <FormError :error="state.error?.errors?.form.date_applied?.[0]" />
                                </div>
                            </div>
                            <div v-if="props.identity != 'processing'">
                                <div class="flex">
                                    <FormLabel for="date_released" label="Date released" />
                                </div>
                                <div class="mt-2">
                                    <FormDatePicker name="date_released" class="w-full"
                                        v-model="state.form.date_released" />
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
import { required, helpers } from '@vuelidate/validators'

const emit = defineEmits(['cancelAction', 'submitForm', 'showError'])

const props = defineProps({
    career: {
        type: Object,
        required: true
    },
    identity: {
        type: String,
        required: true
    }
})

const state = reactive({
    form: {
        type_assistance: props.career.type_assistance,
        description: props.career.description,
        amount: props.career.amount,
        provider: props.career.provider,
        date_applied: props.career.date_applied,
        date_released: props.career.date_released,
    },
    option: {
        type_assistance: [
            {
                value: 'Cash Incentives for Medals',
                label: 'Cash Incentives for Medals'
            },
            {
                value: 'Competition Performance',
                label: 'Competition Performance'
            },
            {
                value: 'Monthly Allowance ',
                label: 'Monthly Allowance '
            },
            {
                value: 'Stipends',
                label: 'Stipends'
            },
            {
                value: 'Scholarships ',
                label: 'Scholarships '
            },
            {
                value: 'Educational Support',
                label: 'Educational Support'
            },
            {
                value: 'Training & Equipment Support',
                label: 'Training & Equipment Support'
            },
            {
                value: 'Financial Assistance for Competitions',
                label: 'Financial Assistance for Competitions'
            },
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
            {
                value: 'Support during Training Camps ',
                label: 'Support during Training Camps '
            },
            {
                value: 'Billeting ',
                label: 'Billeting '
            },
            {
                value: 'Medical  ',
                label: 'Medical  '
            },
            {
                value: 'Health Support ',
                label: 'Health Support '
            },
        ],
        provider: [
            {
                value: 'PSC / LGU / Sponsor',
                label: 'PSC / LGU / Sponsor '
            },
            {
                value: 'PSC / LGU / Private Donor',
                label: 'PSC / LGU / Private Donor '
            },
            {
                value: 'PSC / LGU clinic',
                label: 'PSC / LGU clinic '
            },
            {
                value: 'LGU / DepEd / School',
                label: 'LGU / DepEd / School '
            },
        ]
    },
    error: null as any,
})


const rules = computed(() => {
    return {
        form: {
            type_assistance: {
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
