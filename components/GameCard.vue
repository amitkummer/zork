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
}
</script>

<template>
<div class=game>
  <div class="game-output">
    <p>
      {{ location }}
    </p>
    <p v-for="paragraph in output">
      {{ paragraph }}
    </p>
  </div>
  <input class="game-input" v-model="userInput" @keydown.enter="submitInput" />
</div>
</template>

<style lang="scss">
.game {
  width: 800px;
  height: 600px; 
  border: 2px solid;
  border-color: var(--color-secondary-f1); 
  background-color: var(--color-primary-b2);
  padding: 20px;
  display: flex;
  flex-direction: column;

  &-output {
    flex-grow: 1;
  }
  &-input {
    align-self: flex-end;
    width: 100%;
    height: 50px;
  }
}
</style>
