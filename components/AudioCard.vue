<script setup>
import { ref } from 'vue'
import { storeToRefs  } from 'pinia'
import { useStore } from '@/stores/audio' 

const store = useStore()
const { settings } = storeToRefs(store)

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
      <VolumeSlider class="audio-items-single" v-for="setting in settings" v-model="setting.value" :legened="setting.name"/>  
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
    margin-right: var(--space-2);

    &-single {
      margin-top: var(--space-1);
    }
  }
}
</style>
