<script setup>
import { ref, onMounted } from 'vue'
import { storeToRefs  } from 'pinia'
import { useStore } from '@/stores/game'

onMounted(() => {
  store.initGame()
})

const store = useStore()
const { location, output } = storeToRefs(store)

let userInput = ref("")

function submitInput() {
  store.enterCommand(userInput.value)
  userInput.value = ''
}
</script>

<template>
<div class=game>
  <div class="game-output">
    <p>
      {{ location }}
    </p>
    <p class="game-output-single" v-for="paragraph in output">
      {{ paragraph }}
    </p>
    <div class="game-output-anchor" />
  </div>
  <div>
    <span> $ </span>
    <input class="game-input" v-model="userInput"
           @keydown.enter="submitInput">
  </div>
  </div>
</template>

<style lang="scss">
.game {
  grid-area: game;
  width: 800px;
  height: 600px; 
  border: 2px solid;
  border-color: var(--color-secondary-f1); 
  background-color: var(--color-primary-b2);
  padding: 20px 40px;
  display: flex;
  flex-direction: column;

  &-output {
    max-height: 90%;
    flex-grow: 1;
    overflow: auto;

    /* Pin scrolling to bottom. 
    https://css-tricks.com/books/greatest-css-tricks/pin-scrolling-to-bottom/
    */
    &-single {
      overflow-anchor: none;
    }
    &-anchor {
      overflow-anchor: auto;
      height: 1px;
    }
  }

  &-input {
    padding-left: var(--space-2);
    margin-top: var(--space-5);
    background-color: var(--color-primary-b2);
    font-family: inherit;
    color: inherit;
    border-style: none;
    font-size: 100%;
    height: 50px;
    width: 95%;

    &:focus {
      outline: var(--color-secondary-f1) solid 1px;
    }
  }
}
</style>
