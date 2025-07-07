<template>
    <form @submit.prevent="" autocomplete="off" class="max-w-2xl">
        <div class="mt-6 space-y-4 grid grid-cols-1">
            <div class="space-y-4">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                        <div class="flex">
                            <FormLabel for="firstname" label="First name" />
                            <span class="text-red-500">*</span>
                        </div>
                        <div class="mt-2">
                            <FormTextField name="firstname" class="w-full" v-model=state.form.firstname />
                            <FormError :error="v$?.form.firstname?.$errors[0]?.$message.toString()" />
                            <FormError :error="state.error?.errors?.form.firstname?.[0]" />
                        </div>
                    </div>
                    <div>
                        <FormLabel for="middlename" label="Middle initial" />
                        <div class="mt-2">
                            <FormTextField name="middlename" class="w-full" v-model="state.form.middlename" />
                        </div>
                    </div>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                        <div class="flex">
                            <FormLabel for="lastname" label="Last name" />
                            <span class="text-red-500">*</span>
                        </div>
                        <div class="mt-2">
                            <FormTextField name="lastname" class="w-full" v-model="state.form.lastname" />
                            <FormError :error="v$?.form.lastname?.$errors[0]?.$message.toString()" />
                            <FormError :error="state.error?.errors?.form.lastname?.[0]" />
                        </div>
                    </div>
                    <div>
                        <div class="flex">
                            <FormLabel for="birthdate" label="Birthday" />
                            <span class="text-red-500">*</span>
                        </div>
                        <div class="mt-2">
                            <FormDatePicker name="birthdate" class="w-full" />
                            <FormError :error="v$?.form.birthdate?.$errors[0]?.$message.toString()" />
                            <FormError :error="state.error?.errors?.form.birthdate?.[0]" />
                        </div>
                    </div>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div class="col-span-2">
                        <div class="flex">
                            <FormLabel for="address" label="Address" />
                            <span class="text-red-500">*</span>
                        </div>
                        <div class="mt-2">
                            <FormTextarea name="address" class="w-full" />
                            <FormError :error="v$?.form.address?.$errors[0]?.$message.toString()" />
                            <FormError :error="state.error?.errors?.form.address?.[0]" />
                        </div>
                    </div>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                        <div class="flex">
                            <FormLabel for="lastname" label="Last name" />
                            <span class="text-red-500">*</span>
                        </div>
                        <div class="mt-2">
                            <FormTextField name="lastname" class="w-full" v-model="state.form.lastname" />
                            <FormError :error="v$?.form.lastname?.$errors[0]?.$message.toString()" />
                            <FormError :error="state.error?.errors?.form.lastname?.[0]" />
                        </div>
                    </div>
                    <div>
                        <div class="flex">
                            <FormLabel for="birthdate" label="Birthday" />
                            <span class="text-red-500">*</span>
                        </div>
                        <div class="mt-2">
                            <FormDatePicker name="birthdate" class="w-full" />
                            <FormError :error="v$?.form.birthdate?.$errors[0]?.$message.toString()" />
                            <FormError :error="state.error?.errors?.form.birthdate?.[0]" />
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

const state = reactive({
    form: {
        firstname: null as any,
        middlename: null as any,
        lastname: null as any,
        address: null as any,
        age: null as any,
        birthdate: null as any,
        birth_place: null as any,
        civil_status: null as any,
        gender: null as any,
        contact_no: null as any,
        religion: null as any,
        school: null as any,
        occupation: null as any,
        sports_team: null as any,
        photo: null as any,
        registry_date: null as any,
    },
    error: null as any
})

const rules = computed(() => {
    return {
        form: {
            firstname: {
                required: helpers.withMessage('This field is required.', required),
            },
            lastname: {
                required: helpers.withMessage('This field is required.', required),
            },
            address: {
                required: helpers.withMessage('This field is required.', required),
            },
            age: {
                required: helpers.withMessage('This field is required.', required),
            },
            birthdate: {
                required: helpers.withMessage('This field is required.', required),
            },
            birth_place: {
                required: helpers.withMessage('This field is required.', required),
            },
            civil_status: {
                required: helpers.withMessage('This field is required.', required),
            },
            gender: {
                required: helpers.withMessage('This field is required.', required),
            },
            contact_no: {
                required: helpers.withMessage('This field is required.', required),
            },
            religion: {
                required: helpers.withMessage('This field is required.', required),
            },
            school: {
                required: helpers.withMessage('This field is required.', required),
            },
            occupation: {
                required: helpers.withMessage('This field is required.', required),
            },
            sports_team: {
                required: helpers.withMessage('This field is required.', required),
            },
            photo: {
                required: helpers.withMessage('This field is required.', required),
            },
            registry_date: {
                required: helpers.withMessage('This field is required.', required),
            },
        }
    }
})

const v$ = useVuelidate(rules, state)
</script>