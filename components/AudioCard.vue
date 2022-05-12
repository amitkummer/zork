<script setup>
import { reactive } from 'vue';
import { useAudioStore } from '@/stores/audio';

const store = useAudioStore();
const settings = reactive(store.settings);
</script>

<template>
  <fieldset class="card audio">
    <legend class="card-title">
      <span class="card-title-text"> Audio Settings </span>
    </legend>
    <div class="audio-items">
      <VolumeSlider
        v-for="setting in settings"
        :key="setting.name"
        v-model="setting.value"
        class="audio-items-single"
        :legened="setting.name"
      />
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
