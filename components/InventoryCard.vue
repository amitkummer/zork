<script setup>
import { storeToRefs } from 'pinia';
import { useGameStore } from '@/stores/game';

const store = useGameStore();
const { inventory } = storeToRefs(store);
</script>

<template>
  <fieldset class="card inventory">
    <legend class="card-title">
      <span class="card-title-text"> Inventory </span>
    </legend>
    <ol class="inventory-items">
      <li v-for="(item, index) in inventory" :key="index">
        <span class="inventory-items-single">
          <!-- 
          The wierd ternary here is for adding a
          dot after each inventory item.
          -->
          {{ item + '.' }}
        </span>
      </li>
      <section v-if="inventory.length < 7">
        <li v-for="n in 7 - inventory.length" :key="n" />
      </section>
    </ol>
  </fieldset>
</template>

<style lang="scss">
.inventory {
  grid-area: inventory;
  align-self: end;
}

.inventory-items {
  width: 190px;
  margin-left: auto;
  margin-right: auto;

  &-single {
    color: var(--color-secondary-f4);
    font-weight: var(--type-weight-3);
  }
}
</style>
