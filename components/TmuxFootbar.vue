<script setup></script>

<template>
  <div class="tmux-footbar">
    <span> zork </span>
    <span tmux-footbar-date> "DESKTOP-7NV43KK" 20:54 13-Apr-22 </span>
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
