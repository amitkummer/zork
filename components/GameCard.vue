<script setup>
import { storeToRefs  } from 'pinia'
import { useStore } from '@/stores/game'

const store = useStore()
const { location } = storeToRefs(store)
</script>

<template>
<div class=game-card>
{{ location }}
</div>
</template>

<style lang="scss">
.game-card {
  width: 800px;
  height: 600px; 
  border: 2px solid;
  border-color: var(--color-secondary-f1); 
  background-color: var(--color-primary-b2);
}
</style>
