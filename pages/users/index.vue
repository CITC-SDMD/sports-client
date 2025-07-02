<template>

    <Head>
        <Title>{{ runtimeConfig?.public?.appName }} | Users</Title>
    </Head>

    <div class="text-black dark:text-white">
        Users
    </div>
</template>

<script setup lang="ts">

const runtimeConfig = useRuntimeConfig()

definePageMeta({
    layout: 'main'
})

</script>
