<template>
  <div class="bg-gray-100 dark:bg-black h-screen">
    <TransitionRoot as="template" :show="state.open">
      <Dialog class="relative z-50 lg:hidden" @close="state.open = false">
        <TransitionChild as="template" enter="transition-opacity ease-linear duration-300" enter-from="opacity-0"
          enter-to="opacity-100" leave="transition-opacity ease-linear duration-300" leave-from="opacity-100"
          leave-to="opacity-0">
          <div class="fixed inset-0 bg-gray-900/50" />
        </TransitionChild>

        <div class="fixed inset-0 flex">
          <TransitionChild as="template" enter="transition ease-in-out duration-300 transform"
            enter-from="-translate-x-full" enter-to="translate-x-0"
            leave="transition ease-in-out duration-300 transform" leave-from="translate-x-0"
            leave-to="-translate-x-full">
            <DialogPanel class="relative mr-16 flex w-full max-w-xs flex-1">
              <TransitionChild as="template" enter="ease-in-out duration-300" enter-from="opacity-0"
                enter-to="opacity-100" leave="ease-in-out duration-300" leave-from="opacity-100" leave-to="opacity-0">
                <div class="absolute left-full top-0 flex w-16 justify-center pt-5">
                  <button type="button" class="-m-2.5 p-2.5" @click="state.open = false">
                    <span class="sr-only">Close sidebar</span>
                    <XMarkIcon class="size-6 text-white" aria-hidden="true" />
                  </button>
                </div>
              </TransitionChild>
              <div
                class="flex grow flex-col gap-y-5 overflow-y-auto bg-blue-500 dark:bg-gray-900 px-6 pb-4 ring-1 ring-white/10">
                <div class="flex h-16 shrink-0 items-center justify-center">
                  <span class="font-bold dark:text-gray-200 text-white text-center text-lg">
                    Sports Athlete Management System
                  </span>
                </div>
                <nav class="flex flex-1 flex-col">
                  <ul role="list" class="flex flex-1 flex-col gap-y-7">
                    <li>
                      <ul role="list" class="-mx-2 space-y-1">
                        <li v-for="item in navigation" :key="item.name">
                          <NuxtLink :to="item.href"
                            :class="[item.activeRouteNames.includes($route.name) ? 'bg-blue-800 dark:bg-gray-800 text-white dark:text-gray-200' : 'dark:text-gray-200 text-white hover:bg-blue-800 dark:hover:bg-gray-800 hover:text-white', 'group flex gap-x-3 rounded-md p-2 text-lg font-semibold']">
                            <component :is="item.icon" class="size-6 shrink-0" aria-hidden="true" />
                            {{ item.name }}
                          </NuxtLink>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </nav>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </TransitionRoot>

    <div class="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-co">
      <div
        class="flex grow flex-col gap-y-5 overflow-y-auto bg-blue-500 dark:bg-gray-900 px-6 pb-4 border-r dark:border-slate-700">
        <div class="flex h-16 shrink-0 items-center justify-center">
          <span class="font-bold text-white dark:text-gray-200 text-center text-lg">
            Sports Athlete Management System
          </span>
        </div>
        <nav class="flex flex-1 flex-col">
          <ul role="list" class="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="list" class="-mx-2 space-y-1">
                <li v-for="item in navigation" :key="item.name">
                  <NuxtLink :to="item.href"
                    :class="[item.activeRouteNames.includes($route.name) ? 'bg-blue-800 dark:bg-gray-800 text-white dark:text-gray-200' : 'dark:text-gray-200 text-white hover:bg-blue-800 dark:hover:bg-gray-800 hover:text-white', 'group flex gap-x-3 rounded-md p-2 text-lg font-semibold']">
                    <component :is="item.icon" class="size-6 shrink-0" aria-hidden="true" />
                    {{ item.name }}
                  </NuxtLink>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </div>
    </div>

    <div class="lg:pl-72">
      <div
        class="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-900 px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
        <button type="button" class="-m-2.5 p-2.5 text-black lg:hidden" @click="state.open = true">
          <span class="sr-only">Open sidebar</span>
          <Bars3Icon class="h-6 w-6 dark:text-white" aria-hidden="true" />
        </button>

        <div class="flex flex-1 gap-x-4 justify-end self-stretch lg:gap-x-6">
          <div class="flex items-center gap-x-4 lg:gap-x-6">

            <button type="button" @click="toggleTheme" class="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500">
              <MoonIcon class="size-6" aria-hidden="true" v-if="state.color == 'light'" />
              <SunIcon class="size-6 text-yellow-600" aria-hidden="true" v-if="state.color == 'dark'" />
            </button>

            <Menu as="div" class="relative">
              <MenuButton class="-m-1.5 flex items-center p-1.5 cursor-pointer">
                <span class="sr-only">Open user menu</span>
                <span
                  class="inline-flex h-10 w-10 items-center justify-center rounded-full bg-blue-500 dark:bg-slate-800">
                  <span class="text-base font-bold leading-none text-white">
                    {{ state.user?.firstname.charAt(0) }}{{ state.user?.lastname.charAt(0) }}
                  </span>
                </span>
                <span class="flex items-center">
                  <span class="ml-4 text-base font-semibold leading-6 text-black dark:text-white" aria-hidden="true">
                    {{ state.user?.firstname }} {{ state.user?.lastname }}
                  </span>
                  <ChevronDownIcon class="ml-2 h-5 w-5 text-black dark:text-white" aria-hidden="true" />
                </span>
              </MenuButton>
              <transition enter-active-class="transition ease-out duration-100"
                enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100"
                leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100"
                leave-to-class="transform opacity-0 scale-95">
                <MenuItems
                  class="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white dark:bg-slate-900 py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                  <MenuItem>
                  <a @click="logout"
                    class='block px-3 py-1 text-base leading-6 text-black dark:text-white hover:bg-gray-50 dark:hover:bg-slate-600 cursor-pointer'>
                    Sign out
                  </a>
                  </MenuItem>
                </MenuItems>
              </transition>
            </Menu>
          </div>
        </div>
      </div>

      <main class="py-10">
        <div class="px-4 sm:px-6 lg:px-8">
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  Dialog,
  DialogPanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue'
import {
  Bars3Icon,
  RectangleGroupIcon,
  XMarkIcon,
  MoonIcon,
  SunIcon,
} from '@heroicons/vue/24/outline'
import { ChevronDownIcon, UserGroupIcon, UsersIcon } from '@heroicons/vue/20/solid'
import { useUserStore } from '@/store/user'
import { authService } from '@/api/auth/AuthService'

const userStore = useUserStore()

const colorMode = useColorMode()

const state = reactive({
  color: colorMode.preference,
  open: false,
  user: userStore.getUser,
  error: null as any
})

onMounted(() => {
  state.color = colorMode.preference
})

console.log(state.user)

watch(() => colorMode.preference, (newVal) => {
  state.color = newVal
})

function toggleTheme() {
  const newTheme = colorMode.preference === 'light' ? 'dark' : 'light'
  colorMode.preference = newTheme
}

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: RectangleGroupIcon, activeRouteNames: ['dashboard'] },
  {
    name: 'Athletes', href: '/athletes', icon: UserGroupIcon, activeRouteNames: [
      'athletes',
      'athletes-uuid',
    ]
  },
  { name: 'Users', href: '/users', icon: UsersIcon, activeRouteNames: ['users'] },
]

async function logout() {
  try {
    const response = await authService.logout()
    if (response.message == 'Success.') {
      localStorage.removeItem('_token');
      userStore.resetUser()
      navigateTo('/')
    }
  } catch (error) {
    state.error = error
  }
}
</script>