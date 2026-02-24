<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { useRouter } from 'vue-router'
import { FileQuestion } from 'lucide-vue-next'

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
        <FileQuestion class="h-24 w-24 text-muted-foreground" />
      </div>
      <div class="space-y-2">
        <h1 class="text-4xl font-bold tracking-tight">404 - Not Found</h1>
        <p class="text-muted-foreground text-lg">
          The page you're looking for doesn't exist or has been moved.
        </p>
      </div>
      <div class="flex gap-4 justify-center">
        <Button variant="outline" @click="goBack">Go Back</Button>
        <Button @click="goHome">Go Home</Button>
      </div>
    </div>
  </div>
</template>
