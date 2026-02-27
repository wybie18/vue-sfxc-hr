<template>
  <div class="fixed inset-0 flex flex-col bg-gray-50">
    <SidebarProvider class="flex-1 overflow-hidden">
      <Header />
      <div class="flex h-full w-full">
        <AppSidebar class="pt-20" />

        <main class="flex-1 overflow-y-auto bg-background pt-15 pl-3 md:pt-15 pl-3">
          <div class="md:p-8 min-h-full">
            <slot />
          </div>
        </main>
      </div>
    </SidebarProvider>
  </div>
</template>

<script setup lang="ts">
import AppSidebar from '@/components/ui/custom/AppSidebar.vue'
import { SidebarProvider } from '@/components/ui/sidebar'
import Header from '@/components/ui/custom/Header.vue'
</script>
