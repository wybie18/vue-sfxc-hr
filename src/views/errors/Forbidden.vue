<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { useRouter } from 'vue-router'
import { ShieldX } from 'lucide-vue-next'

const router = useRouter()

function goBack() {
  router.back()
}

function goHome() {
  router.push('/')
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-background">
    <div class="text-center space-y-6 p-8">
      <div class="flex justify-center">
        <ShieldX class="h-24 w-24 text-destructive" />
      </div>
      <div class="space-y-2">
        <h1 class="text-4xl font-bold tracking-tight">403 - Forbidden</h1>
        <p class="text-muted-foreground text-lg">You don't have permission to access this page.</p>
      </div>
      <div class="flex gap-4 justify-center">
        <Button variant="outline" @click="goBack">Go Back</Button>
        <Button @click="goHome">Go Home</Button>
      </div>
    </div>
  </div>
</template>
