<template>

    <Head>
        <Title>{{ runtimeConfig?.public?.appName }} | Dashboard</Title>
    </Head>

    <div class="text-black dark:text-white">
        Dashboard
    </div>
</template>

<script setup lang="ts">

const runtimeConfig = useRuntimeConfig()

definePageMeta({
    layout: 'main'
})

</script>