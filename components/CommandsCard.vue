<script setup>
import { storeToRefs  } from 'pinia'
import { useStore } from '@/stores/game'

const store = useStore()
const { previousCommands } = storeToRefs(store)
function log() {
  console.log("raz")
}
</script>

<template>
  <fieldset class="card commands">
    <legend class="card-title">
      <span class=card-title-text>
        History
      </span>
    </legend>
    <ul class="commands-items">
      <li class="commands-items-single" v-for="command in previousCommands">
        <button @click="store.enterCommand(command)" class="commands-items-single-text">
          {{ command }}
        </button>
      </li>
    </ul>
  </fieldset>
</template>

<style lang="scss">
.commands {
  grid-area: previous-commands;

  &-items {
    height: 85%;
    overflow: auto;
    
    &-single {
      &::marker {
        content: ">>";
      }

      &-text {
        margin-left: var(--space-3);
        color: var(--color-secondary-f3);
        outline-style: none;
        background: none;
        border: none;
        font-family: inherit;
        font-size: 100%;

        &:hover {
          border-bottom: 1px solid; 
        }
      }
    }
  }
}
</style>
