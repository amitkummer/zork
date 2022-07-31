<script setup>
import { ref, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useGameStore } from '@/stores/game';
import { useAudioStore } from '@/stores/audio';

onMounted(() => {
  output.value.push('Would you like to enable game sound? [Y/n]');
  useAudioStore().initSounds();
});

const gameStore = useGameStore();
const { location, output } = storeToRefs(gameStore);

const audioStore = useAudioStore();
let userInput = ref('');
let isFirstInput = true;
function submitInput() {
  if (isFirstInput) {
    // First user input indicates if sound should be turned on.
    isFirstInput = false;
    if (userInput.value !== 'n') {
      // Player chose to enable audio.
      audioStore.isAudioDisabled = false;
      audioStore.playMusic();
    } else {
      // Player chose to disable audio.
      output.value.push('AUDIO DISABLED');
      audioStore.speechVolume = 0;
      audioStore.sfxVolume = 0;
      audioStore.musicVolume = 0;
      audioStore.ambientSfxVolume = 0;
    }
    gameStore.initGame();
  } else {
    gameStore.enterCommand(userInput.value);
  }

  userInput.value = '';
}
</script>

<template>
  <div class="game">
    <div class="game-output">
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
        autofocus
        @keydown.enter="submitInput"
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
