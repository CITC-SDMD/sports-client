<template>
    <Switch :modelValue="props.modelValue" @update:modelValue="updateValue"
        :class="[props.modelValue ? 'bg-blue-600' : 'bg-gray-200', 'relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2']">
        <span class="sr-only">Use setting</span>
        <span aria-hidden="true"
            :class="[props.modelValue ? 'translate-x-5' : 'translate-x-0', 'pointer-events-none inline-block size-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out']" />
    </Switch>
</template>

<script setup lang="ts">
import { Switch } from '@headlessui/vue'

const props = defineProps({
    modelValue: {
        type: Boolean,
        required: false,
    },
})

const emit = defineEmits(['update:modelValue'])

function updateValue(newValue: boolean) {
    emit('update:modelValue', newValue)
}
</script>