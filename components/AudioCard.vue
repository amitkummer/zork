<script setup>
import { ref } from 'vue'

const title = 'Speech'
const speech = ref(4)
</script>

<template>
  <fieldset class="card audio">
    <legend class="card-title">
      <span class=card-title-text>
        Audio Settings
      </span>
    </legend>
    <div class="audio-items">
      <VolumeSlider v-model="speech" :legened="title"/>  
    </div>
  </fieldset>
</template>

<style lang="scss">
.audio {
  grid-area: audio;
  height: 220px;
  width: 430px;
  justify-self: end;
  align-self: end;

  &-items {
    margin-top: var(--space-5);
    display: flex;
    justify-content: center;
  }
}
</style>
