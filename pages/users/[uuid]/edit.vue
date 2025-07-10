<template>

    <Head>
        <Title>{{ runtimeConfig?.public?.appName }} | Edit User</Title>
    </Head>

    <div>
        <Loader v-if=state.isPageLoading />
        <ErrorAlert v-if="state.error" :message="state.error.message" />
        <FormBackButton @click="goToPreviousPage" />
        <div class="mt-8">
            <ModulesEditUserForm v-if="state.user" :user="state.user" @submitForm="editUser" />
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

const router = useRouter()
const uuid = String(router?.currentRoute?.value?.params?.uuid)

definePageMeta({
    layout: 'main'
})

onMounted(() => {
    fetchUser()
})

const state = reactive({
    isPageLoading: false,
    error: null as any,
    user: null as any
})

async function fetchUser() {
    state.isPageLoading = true
    try {
        const response = await userService.fetchUser(uuid)
        if (response.data) {
            state.user = response.data
        }
    } catch (error) {
        state.error = error
    }
    state.isPageLoading = false
}

async function editUser(data: any) {
    state.isPageLoading = true
    try {
        let params = {
            firstname: data.firstname,
            middlename: data.middlename,
            lastname: data.lastname,
            username: data.username,
            password: data.password ?? null,
            role: data.role,
        }
        const response = await userService.updateUser(params, uuid)
        if (response.data) {
            successAlert('Success!', 'User updated.')
            goToPreviousPage()
        }
    } catch (error) {
        state.error = error
    }
    state.isPageLoading = false
}

function goToPreviousPage() {
    const url = path.replace(`/${uuid}/edit`, '')
    navigateTo(url)
}
</script>