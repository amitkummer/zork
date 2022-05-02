<script setup>
import { ref, reactive } from 'vue'
import { storeToRefs  } from 'pinia'
import { useStore } from '@/stores/audio' 

const store = useStore()
const settings =  reactive(store.settings)

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
  margin-top: var(--space-6);
  grid-area: audio;
  height: 220px;
  width: 430px;
  justify-self: end;

  &-items {
    margin-right: var(--space-3);

    &-single {
      margin-top: var(--space-3);
    }
  }
}
</style>
