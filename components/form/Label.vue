<template>
    <label :for="props.for" class="block text-base font-medium text-gray-900 dark:text-gray-100">
        {{ props.label }}
    </label>
</template>

<script setup lang="ts">
const props = defineProps({
    for: {
        type: String,
        required: true
    },
    label: {
        type: String,
        required: true
    }
})
</script>