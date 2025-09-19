<template>

    <Head>
        <Title>{{ runtimeConfig?.public?.appName }} | Create User</Title>
    </Head>

    <div>
        <Loader v-if=state.isPageLoading />
        <FormBackButton @click="goToPreviousPage" />
        <div class="mt-8">
            <ErrorAlert v-if="state.error" :message="state.error.message" />
            <ModulesCreateUserForm @submitForm="makeUser" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { userService } from '@/api/user/UserService'
import { useAlert } from '@/composables/alert'

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
        let params = new FormData
        params.append('firstname', data.firstname)
        params.append('middlename', data.middlename)
        params.append('lastname', data.lastname)
        params.append('username', data.username)
        params.append('password', data.password)
        params.append('role', data.role)
        params.append('file', data.signature)
        const response = await userService.createUser(params)
        if (response.data) {
            successAlert('Success!', 'User created.')
            goToPreviousPage()
        }
    } catch (error) {
        state.error = error
    }
    state.isPageLoading = false
}

function goToPreviousPage() {
    const url = path.replace('/create', '')
    navigateTo(url)
}
</script>