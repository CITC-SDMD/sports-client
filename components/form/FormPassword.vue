<template>
    <div class="flex">
        <div class="-mr-px grid grow grid-cols-1 focus-within:relative">
            <input :name="props.name" :type="state.type"
                class="block rounded-l-md bg-white px-3 py-2.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-blue-500 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-blue sm:text-base"
                :value="props.modelValue" @input="updateValue($event)" />
        </div>
        <button type="button" @click="showHidePassword"
            class="flex shrink-0 items-center gap-x-1.5 rounded-r-md bg-white px-3 py-2.5 text-sm font-semibold text-gray-900 outline outline-1 -outline-offset-1 outline-blue-500 hover:bg-gray-50 focus:relative focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600">
            <EyeIcon class="w-6 h-6 text-gray-400" v-if="!state.show" />
            <EyeSlashIcon class="w-6 h-6 text-gray-400" v-else />
        </button>
    </div>
</template>

<script setup>
import { EyeIcon, EyeSlashIcon } from '@heroicons/vue/20/solid';

const props = defineProps({
    name: {
        type: String,
        required: true
    },
    modelValue: String,
})

const state = reactive({
    show: false,
    type: 'password'
})

function showHidePassword() {
    if (!state.show) {
        state.show = true
        state.type = 'text'
    } else {
        state.show = false
        state.type = 'password'
    }
}

const emit = defineEmits(['update:modelValue'])

function updateValue(event) {
    emit('update:modelValue', event.target.value)
}

</script>