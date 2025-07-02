<template>
    <div>
        <FormBackButton @click="goToPreviousPage" />
        <div class="mt-8">
            <ModulesAthleteProfile />
        </div>
    </div>
</template>

<script setup lang="ts">

const router = useRouter()
const uuid = router?.currentRoute?.value?.params?.uuid

definePageMeta({
    layout: 'main'
})

function goToPreviousPage() {
    navigateTo(`/athletes`)
}

</script>