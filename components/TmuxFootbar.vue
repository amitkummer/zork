<script setup>
import { useTimestamp } from '@vueuse/core';
import { ref, computed, onMounted } from 'vue';

// Don't show time when doing SSR, as the time will be different whe
// the user loads the page on their browser, which will cause an hydration warning.
const showTime = ref(false);
onMounted(() => (showTime.value = true));

const timestamp = useTimestamp({ offset: 0 });
const date = computed(() => {
  const now = new Date(timestamp.value);
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: 'long',
    timeStyle: 'medium',
    hour12: false
  }).format(now);
});
</script>

<template>
  <div class="tmux-footbar">
    <span> zork </span>
    <span v-if="showTime" tmux-footbar-date> {{ date }} </span>
  </div>
</template>

<style lang="scss">
.tmux-footbar {
  border: 1px solid;
  border-color: var(--color-secondary-f1);
  background-color: var(--color-secondary-b1);
  height: var(--space-7);
  margin-top: var(--space-2);
  margin-bottom: var(--space-1);
  padding-left: var(--space-3);
  padding-right: var(--space-3);
  display: flex;
  justify-content: space-between;
}
</style>
