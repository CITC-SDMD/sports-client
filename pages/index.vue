<template>

    <Head>
        <Title>{{ runtimeConfig?.public?.appName }} | Login</Title>
    </Head>

    <div class="flex h-screen flex-1">
        <div class="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
            <div class="mx-auto w-full max-w-sm lg:w-96">
                <div>
                    <img class="h-10 w-auto"
                        src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                        alt="Your Company" />
                    <h2 class="mt-8 text-2xl/9 font-bold tracking-tight text-gray-900">Sign in to your account</h2>
                </div>

                <div class="mt-10">
                    <div>
                        <form @submit-prevent="" class="space-y-6">
                            <div>
                                <FormLabel for="username" label="Username" />
                                <div class="mt-2">
                                    <FormTextField name="username" class="w-full" />
                                </div>
                            </div>

                            <div>
                                <label for="password" class="block text-sm/6 font-medium text-gray-900">Password</label>
                                <div class="mt-2">
                                    <FormTextField type="password" name="password" class="w-full" />
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
            <img class="absolute inset-0 size-full object-cover"
                src="/assets//img/cover.jpg"
                alt="" />
        </div>
    </div>
</template>

<script setup lang="ts">

const runtimeConfig = useRuntimeConfig()

</script>