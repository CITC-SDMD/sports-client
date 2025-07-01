<template>
    <flat-pickr v-model="state.date" :config="state.datePickerConfig" :name="props.name" @on-change="updateValue"
        class="block rounded-md bg-white px-3 py-2.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-blue-500 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-blue sm:text-base" />
</template>

<script setup lang="ts">
import moment from 'moment'
import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';

const props = defineProps({
    name: {
        type: String,
        required: true,
    },
    modelValue: String,
})

const state = reactive({
    date: props.modelValue ? new Date(props.modelValue) : '',
    datePickerConfig: {
        enableTime: false,
        dateFormat: 'F d, Y',
        disableMobile: true,
        locale: {
            firstDayOfWeek: 7,
        }
    }
})

watch(() => props.modelValue, (newValue: any) => {
    if (newValue != null && newValue !== '') {
        state.date = new Date(newValue)
    }
})

const emit = defineEmits(['update:modelValue'])

function updateValue(selectedDates: any) {
    const date = selectedDates?.[0]
    if (date) {
        const formattedDate = moment(date).format('YYYY-MM-DD')
        emit('update:modelValue', formattedDate)
    } else {
        emit('update:modelValue', '')
    }
}
</script>