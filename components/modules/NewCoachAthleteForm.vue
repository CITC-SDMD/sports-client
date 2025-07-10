<template>
    <div>
        <form @submit.prevent="submit" autocomplete="off" class="max-w-2xl">
            <div class="mt-6 space-y-4 grid grid-cols-1">
                <div class="space-y-4">
                    <div class="flex items-center justify-center">
                        <input type="file" ref="profileImage" @change="onImageChange" class="hidden" />
                        <div class="relative cursor-pointer" @click="triggerImageInput">
                            <img :src="avatarUrl" alt="Avatar"
                                class="w-28 h-28 rounded-full object-cover border-2 border-tertiary-25" />
                            <div
                                class="rounded-full absolute inset-0 bg-black bg-opacity-50 text-white opacity-0 hover:opacity-100 transition-opacity">
                                <div class="flex items-center w-full h-full justify-center text-xs">
                                    Change image
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                            <div class="flex">
                                <FormLabel for="firstname" label="First name" />
                                <span class="text-red-500">*</span>
                            </div>
                            <div class="mt-2">
                                <FormTextField name="firstname" class="w-full" v-model=state.form.firstname />
                                <FormError :error="v$?.form.firstname?.$errors[0]?.$message.toString()" />
                                <FormError :error="state.error?.errors?.form.firstname?.[0]" />
                            </div>
                        </div>
                        <div>
                            <FormLabel for="middlename" label="Middle initial" />
                            <div class="mt-2">
                                <FormTextField name="middlename" class="w-full" v-model="state.form.middlename" />
                            </div>
                        </div>
                    </div>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                                <FormLabel for="birthdate" label="Birthday" />
                                <span class="text-red-500">*</span>
                            </div>
                            <div class="mt-2">
                                <FormDatePicker name="birthdate" class="w-full" v-model="state.form.birthdate" />
                                <FormError :error="v$?.form.birthdate?.$errors[0]?.$message.toString()" />
                                <FormError :error="state.error?.errors?.form.birthdate?.[0]" />
                            </div>
                        </div>
                    </div>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                        <div>
                            <div class="flex">
                                <FormLabel for="age" label="Age" />
                                <span class="text-red-500">*</span>
                            </div>
                            <div class="mt-2">
                                <FormTextField type="number" name="age" class="w-full" v-model="state.form.age" />
                                <FormError :error="v$?.form.age?.$errors[0]?.$message.toString()" />
                                <FormError :error="state.error?.errors?.form.age?.[0]" />
                            </div>
                        </div>
                    </div>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                                <FormLabel for="gender" label="Sex" />
                                <span class="text-red-500">*</span>
                            </div>
                            <div class="mt-2">
                                <FormSelect :options="state.option.gender" name="gender" class="w-full"
                                    v-model="state.form.gender" />
                                <FormError :error="v$?.form.gender?.$errors[0]?.$message.toString()" />
                                <FormError :error="state.error?.errors?.form.gender?.[0]" />
                            </div>
                        </div>
                    </div>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                            <div class="flex">
                                <FormLabel for="religion_id" label="Religion" />
                                <span class="text-red-500">*</span>
                            </div>
                            <div class="mt-2">
                                <FormSelect :options="state.option.religion" name="religion_id" class="w-full"
                                    v-model="state.form.religion_id" />
                                <FormError :error="v$?.form.religion_id?.$errors[0]?.$message.toString()" />
                                <FormError :error="state.error?.errors?.form.religion_id?.[0]" />
                            </div>
                        </div>
                    </div>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                            <div class="flex items-center justify-between">
                                <div class="flex">
                                    <FormLabel for="school_id" label="School" />
                                    <span class="text-red-500">*</span>
                                </div>
                                <div>
                                    <a @click="openNewSchool" class="text-sm underline text-blue-500 cursor-pointer">
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
                    </div>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                            <div class="flex">
                                <FormLabel for="sports_team" label="Sports team" />
                                <span class="text-red-500">*</span>
                            </div>
                            <div class="mt-2">
                                <FormTextField name="sports_team" class="w-full" v-model="state.form.sports_team" />
                                <FormError :error="v$?.form.sports_team?.$errors[0]?.$message.toString()" />
                                <FormError :error="state.error?.errors?.form.sports_team?.[0]" />
                            </div>
                        </div>
                        <div>
                            <div class="flex">
                                <FormLabel for="registry_date" label="Date of registration" />
                                <span class="text-red-500">*</span>
                            </div>
                            <div class="mt-2">
                                <FormDatePicker name="registry_date" class="w-full"
                                    v-model="state.form.registry_date" />
                                <FormError :error="v$?.form.registry_date?.$errors[0]?.$message.toString()" />
                                <FormError :error="state.error?.errors?.form.registry_date?.[0]" />
                            </div>
                        </div>
                    </div>
                </div>

                <div class="mt-4 col-span-2">
                    <FormButton type="submit" class="w-full">Submit</FormButton>
                </div>
            </div>
        </form>
        <ModalNewSchool v-model:open="state.isNewSchoolOpen" @saveSchool="saveNewSchool" />
    </div>
</template>

<script setup lang="ts">
import { useVuelidate } from "@vuelidate/core"
import { required, helpers } from '@vuelidate/validators'
import { religionService } from "@/api/religion/ReligionService"
import { schoolService } from "~/api/school/SchoolService"
import { useAlert } from "~/composables/alert"

const emit = defineEmits(['loadPage', 'errorMessage', 'submitForm'])

const avatarUrl = ref('/img/avatars/user.svg')
const profileImage = ref<HTMLInputElement | null>(null)

const { successAlert } = useAlert()

const state = reactive({
    form: {
        firstname: null as any,
        middlename: null as any,
        lastname: null as any,
        address: null as any,
        age: null as any,
        birthdate: null as any,
        birth_place: null as any,
        civil_status: null as any,
        gender: null as any,
        contact_no: null as any,
        religion_id: null as any,
        school_id: null as any,
        occupation: null as any,
        sports_team: null as any,
        photo: null as any,
        registry_date: null as any,
    },
    error: null as any,
    option: {
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
        gender: [
            {
                value: 'male',
                label: 'Male'
            },
            {
                value: 'female',
                label: 'Female'
            }
        ],
        religion: [],
        school: []
    },
    isNewSchoolOpen: false
})

onMounted(() => {
    fetchReligions()
    fetchSchools()
})

async function fetchReligions() {
    emit('loadPage', true)
    try {
        const response = await religionService.fetchReligionList()
        if (response.data) {
            let options: any = []
            response.data.forEach(
                (item: any) => options.push({
                    value: item.id,
                    label: item.name,
                })
            )
            state.option.religion = options
        }
    } catch (error) {
        emit('errorMessage', error)
    }
    emit('loadPage', false)
}

async function fetchSchools() {
    emit('loadPage', true)
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
        emit('errorMessage', error)
    }
    emit('loadPage', false)
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
        }
    } catch (error) {
        emit('errorMessage', state.error)
    }
}

watch(() => state.form.birthdate, (newValue) => {
    const currentYear = new Date().getFullYear()
    const birthDate = newValue
    const birthYear = new Date(birthDate).getFullYear()
    const age = currentYear - birthYear
    state.form.age = age
})

function onImageChange(event: any) {
    const file = event.target.files[0]
    state.form.photo = event.target.files[0]
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
            address: {
                required: helpers.withMessage('This field is required.', required),
            },
            age: {
                required: helpers.withMessage('This field is required.', required),
            },
            birthdate: {
                required: helpers.withMessage('This field is required.', required),
            },
            birth_place: {
                required: helpers.withMessage('This field is required.', required),
            },
            civil_status: {
                required: helpers.withMessage('This field is required.', required),
            },
            gender: {
                required: helpers.withMessage('This field is required.', required),
            },
            contact_no: {
                required: helpers.withMessage('This field is required.', required),
            },
            religion_id: {
                required: helpers.withMessage('This field is required.', required),
            },
            school_id: {
                required: helpers.withMessage('This field is required.', required),
            },
            occupation: {
                required: helpers.withMessage('This field is required.', required),
            },
            sports_team: {
                required: helpers.withMessage('This field is required.', required),
            },
            registry_date: {
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

function openNewSchool() {
    state.isNewSchoolOpen = true
}
</script>