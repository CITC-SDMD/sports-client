<template>

    <Head>
        <Title>{{ runtimeConfig?.public?.appName }} | Login</Title>
    </Head>

    <div class="flex h-screen flex-1">
        <Loader v-if="state.isPageLoading" />
        <div class="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
            <div class="mx-auto w-full max-w-sm lg:w-96">
                <div>
                    <img class="h-10 w-auto"
                        src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                        alt="Your Company" />
                    <h2 class="mt-8 text-2xl/9 font-bold tracking-tight text-gray-900">
                        Sign in to your account
                    </h2>
                </div>

                <div class="mt-10">
                    <div>
                        <ErrorAlert v-if="state.error" :message="state.error.message" />
                        <form @submit.prevent="login" class="space-y-6">
                            <div>
                                <div class="flex">
                                    <FormLabel for="username" label="Username" />
                                    <span class="text-red-500">*</span>
                                </div>
                                <div class="mt-2">
                                    <FormTextField name="username" class="w-full" v-model="state.username" />
                                    <FormError :error="v$?.username?.$errors[0]?.$message.toString()" />
                                    <FormError :error="state.error?.errors?.username?.[0]" />
                                </div>
                            </div>

                            <div>
                                <div class="flex">
                                    <FormLabel for="password" label="Password" />
                                    <span class="text-red-500">*</span>
                                </div>
                                <div class="mt-2">
                                    <FormTextField type="password" name="password" class="w-full"
                                        v-model="state.password" />
                                    <FormError :error="v$?.password?.$errors[0]?.$message.toString()" />
                                    <FormError :error="state.error?.errors?.password?.[0]" />
                                </div>
                            </div>

                            <div>
                                <FormButton type="submit" class="w-full">Login</FormButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <div class="relative hidden w-0 flex-1 lg:block">
            <img class="absolute inset-0 size-full object-cover" src="/assets//img/cover.jpg" alt="" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { authService } from '@/api/auth/AuthService'
import { useVuelidate } from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'
import { useUserStore } from '~/store/user'

const runtimeConfig = useRuntimeConfig()
const userStore = useUserStore()

onMounted(() => {
    if (localStorage.getItem('_token')) {
        navigateTo('/dashboard')
    }
})

const state = reactive({
    error: null as any,
    isPageLoading: null as any,
    username: '',
    password: ''
})

const rules = computed(() => {
    return {
        username: {
            required: helpers.withMessage('This field is required.', required),
        },
        password: {
            required: helpers.withMessage('This field is required.', required),
        },
    }
})

const v$ = useVuelidate(rules, state)

async function login() {
    v$.value.$validate()
    if (!v$.value.$error) {
        state.isPageLoading = true
        try {
            let params = {
                username: state.username,
                password: state.password
            }
            const response = await authService.login(params)
            if (response.data) {
                localStorage.setItem("_token", response.data.token)
                userStore.setUser(response.data.user)
                navigateTo('/dashboard')
            }
        } catch (error) {
            state.error = error
        }
    }
    state.isPageLoading = false
}
</script>