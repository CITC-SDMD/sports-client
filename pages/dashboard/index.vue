<template>

    <Head>
        <Title>{{ runtimeConfig?.public?.appName }} | Login</Title>
    </Head>

    <div>
        Dashboard
    </div>
</template>

<script setup lang="ts">

const runtimeConfig = useRuntimeConfig()

definePageMeta({
    layout: 'main'
})

</script>