<template>
    <form @submit.prevent="submit" autocomplete="off" class="max-w-2xl">
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
                            <FormLabel for="role" label="Role" />
                            <span class="text-red-500">*</span>
                        </div>
                        <div class="mt-2">
                            <FormSelect :options="state.option.role" name="role" class="w-full"
                                v-model="state.form.role" />
                            <FormError :error="v$?.form.role?.$errors[0]?.$message.toString()" />
                            <FormError :error="state.error?.errors?.form.role?.[0]" />
                        </div>
                    </div>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                        <div class="flex">
                            <FormLabel for="username" label="Username" />
                            <span class="text-red-500">*</span>
                        </div>
                        <div class="mt-2">
                            <FormTextField name="username" class="w-full" v-model="state.form.username" />
                            <FormError :error="v$?.form.username?.$errors[0]?.$message.toString()" />
                            <FormError :error="state.error?.errors?.form.username?.[0]" />
                        </div>
                    </div>
                    <div>
                        <div class="flex">
                            <FormLabel for="password" label="Password" />
                        </div>
                        <div class="mt-2">
                            <FormTextField name="password" class="w-full" v-model="state.form.password" />
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

const props = defineProps({
    user: {
        type: Object,
        required: true
    }
})

const state = reactive({
    form: {
        firstname: props.user.firstname,
        middlename: props.user.middlename,
        lastname: props.user.lastname,
        username: props.user.username,
        role: props.user.role,
        password: null as any,
    },
    error: null as any,
    option: {
        role: [
            {
                value: 'Admin',
                label: 'Admin'
            },
            {
                value: 'User',
                label: 'User'
            },
        ]
    }
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
            username: {
                required: helpers.withMessage('This field is required.', required),
            },
            role: {
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