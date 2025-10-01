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

            <div v-if="state.previewUrl" class="mt-2 flex flex-col items-center justify-center">
                <img :src="state.previewUrl" alt="Preview" class="w-full h-80    object-cover rounded " />
            </div>


            <!-- Show selected file name -->
            <p v-if="state.fileName" class="mt-2 text-sm text-gray-700 font-medium">
                Selected file: {{ state.fileName }}
            </p>

            <p v-else-if="props.fileUrl" class="mt-2 text-xs text-gray-500 break-all">
                File uploaded:
                <a :href="props.fileUrl" target="_blank" class="underline text-blue-500">
                    {{ props.fileUrl.split('/').pop() }}
                </a>
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
    },
    fileUrl: {
        type: String,
        default: ''
    }
})

const inputId = computed(() => `file-upload-${props.name}-${Math.random().toString(36).slice(2, 8)}`)

const state = reactive({
    fileName: null as string | null,
    previewUrl: null as string | null
})

function handleFileChange(event: Event) {
    const target = event.target as HTMLInputElement
    if (target.files?.[0]) {
        const file = target.files[0]
        state.fileName = file.name
        emit('fileSelected', file)

        // FileReader for image preview
        if (file.type.startsWith('image/')) {
            const reader = new FileReader()
            reader.onload = (e) => {
                state.previewUrl = e.target?.result as string
            }
            reader.readAsDataURL(file)
        } else {
            state.previewUrl = null
        }
    }
}
</script>
