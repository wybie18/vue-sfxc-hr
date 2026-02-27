<template>
  <header
    class="fixed top-0 z-50 w-full h-16 md:h-20 bg-white/95 backdrop-blur-md border-b border-gray-200 flex items-center pl-2 pr-4 md:pr-5 transition-all shadow-sm"
  >
    <div class="absolute top-0 left-0 w-full h-1" style="background-color: #21883f"></div>

    <div class="flex items-center">
      <SidebarTrigger class="md:hidden hover:bg-[#fac80f]" />
      <div class="bg-white p-1 rounded-lg transition-transform active:scale-95">
        <img
          src="@/assets/images/logo/sfxc-logo-with-text.png"
          alt="SFXC Logo"
          class="hidden md:block h-12 w-auto object-contain mr-4"
          style="filter: drop-shadow(0px 0px 2px rgba(0, 0, 0, 0.1))"
        />

        <img
          src="@/assets/images/logo/sfxc-logo-only.png"
          alt="SFXC Logo"
          class="block md:hidden h-10 w-auto object-contain"
          style="filter: drop-shadow(0px 0px 2px rgba(0, 0, 0, 0.1))"
        />
      </div>

      <div class="h-8 w-[0px] bg-gray-300 hidden md:block mr-4">
        <Separator orientation="vertical" />
      </div>

      <div class="hidden md:flex flex-col">
        <span
          class="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-semibold leading-none"
        >
          Official
        </span>
        <span class="text-gray-800 font-bold text-lg leading-tight">Staff Portal</span>
      </div>
    </div>


  </header>
</template>

<script setup lang="ts">
import { Separator } from '@/components/ui/separator'
import { SidebarTrigger } from '@/components/ui/sidebar'
</script>
