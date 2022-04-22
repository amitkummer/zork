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
    <div class="description">
      <div class="description-title">
        Zork: The Great Underground Empire
      </div>
      <div class="description-subtitle">
        version: 0.0.1 | @amitkummer
      </div>
    </div>
    <div class="l-game-cards">
      <GameCard />
    </div>
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

.description {
  width: 900px;
  margin-right: auto;
  margin-left: auto;
  margin-top: var(--space-10);
  margin-bottom: var(--space-20);

  &-title {
    text-align: center;
    font-size: var(--type-size-6);
  }

  &-subtitle {
    text-align: right;
    font-size: var(--type-size-2);
    margin-right: var(--space-4);
    color: var(--color-secondary-f1)
  }
}


.l-game-cards {
  display: flex;
  justify-content: center;
}
</style>
