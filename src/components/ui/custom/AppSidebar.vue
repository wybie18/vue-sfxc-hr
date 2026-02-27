<template>
  <Sidebar side="left" collapsible="icon" class="h-screen border-r" style="--sidebar-width: 265px">
    <SidebarContent class="flex-1 overflow-y-auto">
      <SidebarGroup>
        <div
          :class="[
            'flex items-center w-full',
            state === 'expanded' ? 'justify-between' : 'justify-end',
          ]"
        >
          <SidebarGroupLabel v-if="state === 'expanded'"> SERVICES </SidebarGroupLabel>

          <SidebarTrigger class="cursor-pointer ml-auto md:p-4 hover:bg-[#fac80f] md:mb-1" />
        </div>

        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem v-for="item in StaffMenu" :key="item.title">
              <SidebarMenuButton
                :isActive="route.path === item.url"
                as-child
                class="data-[active=true]:bg-[#1f8942] data-[active=true]:text-white hover:bg-[#fac80f] hover:text-black transition-colors"
              >
                <router-link :to="item.url" class="flex items-center gap-2 w-full">
                  <component v-if="item.icon" :is="item.icon" class="size-4" />
                  <span>{{ item.title }}</span>
                </router-link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>

    <SidebarFooter class="shrink-0 border-t bg-sidebar">
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger as-child>
              <SidebarMenuButton
                size="lg"
                class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground cursor-pointer hover:bg-[#fac80f]"
              >
                <Avatar class="h-8 w-8 rounded-lg">
                  <AvatarImage :src="personImg" alt="User Profile" class="object-cover" />
                  <AvatarFallback class="rounded-lg">JD</AvatarFallback>
                </Avatar>

                <div class="grid flex-1 text-left text-sm leading-tight">
                  <span class="truncate font-semibold">Juan Dela Cruz</span>
                  <span class="truncate text-xs">@juandelacruz</span>
                </div>
                <ChevronUp class="ml-auto size-4" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              side="top"
              align="end"
              class="w-[--reka-popper-anchor-width] min-w-56 rounded-lg"
            >
              <DropdownMenuItem as-child class="cursor-pointer md:focus:bg-[#fac80f]">
                <router-link to="/profile" class="flex w-full items-center">
                  <span>My Profile</span>
                </router-link>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                class="text-red-600 cursor-pointer md:focus:bg-[#fac80f]"
              >
                <span>Sign out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>

    <SidebarRail />
  </Sidebar>
</template>

<script setup lang="ts">
// Imports ----------------------------------
import { useRoute } from 'vue-router'

import personImg from '@/assets/images/avatar/avatar_image.jpg'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Home,
  SquareChartGantt,
  UserRoundCog,
  BookImage,
  BookOpenText,
  Settings,
  ChevronUp,
} from 'lucide-vue-next'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'

import {
  Sidebar,
  SidebarFooter,
  SidebarRail,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar'

// Functions and State ----------------------------------

const { state } = useSidebar()
const route = useRoute()

// Menu items mapped to router paths
const StaffMenu = [
    { title: 'Dashboard', url: '/dashboard', icon: Home },
    { title: 'Content Management', url: '/content-management', icon: SquareChartGantt },
    { title: 'Users Management', url: '/user-management', icon: UserRoundCog },
    { title: 'Media Library', url: '/media-library', icon: BookImage },
    { title: 'Pages Manager', url: '/pages-manager', icon: BookOpenText },
    { title: 'Settings', url: '/settings', icon: Settings },
]
</script>
