<template>

    <Head>
        <Title>{{ runtimeConfig?.public?.appName }} | Users</Title>
    </Head>

    <div class="text-black">
        Users
    </div>
</template>

<script setup lang="ts">

const runtimeConfig = useRuntimeConfig()

definePageMeta({
    layout: 'main'
})

</script>
