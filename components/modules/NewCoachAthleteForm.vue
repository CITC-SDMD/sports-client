<template>
    <div class="divide-y divide-gray-900/10">
        <form @submit.prevent="submit">
            <div class="grid grid-cols-1 gap-x-8 gap-y-8 py-10 md:grid-cols-3">
                <div class="px-4 sm:px-0" v-if="props.model == 'coach'">
                    <h2 class="text-base/7 font-semibold text-gray-900">Coach Information</h2>
                    <p class="mt-1 text-sm/6 text-gray-600">
                        Essential details of the coach
                    </p>
                </div>
                <div class="px-4 sm:px-0" v-else>
                    <h2 class="text-base/7 font-semibold text-gray-900">Athlete Information</h2>
                    <p class="mt-1 text-sm/6 text-gray-600">
                        Essential details of the athlete.
                    </p>
                </div>

                <div class="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
                    <div class="px-4 py-6 sm:p-8">
                        <div class="flex items-center justify-center">
                            <input type="file" ref="profileImage" @change="onImageChange" class="hidden" />
                            <div class="relative cursor-pointer" @click="triggerImageInput">
                                <img :src="avatarUrl" alt="Avatar"
                                    class="size-40 rounded-full object-cover border-2 border-tertiary-25" />
                                <div
                                    class="rounded-full absolute inset-0 bg-black bg-opacity-50 text-white opacity-0 hover:opacity-100 transition-opacity">
                                    <div class="flex items-center w-full h-full justify-center text-xs">
                                        Change image
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-8 mt-4">
                            <div>
                                <div class="flex">
                                    <FormLabel for="firstname" label="First name" />
                                    <span class="text-red-500">*</span>
                                </div>
                                <div class="mt-2">
                                    <FormTextField name="firstname" class="w-full" v-model="state.form.firstname" />
                                    <FormError :error="v$?.form.firstname?.$errors[0]?.$message.toString()" />
                                    <FormError :error="state.error?.errors?.form.firstname?.[0]" />
                                </div>
                            </div>
                            <div>
                                <div class="flex">
                                    <FormLabel for="middlename" label="Middle name" />
                                </div>
                                <div class="mt-2">
                                    <FormTextField name="middlename" class="w-full" v-model="state.form.middlename" />
                                </div>
                            </div>
                            <div>
                                <div class="flex">
                                    <FormLabel for="lastname" label="Last name" />
                                    <span class="text-red-500">*</span>
                                </div>
                                <div class="mt-2">
                                    <FormTextField name="lastname" class="w-full" v-model="state.form.lastname" />
                                    <FormError :error="v$?.form.lastname?.$errors[0]?.$message.toString()" />
                                    <FormError :error="state.error?.errors?.form.lastname?.[0]" />
                                </div>
                            </div>
                            <div>
                                <div class="flex">
                                    <FormLabel for="email" label="Email address" />
                                    <span class="text-red-500">*</span>
                                </div>
                                <div class="mt-2">
                                    <FormTextField type="email" name="email" class="w-full"
                                        v-model="state.form.email" />
                                    <FormError :error="v$?.form.email?.$errors[0]?.$message.toString()" />
                                    <FormError :error="state.error?.errors?.form.email?.[0]" />
                                </div>
                            </div>
                            <div>
                                <div class="flex">
                                    <FormLabel for="nationality" label="Nationality" />
                                    <span class="text-red-500">*</span>
                                </div>
                                <div class="mt-2">
                                    <FormTextField name="nationality" class="w-full" v-model="state.form.nationality" />
                                    <FormError :error="v$?.form.nationality?.$errors[0]?.$message.toString()" />
                                    <FormError :error="state.error?.errors?.form.nationality?.[0]" />
                                </div>
                            </div>
                            <div>
                                <div class="flex">
                                    <FormLabel for="birth_date" label="Date of birth" />
                                    <span class="text-red-500">*</span>
                                </div>
                                <div class="mt-2">
                                    <FormDatePicker name="birth_date" class="w-full" v-model="state.form.birth_date" />
                                    <FormError :error="v$?.form.birth_date?.$errors[0]?.$message.toString()" />
                                    <FormError :error="state.error?.errors?.form.birth_date?.[0]" />
                                </div>
                            </div>
                            <div>
                                <div class="flex">
                                    <FormLabel for="age" label="Age" />
                                </div>
                                <div class="mt-2">
                                    <FormTextField name="age" class="w-full" v-model="state.form.age" readonly />
                                </div>
                            </div>
                            <div>
                                <div class="flex">
                                    <FormLabel for="sex" label="Sex" />
                                    <span class="text-red-500">*</span>
                                </div>
                                <div class="mt-2">
                                    <FormSelect :options="state.option.sex" name="sex" class="w-full"
                                        v-model="state.form.sex" />
                                    <FormError :error="v$?.form.sex?.$errors[0]?.$message.toString()" />
                                    <FormError :error="state.error?.errors?.form.sex?.[0]" />
                                </div>
                            </div>
                            <div>
                                <div class="flex">
                                    <FormLabel for="civil_status" label="Civil status" />
                                    <span class="text-red-500">*</span>
                                </div>
                                <div class="mt-2">
                                    <FormSelect :options="state.option.civil_status" name="civil_status" class="w-full"
                                        v-model="state.form.civil_status" />
                                    <FormError :error="v$?.form.civil_status?.$errors[0]?.$message.toString()" />
                                    <FormError :error="state.error?.errors?.form.civil_status?.[0]" />
                                </div>
                            </div>
                            <div>
                                <div class="flex">
                                    <FormLabel for="birth_place" label="Birth place" />
                                    <span class="text-red-500">*</span>
                                </div>
                                <div class="mt-2">
                                    <FormTextField name="birth_place" class="w-full" v-model="state.form.birth_place" />
                                    <FormError :error="v$?.form.birth_place?.$errors[0]?.$message.toString()" />
                                    <FormError :error="state.error?.errors?.form.birth_place?.[0]" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="grid grid-cols-1 gap-x-8 gap-y-8 py-10 md:grid-cols-3">
                <div class="px-4 sm:px-0">
                    <h2 class="text-base/7 font-semibold text-gray-900">Others</h2>
                    <p class="mt-1 text-sm/6 text-gray-600">Other information of the athlete</p>
                </div>

                <div class="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
                    <div class="px-4 py-6 sm:p-8">
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-8 mt-4">
                            <div>
                                <div class="flex">
                                    <FormLabel for="contact_no" label="Contact number" />
                                    <span class="text-red-500">*</span>
                                </div>
                                <div class="mt-2">
                                    <FormTextField name="contact_no" class="w-full" v-model="state.form.contact_no" />
                                    <FormError :error="v$?.form.contact_no?.$errors[0]?.$message.toString()" />
                                    <FormError :error="state.error?.errors?.form.contact_no?.[0]" />
                                </div>
                            </div>
                            <div>
                                <div class="flex items-center justify-between">
                                    <div class="flex">
                                        <FormLabel for="school_id" label="School" />
                                        <span class="text-red-500">*</span>
                                    </div>
                                    <div>
                                        <a @click="openNewSchool"
                                            class="text-sm underline text-blue-500 cursor-pointer">
                                            Add new school
                                        </a>
                                    </div>
                                </div>
                                <div class="mt-2">
                                    <FormSelect :options="state.option.school" name="school_id" class="w-full"
                                        v-model="state.form.school_id" />
                                    <FormError :error="v$?.form.school_id?.$errors[0]?.$message.toString()" />
                                    <FormError :error="state.error?.errors?.form.school_id?.[0]" />
                                </div>
                            </div>
                            <div>
                                <div class="flex">
                                    <FormLabel for="occupation" label="Occupation" />
                                    <span class="text-red-500">*</span>
                                </div>
                                <div class="mt-2">
                                    <FormTextField name="occupation" class="w-full" v-model="state.form.occupation" />
                                    <FormError :error="v$?.form.occupation?.$errors[0]?.$message.toString()" />
                                    <FormError :error="state.error?.errors?.form.occupation?.[0]" />
                                </div>
                            </div>
                            <div>
                                <div class="flex">
                                    <FormLabel for="club_name" label="Club name" />
                                    <span class="text-red-500">*</span>
                                </div>
                                <div class="mt-2">
                                    <FormTextField name="club_name" class="w-full" v-model="state.form.club_name" />
                                    <FormError :error="v$?.form.club_name?.$errors[0]?.$message.toString()" />
                                    <FormError :error="state.error?.errors?.form.club_name?.[0]" />
                                </div>
                            </div>
                            <div class="col-span-2">
                                <div class="flex">
                                    <FormLabel for="address" label="Address" />
                                    <span class="text-red-500">*</span>
                                </div>
                                <div class="mt-2">
                                    <FormTextarea name="address" class="w-full" v-model="state.form.address" />
                                    <FormError :error="v$?.form.address?.$errors[0]?.$message.toString()" />
                                    <FormError :error="state.error?.errors?.form.address?.[0]" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex items-center justify-end gap-x-4">
                <FormButton type="button" @click="cancelEdit"
                    class="w-full bg-gray-300 !text-gray-900 hover:!bg-gray-200">
                    Cancel
                </FormButton>
                <FormButton type="submit" class="w-full">Submit</FormButton>
            </div>
        </form>
        <ModalNewSchool v-model:open="state.isNewSchoolOpen" @saveSchool="saveNewSchool" />
    </div>
</template>

<script setup lang="ts">
import { useVuelidate } from "@vuelidate/core"
import { required, helpers } from '@vuelidate/validators'
import { useAlert } from '@/composables/alert'
import { schoolService } from "@/api/school/SchoolService"

const emit = defineEmits(['cancelAction', 'submitForm', 'showError'])

const { successAlert } = useAlert()

const avatarUrl = ref('/img/avatars/user.svg')
const profileImage = ref<HTMLInputElement | null>(null)

const props = defineProps({
    model: {
        type: String,
        required: true
    }
})

const state = reactive({
    form: {
        school_id: null as any,
        firstname: null as any,
        middlename: null as any,
        lastname: null as any,
        email: null as any,
        nationality: null as any,
        address: null as any,
        birth_date: null as any,
        birth_place: null as any,
        civil_status: null as any,
        sex: null as any,
        contact_no: null as any,
        occupation: null as any,
        club_name: null as any,
        image: null as any,
        age: null as any
    },
    option: {
        sex: [
            {
                value: 'male',
                label: 'Male'
            },
            {
                value: 'female',
                label: 'Female'
            }
        ],
        civil_status: [
            {
                value: 'single',
                label: 'Single'
            },
            {
                value: 'married',
                label: 'Married'
            },
            {
                value: 'widowed',
                label: 'Widowed'
            },
            {
                value: 'divorced',
                label: 'Divorced'
            },
        ],
        school: []
    },
    error: null as any,
    isNewSchoolOpen: false
})

onMounted(() => {
    fetchSchools()
})

watch(() => state.form.birth_date, (newValue) => {
    const currentYear = new Date().getFullYear()
    const birthDate = newValue
    const birthYear = new Date(birthDate).getFullYear()
    const age = currentYear - birthYear
    state.form.age = age
})

function onImageChange(event: any) {
    const file = event.target.files[0]
    state.form.image = event.target.files[0]
    if (file) {
        const reader = new FileReader()
        reader.onload = (e: any) => {
            avatarUrl.value = e.target.result
        }
        reader.readAsDataURL(file)
    }
}

function triggerImageInput() {
    if (profileImage.value) {
        profileImage.value.click()
    }
}

const rules = computed(() => {
    return {
        form: {
            firstname: {
                required: helpers.withMessage('This field is required.', required),
            },
            lastname: {
                required: helpers.withMessage('This field is required.', required),
            },
            email: {
                required: helpers.withMessage('This field is required.', required),
            },
            nationality: {
                required: helpers.withMessage('This field is required.', required),
            },
            birth_date: {
                required: helpers.withMessage('This field is required.', required),
            },
            sex: {
                required: helpers.withMessage('This field is required.', required),
            },
            civil_status: {
                required: helpers.withMessage('This field is required.', required),
            },
            birth_place: {
                required: helpers.withMessage('This field is required.', required),
            },
            contact_no: {
                required: helpers.withMessage('This field is required.', required),
            },
            address: {
                required: helpers.withMessage('This field is required.', required),
            },
            school_id: {
                required: helpers.withMessage('This field is required.', required),
            },
            occupation: {
                required: helpers.withMessage('This field is required.', required),
            },
            club_name: {
                required: helpers.withMessage('This field is required.', required),
            },
        }
    }
})

const v$ = useVuelidate(rules, state)

function submit() {
    v$.value.$validate()
    if (!v$.value.$error) {
        emit('submitForm', state.form)
    }
}

async function fetchSchools() {
    try {
        const response = await schoolService.fetchSchoolList()
        if (response.data) {
            let options: any = []
            response.data.forEach(
                (item: any) => options.push({
                    value: item.id,
                    label: item.school_name,
                })
            )
            state.option.school = options
        }
    } catch (error) {
        state.error = error
    }
}

async function saveNewSchool(data: any) {
    try {
        let params = {
            school_name: data
        }
        const response = await schoolService.createSchool(params)
        if (response.data) {
            successAlert('Success!', 'School created.')
            fetchSchools()
            state.form.school_id = response.data.id
        }
    } catch (error) {
        emit('showError', state.error)
    }
}

function openNewSchool() {
    state.isNewSchoolOpen = true
}

function cancelEdit() {
    emit('cancelAction')
}
</script>