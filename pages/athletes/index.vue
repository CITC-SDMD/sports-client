<template>

    <Head>
        <Title>{{ runtimeConfig?.public?.appName }} | Athletes</Title>
    </Head>

    <div>
        <p class="dark:text-white">Athletes</p>
    </div>
</template>

<script setup lang="ts">

const runtimeConfig = useRuntimeConfig()

definePageMeta({
    layout: 'main'
})

</script>