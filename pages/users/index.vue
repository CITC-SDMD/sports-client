<template>

    <Head>
        <Title>{{ runtimeConfig?.public?.appName }} | Users</Title>
    </Head>

    <div>
        <Loader v-if="state.isPageLoading" />
        <ErrorAlert v-if="state.error" :message="state.error.message" />
        <div class="flex items-center justify-between">
            <div class="w-full">
                <form @submit.prevent="search" class="flex w-full space-x-4">
                    <FormTextField name="search" v-model=state.searchFilter class="w-full" placeholder="Search user" />
                    <FormButton type="submit" class="flex items-center gap-x-2">
                        <MagnifyingGlassIcon class="w-6 h-6" />
                        Search
                    </FormButton>
                </form>
            </div>
            <div class="w-full flex justify-end">
                <FormButton @click="goToCreateUser" class="flex items-center gap-x-2">
                    <PlusIcon class="w-6 h-6" />
                    Add new user
                </FormButton>
            </div>
        </div>
        <TableUser :head="state.head" v-if="state.body" :body="state.body" @passToParent="removeUser" />
        <Pagination v-if="state.body?.data?.length > 0" :data="state.body" @previous="previous()" @next="next()" />
        <ModalDeleteUser v-model:open="state.isDeleteUserOpen" @eraseUser="deleteUser" />
    </div>
</template>

<script setup lang="ts">
import { PlusIcon, MagnifyingGlassIcon } from '@heroicons/vue/20/solid'
import { userService } from '~/api/user/UserService'
import { useAlert } from '~/composables/alert'
import { useUserStore } from '~/store/user'

const userStore = useUserStore()
const user = userStore.getUser

const runtimeConfig = useRuntimeConfig()

const { successAlert, errorAlert } = useAlert()

const route = useRoute()
const path = route.fullPath

definePageMeta({
    layout: 'main'
})

let currentPage = 1

onMounted(() => {
    fetchUsers()
})

const state = reactive({
    isPageLoading: false,
    error: null as any,
    head: [
        {
            name: 'Full name'
        },
        {
            name: 'Username'
        },
        {
            name: 'Role'
        }
    ],
    body: [] as any,
    search: null as any,
    searchFilter: null as any,
    isDeleteUserOpen: false,
    uuidToDelete: null as any,
    currentUser: user as any
})

async function fetchUsers() {
    state.isPageLoading = true
    try {
        let params = {
            page: currentPage,
            search: state.search
        }
        const response = await userService.fetchUsers(params)
        if (response.data) {
            state.body = response
        }
    } catch (error) {
        state.error = error
    }
    state.isPageLoading = false
}

async function deleteUser() {
    if (state.currentUser.uuid !== state.uuidToDelete) {
        state.isPageLoading = true
        try {
            const response = await userService.deleteUser(state.uuidToDelete)
            if (response.message === 'Success.') {
                successAlert('Success!', 'User deleted.')
                fetchUsers()
                state.isDeleteUserOpen = false
            }
        } catch (error) {
            state.error = error
        }
        state.isPageLoading = false
    } else {
        errorAlert('Error!', 'You cannot delete your own account.')
        state.isDeleteUserOpen = false
    }
}

async function search() {
    currentPage = 1
    let filterString = JSON.stringify(state.searchFilter?.trim()?.split(/\s+/).filter(Boolean) || [])
    state.search = filterString
    fetchUsers()
}

async function previous() {
    currentPage--
    fetchUsers()
}

async function next() {
    currentPage++
    fetchUsers()
}

function removeUser(data: any) {
    state.uuidToDelete = data
    state.isDeleteUserOpen = true
}

function goToCreateUser() {
    navigateTo('/users/create')
}
</script>
