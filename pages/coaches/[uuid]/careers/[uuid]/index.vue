<template>

    <Head>
        <Title>{{ runtimeConfig?.public?.appName }} | Career</Title>
    </Head>

    <div>
        <Loader v-if="state.isPageLoading" />
        <FormBackButton @click="goToPreviousPage" />
        <ErrorAlert v-if="state.error" :message="state.error.message" />
        <div class="flex items-center justify-end mt-8 space-x-2">
            <FormButton @click="goToEditPage" class="flex items-center gap-x-2">
                <PencilSquareIcon class="h-5 w-5" />
                Edit
            </FormButton>
            <FormButton @click="openDeleteModal" class="flex items-center gap-x-2 bg-red-500 hover:bg-red-700">
                <TrashIcon class="h-5 w-5" />
                Delete
            </FormButton>
        </div>
        <div class="mt-2">
            <div class="overflow-hidden rounded-lg bg-white shadow mb-6">
                <div class="px-4 py-5 sm:p-6 grid grid-cols-1 sm:flex sm:items-center sm:gap-x-4">
                    <div class="flex items-center justify-center">
                        <img v-if="state.career?.model?.photo"
                            class="size-24 rounded-full ring-4 ring-white sm:size-32 bg-white"
                            :src="state.career?.model?.photo" alt="profile photo" />
                        <img v-else class="size-24 rounded-full ring-4 ring-white sm:size-32 bg-white" :src="avatarUrl"
                            alt="profile photo" />
                    </div>
                    <div class="flex items-center justify-center mt-4 sm:mt-0">
                        <span class="text-4xl font-bold">
                            {{ state.career?.model?.firstname }}
                            {{ (state.career?.model?.middlename != 'null') ? state.career?.model?.middlename : '' }}
                            {{ state.career?.model?.lastname }}
                        </span>
                    </div>
                </div>
            </div>
            <ModulesCareerInfo v-if="state.career" :career="state.career" />
        </div>
        <ModalDeleteCareer v-model:open="state.isDeleteOpen" @deleteCareer="removeCareer" />
    </div>
</template>

<script setup lang="ts">
import { careerService } from '@/api/career/CareerService'
import { PencilSquareIcon, TrashIcon } from '@heroicons/vue/20/solid'
import { useAlert } from '~/composables/alert'

const runtimeConfig = useRuntimeConfig()

const avatarUrl = ref('/img/avatars/user.svg')

const { successAlert } = useAlert()

const route = useRoute()
const path = route.fullPath

const router = useRouter()
const uuid = String(router?.currentRoute?.value?.params?.uuid)

definePageMeta({
    layout: 'main'
})

onMounted(() => {
    fetchCareer()
})

const state = reactive({
    isPageLoading: false,
    error: null as any,
    career: null as any,
    isDeleteOpen: false
})

async function fetchCareer() {
    state.isPageLoading = true
    try {
        const response = await careerService.fetchCareer(uuid)
        if (response.data) {
            state.career = response.data
        }
    } catch (error) {
        state.error = error
    }
    state.isPageLoading = false
}

async function removeCareer(data: any) {
    if (data) {
        state.isPageLoading = true
        try {
            const response = await careerService.deleteCareer(uuid)
            if (response.message === 'Success.') {
                successAlert('Success!', 'Career deleted.')
                goToPreviousPage()
            }
        } catch (error) {
            state.error = error
        }
        state.isPageLoading = false
    }
}

function openDeleteModal() {
    state.isDeleteOpen = true
}

function goToPreviousPage() {
    const url = path.replace(`/${uuid}`, '')
    navigateTo(url)
}

function goToEditPage() {
    navigateTo(`${path}/edit`)
}
</script>