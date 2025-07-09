<template>

    <Head>
        <Title>{{ runtimeConfig?.public?.appName }} | Dashboard</Title>
    </Head>

    <div class="text-black">
        Dashboard
    </div>
</template>

<script setup lang="ts">

const runtimeConfig = useRuntimeConfig()

definePageMeta({
    layout: 'main'
})

</script>