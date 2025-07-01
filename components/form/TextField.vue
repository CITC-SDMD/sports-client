<template>
    <input :name="props.name"
        class="block rounded-md bg-white px-3 py-2.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-blue-500 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-blue sm:text-base"
        :value="props.modelValue" @input="updateValue($event)" />
</template>

<script setup lang="ts">
const props = defineProps({
    name: {
        type: String,
        required: true
    },
    modelValue: String,
})

const emit = defineEmits(['update:modelValue'])

function updateValue(event: any) {
    emit('update:modelValue', event.target.value)
}
</script>