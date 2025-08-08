<template>

    <Head>
        <Title>{{ runtimeConfig?.public?.appName }} | Dashboard</Title>
    </Head>
    <div>
        <ModulesDashboard />
    </div>
</template>

<script setup lang="ts">

const runtimeConfig = useRuntimeConfig()

definePageMeta({
    layout: 'main'
})

</script>