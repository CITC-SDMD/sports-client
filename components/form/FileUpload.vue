<template>
    <div class="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
        <div class="text-center">
            <PhotoIcon class="mx-auto size-12 text-gray-300" aria-hidden="true" />
            <div class="mt-4 flex justify-center text-sm/6 text-gray-600">
                <label :for="inputId"
                    class="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 focus-within:outline-hidden hover:text-indigo-500">
                    <span>Upload a file</span>
                    <input :id="inputId" :name="props.name" type="file" class="sr-only" @change="handleFileChange" />
                </label>
            </div>

            <!-- Show selected file name -->
            <p v-if="state.fileName" class="mt-2 text-sm text-gray-700 font-medium">
                Selected file: {{ state.fileName }}
            </p>

            <p v-else class="text-xs/5 text-gray-600">PNG, JPG, PDF up to 10MB</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue'

const emit = defineEmits(['fileSelected'])

const props = defineProps({
    name: {
        type: String,
        required: true
    }
})

const inputId = computed(() => `file-upload-${props.name}-${Math.random().toString(36).slice(2, 8)}`)

const state = reactive({
    fileName: null as string | null
})

function handleFileChange(event: Event) {
    const target = event.target as HTMLInputElement
    if (target.files?.[0]) {
        const file = target.files[0]
        state.fileName = file.name
        emit('fileSelected', file)
    }
}
</script>
