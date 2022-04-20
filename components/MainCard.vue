<script setup>
import { ref } from 'vue';
</script>

<template>
  <fieldset class="l-main">
    <legend class="l-main-title">
      <a class="l-main-title-link" href=https://github.com/amitkummer>
        🐧 Star on GitHub
      </a>
    </legend>
  </fieldset>
</template>

<style lang="scss">
.l-main {
  margin-bottom: var(--space-2);
  border: 4px solid;
  border-color: var(--color-secondary-f1);
  background-color: var(--color-primary-b1);
  flex-grow: 1;

  &-title {
    margin-left: var(--space-20);
    padding: var(--space-4);
    
    &-link {
      text-decoration: none; 
      font-weight: var(--type-weight-3);
      color: var(--color-accent-f1);
      padding-bottom: var(--space-1);
      border-bottom: 1px solid;
    }

    &-link:hover {
      border-bottom: none; 
    }
  }
}
</style>
