<template>

    <Head>
        <Title>{{ runtimeConfig?.public?.appName }} | Create User</Title>
    </Head>

    <div>
        <Loader v-if=state.isPageLoading />
        <ErrorAlert v-if="state.error" :message="state.error.message" />
        <FormBackButton @click="goToPreviousPage" />
        <div class="mt-8">
            <ModulesCreateUserForm @submitForm="makeUser" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { userService } from '~/api/user/UserService'
import { useAlert } from '~/composables/alert'

const runtimeConfig = useRuntimeConfig()

const { successAlert } = useAlert()

const route = useRoute()
const path = route.fullPath

definePageMeta({
    layout: 'main'
})

const state = reactive({
    isPageLoading: false,
    error: null as any,
})

async function makeUser(data: any) {
    state.isPageLoading = true
    try {
        let params = {
            firstname: data.firstname,
            middlename: data.middlename ?? null,
            lastname: data.lastname,
            username: data.username,
            password: data.password,
            role: data.role,
        }
        const response = await userService.createUser(params)
        if (response.data) {
            successAlert('Success!', 'User created.')
            goToPreviousPage()
        }
    } catch (error) {
        error
    }
    state.isPageLoading = false
}

function goToPreviousPage() {
    const url = path.replace('/create', '')
    navigateTo(url)
}
</script>