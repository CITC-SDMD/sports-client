<template>

    <Head>
        <Title>{{ runtimeConfig?.public?.appName }} | Users</Title>
    </Head>

    <div>
        <TableUser :head="state.head" />
    </div>
</template>

<script setup lang="ts">

const runtimeConfig = useRuntimeConfig()

definePageMeta({
    layout: 'main'
})

const state = reactive({
    head: [
        {
            name: 'Full name'
        },
        {
            name: 'Username'
        },
        {
            name: 'Role'
        }
    ],
    body: []
})

</script>
