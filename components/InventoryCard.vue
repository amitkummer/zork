<script setup>
import { storeToRefs  } from 'pinia'
import { useStore } from '@/stores/game'

const store = useStore()
const { inventory } = storeToRefs(store)
</script>

<template>
  <fieldset class="card inventory">
    <legend class="card-title">
      <span class="card-title-text">
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
