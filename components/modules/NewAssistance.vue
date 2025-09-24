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
                                    <FormSelect :options="state.option.type_assistance" name="type_assistance"
                                        class="w-full" v-model="state.form.type_assistance" />
                                    <FormError :error="v$?.form.type_assistance?.$errors[0]?.$message.toString()" />
                                    <FormError :error="state.error?.errors?.form.type_assistance?.[0]" />
                                </div>
                            </div>
                            <div>
                                <div class="flex">
                                    <FormLabel for="description" label="Description" />
                                </div>
                                <div class="mt-2">
                                    <FormTextField name="description" class="w-full" v-model="state.form.description" />
                                </div>
                            </div>
                            <div>
                                <div class="flex">
                                    <FormLabel for="provider" label="Provider" />
                                </div>
                                <div class="mt-2">
                                    <FormTextField name="provider" class="w-full" v-model="state.form.provider" />
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
import { useAlert } from '@/composables/alert'

const emit = defineEmits(['cancelAction', 'submitForm', 'showError'])

const { successAlert } = useAlert()

const state = reactive({
    form: {
        type_assistance: null as any,
        description: null as any,
        provider: null as any,
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
