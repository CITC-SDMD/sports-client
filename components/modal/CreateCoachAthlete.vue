<template>
    <div>
        <TransitionRoot as="template" :show="props.open">
            <Dialog class="relative z-50">
                <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0"
                    enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
                    <div class="fixed inset-0 bg-gray-500/75 transition-opacity" />
                </TransitionChild>
                <div class="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-4 text-center sm:p-0">
                    <TransitionChild as="template" enter="ease-out duration-300"
                        enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200"
                        leave-from="opacity-100 translate-y-0 sm:scale-100"
                        leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                        <DialogPanel
                            class="relative transform overflow-visible rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-4xl sm:p-6">
                            <ErrorAlert v-if="state.error" :message="state.error.message" />
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
                                                <FormTextField name="firstname" class="w-full"
                                                    v-model=state.form.firstname />
                                                <FormError
                                                    :error="x$?.form.firstname?.$errors[0]?.$message.toString()" />
                                                <FormError :error="state.error?.errors?.form.firstname?.[0]" />
                                            </div>
                                        </div>
                                        <div>
                                            <FormLabel for="middlename" label="Middle initial" />
                                            <div class="mt-2">
                                                <FormTextField name="middlename" class="w-full"
                                                    v-model="state.form.middlename" />
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
                                                <FormTextField name="lastname" class="w-full"
                                                    v-model="state.form.lastname" />
                                                <FormError
                                                    :error="x$?.form.lastname?.$errors[0]?.$message.toString()" />
                                                <FormError :error="state.error?.errors?.form.lastname?.[0]" />
                                            </div>
                                        </div>
                                        <div>
                                            <div class="flex">
                                                <FormLabel for="birthdate" label="Birthday" />
                                                <span class="text-red-500">*</span>
                                            </div>
                                            <div class="mt-2">
                                                <FormDatePicker name="birthdate" class="w-full"
                                                    v-model="state.form.birthdate" />
                                                <FormError
                                                    :error="x$?.form.birthdate?.$errors[0]?.$message.toString()" />
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
                                                <FormTextarea name="address" class="w-full"
                                                    v-model="state.form.address" />
                                                <FormError :error="x$?.form.address?.$errors[0]?.$message.toString()" />
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
                                                <FormTextField name="birth_place" class="w-full"
                                                    v-model="state.form.birth_place" />
                                                <FormError
                                                    :error="x$?.form.birth_place?.$errors[0]?.$message.toString()" />
                                                <FormError :error="state.error?.errors?.form.birth_place?.[0]" />
                                            </div>
                                        </div>
                                        <div>
                                            <div class="flex">
                                                <FormLabel for="age" label="Age" />
                                                <span class="text-red-500">*</span>
                                            </div>
                                            <div class="mt-2">
                                                <FormTextField type="number" name="age" class="w-full"
                                                    v-model="state.form.age" />
                                                <FormError :error="x$?.form.age?.$errors[0]?.$message.toString()" />
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
                                                <FormSelect :options="state.option.civil_status" name="civil_status"
                                                    class="w-full" v-model="state.form.civil_status" />
                                                <FormError
                                                    :error="x$?.form.civil_status?.$errors[0]?.$message.toString()" />
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
                                                <FormError :error="x$?.form.gender?.$errors[0]?.$message.toString()" />
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
                                                <FormTextField name="contact_no" class="w-full"
                                                    v-model="state.form.contact_no" />
                                                <FormError
                                                    :error="x$?.form.contact_no?.$errors[0]?.$message.toString()" />
                                                <FormError :error="state.error?.errors?.form.contact_no?.[0]" />
                                            </div>
                                        </div>
                                        <div>
                                            <div class="flex">
                                                <FormLabel for="religion_id" label="Religion" />
                                                <span class="text-red-500">*</span>
                                            </div>
                                            <div class="mt-2">
                                                <FormSelect :options="state.option.religion" name="religion_id"
                                                    class="w-full" v-model="state.form.religion_id" />
                                                <FormError
                                                    :error="x$?.form.religion_id?.$errors[0]?.$message.toString()" />
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
                                                    <a @click="openNewSchool"
                                                        class="text-sm underline text-blue-500 cursor-pointer">
                                                        Add new school
                                                    </a>
                                                </div>
                                            </div>
                                            <div class="mt-2">
                                                <FormSelect :options="state.option.school" name="school_id"
                                                    class="w-full" v-model="state.form.school_id" />
                                                <FormError
                                                    :error="x$?.form.school_id?.$errors[0]?.$message.toString()" />
                                                <FormError :error="state.error?.errors?.form.school_id?.[0]" />
                                            </div>
                                        </div>
                                        <div>
                                            <div class="flex">
                                                <FormLabel for="occupation" label="Occupation" />
                                                <span class="text-red-500">*</span>
                                            </div>
                                            <div class="mt-2">
                                                <FormTextField name="occupation" class="w-full"
                                                    v-model="state.form.occupation" />
                                                <FormError
                                                    :error="x$?.form.occupation?.$errors[0]?.$message.toString()" />
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
                                                <FormTextField name="sports_team" class="w-full"
                                                    v-model="state.form.sports_team" />
                                                <FormError
                                                    :error="x$?.form.sports_team?.$errors[0]?.$message.toString()" />
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
                                                <FormError
                                                    :error="x$?.form.registry_date?.$errors[0]?.$message.toString()" />
                                                <FormError :error="state.error?.errors?.form.registry_date?.[0]" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="flex space-x-2 mt-4 justify-between items-center">
                                <FormButton type="button"
                                    class="w-full bg-white border !border-gray-200 !text-black hover:!text-black hover:!bg-gray-100"
                                    @click="closeModal">
                                    Cancel
                                </FormButton>
                                <FormButton @click="submitForm" class="w-full">
                                    Save
                                </FormButton>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </Dialog>
        </TransitionRoot>
        <ModalNewSchool v-model:open="state.isNewSchoolOpen" @saveSchool="saveNewSchool" />
    </div>
</template>

<script setup lang="ts">
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { useVuelidate } from "@vuelidate/core"
import { required, helpers, requiredIf } from '@vuelidate/validators'
import { religionService } from "@/api/religion/ReligionService"
import { schoolService } from '~/api/school/SchoolService'

const avatarUrl = ref('/img/avatars/user.svg')
const profileImage = ref<HTMLInputElement | null>(null)

const { successAlert } = useAlert()

const props = defineProps({
    open: {
        type: Boolean,
        required: true
    },
})

const emit = defineEmits(['update:open', 'errorMessage', 'createNewCoachAthlete'])

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
    error: null as any,
    isNewSchoolOpen: false
})

onMounted(() => {
    fetchReligions()
    fetchSchools()
})

watch(() => state.form.birthdate, (newValue) => {
    const currentYear = new Date().getFullYear()
    const birthDate = newValue
    const birthYear = new Date(birthDate).getFullYear()
    const age = currentYear - birthYear
    state.form.age = age
})

async function fetchReligions() {
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
        state.error = error
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
        }
    } catch (error) {
        emit('errorMessage', state.error)
    }
}

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
                required: helpers.withMessage('This field is required.',
                    requiredIf(() => props.open == true)),
            },
            lastname: {
                required: helpers.withMessage('This field is required.',
                    requiredIf(() => props.open == true)),
            },
            address: {
                required: helpers.withMessage('This field is required.',
                    requiredIf(() => props.open == true)),
            },
            age: {
                required: helpers.withMessage('This field is required.',
                    requiredIf(() => props.open == true)),
            },
            birthdate: {
                required: helpers.withMessage('This field is required.',
                    requiredIf(() => props.open == true)),
            },
            birth_place: {
                required: helpers.withMessage('This field is required.',
                    requiredIf(() => props.open == true)),
            },
            civil_status: {
                required: helpers.withMessage('This field is required.',
                    requiredIf(() => props.open == true)),
            },
            gender: {
                required: helpers.withMessage('This field is required.',
                    requiredIf(() => props.open == true)),
            },
            contact_no: {
                required: helpers.withMessage('This field is required.',
                    requiredIf(() => props.open == true)),
            },
            religion_id: {
                required: helpers.withMessage('This field is required.',
                    requiredIf(() => props.open == true)),
            },
            school_id: {
                required: helpers.withMessage('This field is required.',
                    requiredIf(() => props.open == true)),
            },
            occupation: {
                required: helpers.withMessage('This field is required.',
                    requiredIf(() => props.open == true)),
            },
            sports_team: {
                required: helpers.withMessage('This field is required.',
                    requiredIf(() => props.open == true)),
            },
            registry_date: {
                required: helpers.withMessage('This field is required.',
                    requiredIf(() => props.open == true)),
            },
        }
    }
})

const x$ = useVuelidate(rules, state)

function submitForm() {
    x$.value.$validate()
    if (!x$.value.$error) {
        emit('createNewCoachAthlete', state.form)
        closeModal()
    }
}

function openNewSchool() {
    state.isNewSchoolOpen = true
}

function closeModal() {
    emit('update:open', false)
    formReset()
}

function formReset() {
    state.form.firstname = null
    state.form.middlename = null
    state.form.lastname = null
    state.form.address = null
    state.form.age = null
    state.form.birthdate = null
    state.form.birth_place = null
    state.form.civil_status = null
    state.form.gender = null
    state.form.contact_no = null
    state.form.religion_id = null
    state.form.school_id = null
    state.form.occupation = null
    state.form.sports_team = null
    state.form.photo = null
    state.form.registry_date = null
}

</script>
