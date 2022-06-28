<script setup>
import { ref, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useGameStore } from '@/stores/game';

onMounted(() => {
  gameStore.initGame();
});

const gameStore = useGameStore();
const { location, output } = storeToRefs(gameStore);

let userInput = ref('');

function submitInput() {
  gameStore.enterCommand(userInput.value);
  userInput.value = '';
}
</script>

<template>
  <div class="game">
    <div class="game-output">
      <p>
        {{ location }}
      </p>
      <p
        v-for="(paragraph, index) in output"
        :key="index"
        class="game-output-single"
      >
        {{ paragraph }}
      </p>
      <div class="game-output-anchor" />
    </div>
    <div>
      <span> $ </span>
      <input
        v-model="userInput"
        class="game-input"
        @keydown.enter="submitInput"
        autofocus
      />
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
  padding: 20px 30px 20px 40px;
  display: flex;
  flex-direction: column;

  &-output {
    padding-right: 20px;
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
