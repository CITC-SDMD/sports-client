<template>
    <div class="divide-y divide-gray-900/10">
        <form @submit.prevent="submit">
            <div class="grid grid-cols-1 gap-x-8 gap-y-8 py-10 md:grid-cols-3">
                <div class="px-4 sm:px-0" v-if="props.entity == 'coach'">
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
                                    <span class="text-red-500">*</span>
                                </div>
                                <div class="mt-2">
                                    <FormTextField name="age" class="w-full" v-model="state.form.age" />
                                    <FormError :error="v$?.form.age?.$errors[0]?.$message.toString()" />
                                    <FormError :error="state.error?.errors?.form.age?.[0]" />
                                </div>
                            </div>
                            <div>
                                <div class="flex">
                                    <FormLabel for="sex" label="Gender" />
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

            <hr>

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
                            <div class="col-span-2">
                                <div v-if="props.entity === 'athlete'">
                                    <div class=" flex">
                                        <FormLabel for="is_assistance" label="Player need Assistance?" />
                                    </div>
                                    <div class="mt-4 flex items-center gap-2 ">
                                        <FormToggle name="is_assistance" v-model="state.form.is_assistance" />
                                        ({{ state.form.is_assistance ? 'Yes' : 'No' }})
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <hr>

            <div class="grid grid-cols-1 gap-x-8 gap-y-8 py-10 md:grid-cols-3">
                <div class="px-4 sm:px-0">
                    <h2 class="text-base/7 font-semibold text-gray-900">Documents</h2>
                    <p class="mt-1 text-sm/6 text-gray-600">The required documents for registration</p>
                </div>

                <div class="md:col-span-2">
                    <div class="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl space-y-6 p-6">
                        <div>
                            <div class="flex">
                                <FormLabel for="identification" label="Proof of Identification" />
                                <span class="text-red-500">*</span>
                            </div>
                            <div class="mt-2">
                                <FormFileUpload name="identification" :fileUrl="state.form.identification"
                                    @fileSelected="(value) => state.form.identification = value" />

                                <FormError :error="v$?.form.identification?.$errors[0]?.$message.toString()" />
                                <FormError :error="state.error?.errors?.form.identification?.[0]" />
                            </div>
                        </div>
                        <div>
                            <div class="flex">
                                <FormLabel for="birth_certificate" label="Birth Certificate" />
                                <span class="text-red-500">*</span>
                            </div>
                            <div class="mt-2">
                                <FormFileUpload name="birth_certificate" :fileUrl="state.form.birth_certificate"
                                    @fileSelected="(value) => state.form.birth_certificate = value" />
                                <FormError :error="v$?.form.birth_certificate?.$errors[0]?.$message.toString()" />
                                <FormError :error="state.error?.errors?.form.birth_certificate?.[0]" />
                            </div>
                        </div>
                        <div>
                            <div class="flex">
                                <FormLabel for="pre_qualifying" label="Pre-Qualifying Results" />
                                <span class="text-red-500">*</span>
                            </div>
                            <div class="mt-2">
                                <FormFileUpload name="pre_qualifying" :fileUrl="state.form.pre_qualifying"
                                    @fileSelected="(value) => state.form.pre_qualifying = value" />
                                <FormError :error="v$?.form.pre_qualifying?.$errors[0]?.$message.toString()" />
                                <FormError :error="state.error?.errors?.form.pre_qualifying?.[0]" />
                            </div>
                        </div>
                        <div>
                            <div class="flex">
                                <FormLabel for="entry_form" label="Entry Form" />
                                <span class="text-red-500">*</span>
                            </div>
                            <div class="mt-2">
                                <FormFileUpload name="entry_form" :fileUrl="state.form.entry_form"
                                    @fileSelected="(value) => state.form.entry_form = value" />
                                <FormError :error="v$?.form.entry_form?.$errors[0]?.$message.toString()" />
                                <FormError :error="state.error?.errors?.form.entry_form?.[0]" />
                            </div>
                        </div>
                        <div>
                            <div class="flex">
                                <FormLabel for="passport" label="Passport" />
                                <span class="text-red-500">*</span>
                            </div>
                            <div class="mt-2">
                                <FormFileUpload name="passport" :fileUrl="state.form.passport"
                                    @fileSelected="(value) => state.form.passport = value" />
                                <FormError :error="v$?.form.passport?.$errors[0]?.$message.toString()" />
                                <FormError :error="state.error?.errors?.form.passport?.[0]" />
                            </div>
                        </div>

                        <div v-if="props.entity === 'athlete' && state.form.age < 18">
                            <div class=" flex">
                                <FormLabel for="parent_consent" label="Parent Consent" />
                                <span class="text-red-500">*</span>
                            </div>
                            <div class="mt-2">
                                <FormFileUpload name="parent_consent" :fileUrl="state.form.parent_consent"
                                    @fileSelected="(value) => state.form.parent_consent = value" />
                                <FormError :error="v$?.form.parent_consent?.$errors[0]?.$message.toString()" />
                                <FormError :error="state.error?.errors?.form.parent_consent?.[0]" />
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
import { required, helpers, requiredIf } from '@vuelidate/validators'
import { useAlert } from '@/composables/alert'
import { schoolService } from "@/api/school/SchoolService"

const emit = defineEmits(['cancelAction', 'submitAction', 'showError'])

const { successAlert } = useAlert()

const avatarUrl = ref('/img/avatars/user.svg')
const profileImage = ref<HTMLInputElement | null>(null)

const props = defineProps({
    model: {
        type: Object,
        required: true
    },
    entity: {
        type: String,
        required: true
    },
})

const state = reactive({
    form: {
        school_id: props.model.school_id,
        firstname: props.model.firstname,
        middlename: (props.model.middlename == 'null') ? '' : props.model.middlename,
        lastname: props.model.lastname,
        email: props.model.email,
        nationality: props.model.nationality,
        address: props.model.address,
        birth_date: props.model.birth_date,
        birth_place: props.model.birth_place,
        civil_status: props.model.civil_status,
        sex: props.model.sex,
        contact_no: props.model.contact_no,
        occupation: props.model.occupation,
        club_name: props.model.club_name,
        is_assistance: props.model.is_assistance,
        image: null as any,
        age: null as any,
        identification: null as any,
        birth_certificate: null as any,
        pre_qualifying: null as any,
        entry_form: null as any,
        passport: null as any,
        parent_consent: null as any,
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
    state.form.age = computedAge
    if (props.model.image) {
        avatarUrl.value = props.model.image
    }
    fetchSchools()

    if (Array.isArray(props.model.documents)) {
        props.model.documents.forEach((doc: any) => {
            switch (doc.type) {
                case 'Identification':
                    state.form.identification = doc.file_url
                    break
                case 'Birth Certificate':
                    state.form.birth_certificate = doc.file_url
                    break
                case 'Pre-Qualifying Results':
                    state.form.pre_qualifying = doc.file_url
                    break
                case 'Entry Form':
                    state.form.entry_form = doc.file_url
                    break
                case 'Passport':
                    state.form.passport = doc.file_url
                    break
                case 'Parent Consent':
                    state.form.parent_consent = doc.file_url
                    break
            }
        })
    }
})

const computedAge = computed(() => {
    const birthDate = state.form.birth_date
    if (!birthDate) return ''

    const today = new Date()
    const birth = new Date(birthDate)

    if (isNaN(birth.getTime())) return ''

    let age = today.getFullYear() - birth.getFullYear()
    const m = today.getMonth() - birth.getMonth()

    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
        age--
    }

    return age
})


function onImageChange(event: any) {
    const file = event.target.files[0]
    state.form.image = event.target.files[0]
    if (file) {
        const reader = new FileReader()
        reader.onload = (e: any) => {
            const result = e.target.result
            avatarUrl.value = result
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
            identification: {
                required: helpers.withMessage('This field is required.', required),
            },
            birth_certificate: {
                required: helpers.withMessage('This field is required.', required),
            },
            pre_qualifying: {
                required: helpers.withMessage('This field is required.', required),
            },
            entry_form: {
                required: helpers.withMessage('This field is required.', required),
            },
            passport: {
                required: helpers.withMessage('This field is required.', required),
            },
            parent_consent: {
                required: helpers.withMessage('This field is required.', requiredIf(() => state.form.age < 18)),
            },
        }
    }
})

const v$ = useVuelidate(rules, state)

function submit() {
    v$.value.$validate()
    if (!v$.value.$error) {
        emit('submitAction', state.form)
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