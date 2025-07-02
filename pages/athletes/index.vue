<template>

    <Head>
        <Title>{{ runtimeConfig?.public?.appName }} | Athletes</Title>
    </Head>

    <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <TableAthlete :head=state.head :body="state.body" />
    </div>
</template>

<script setup lang="ts">

const runtimeConfig = useRuntimeConfig()

definePageMeta({
    layout: 'main'
})

const state = reactive({
    head: [
        { name: 'Full name' },
        { name: 'Gender' },
        { name: 'Date of birth' },
        { name: 'Age' },
        { name: 'Contact no.' },
    ],
    body: {
        data: [
            { id: 1, full_name: 'Kim Tan', gender: 'Female', birthdate: 'August 18, 1994', age: 31, phone_number: '09987654321' },
            { id: 1, full_name: 'Kim Tan', gender: 'Female', birthdate: 'August 18, 1994', age: 31, phone_number: '09987654321' },
            { id: 1, full_name: 'Kim Tan', gender: 'Female', birthdate: 'August 18, 1994', age: 31, phone_number: '09987654321' },
            { id: 1, full_name: 'Kim Tan', gender: 'Female', birthdate: 'August 18, 1994', age: 31, phone_number: '09987654321' },
            { id: 1, full_name: 'Kim Tan', gender: 'Female', birthdate: 'August 18, 1994', age: 31, phone_number: '09987654321' },
        ]
    }
})

</script>