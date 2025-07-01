<template>

    <Head>
        <Title>{{ runtimeConfig?.public?.appName }} | Coaches</Title>
    </Head>

    <div>
        Coaches
    </div>
</template>

<script setup lang="ts">

const runtimeConfig = useRuntimeConfig()

definePageMeta({
    layout: 'main'
})

</script>