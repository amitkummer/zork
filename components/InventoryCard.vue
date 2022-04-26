<script setup>
import { storeToRefs  } from 'pinia'
import { useStore } from '@/stores/game'

const store = useStore()
const { inventory } = storeToRefs(store)
</script>

<template>
  <fieldset class="inventory">
    <legend class="inventory-title">
      <span class="inventory-title-text">
        Inventory
      </span>
    </legend>
    <ol class="inventory-items">
      <li v-for="item in inventory">
        <span class="inventory-items-single">
          <!-- 
          The wierd ternary here is for adding a
          dot after each inventory item.
          -->
          {{ item + (item === '' ? '' : '.') }}
        </span>
      </li>
    </ol>
  </fieldset>
</template>

<style lang="scss">
.inventory {
  grid-area: inventory;
  width: 240px;
  height: 250px;
  border: 2px solid var(--color-secondary-f1);
  background-color: var(--color-primary-b2);
  align-self: end;

  &-title {
    margin-right: auto;
    margin-left: auto;

    &-text {
      color: var(--color-secondary-f2);
      font-size: var(--type-size-2);
      font-weight: var(--type-weight-3);
      margin-left: 20px;
      margin-right: 20px;
    }
  }

  &-items {
    width: 190px;
    margin-left: auto;
    margin-right: auto;

    &-single {
      color: var(--color-secondary-f4);
      font-weight: var(--type-weight-3);
    }
  }
}
</style>
