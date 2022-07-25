<script setup>
import { watch } from 'vue';
import { useAudioStore } from '@/stores/audio';
import { storeToRefs } from 'pinia';

const store = useAudioStore();
const { speechVolume, sfxVolume, musicVolume, ambientSfxVolume } =
  storeToRefs(store);

watch(musicVolume, (musicVolume) => {
  // Pause and unpause the music playing, so the new volume takes effect.
  store.musicSound.pause();
  store.playMusic();
});
</script>

<template>
  <fieldset class="card audio">
    <legend class="card-title">
      <span class="card-title-text"> Audio Settings </span>
    </legend>
    <div class="audio-items">
      <VolumeSlider
        v-model="speechVolume"
        class="audio-items-single"
        legened="Speech"
      />
      <VolumeSlider
        v-model="sfxVolume"
        class="audio-items-single"
        legened="SFX"
      />
      <VolumeSlider
        v-model="musicVolume"
        class="audio-items-single"
        legened="Music"
      />
      <VolumeSlider
        v-model="ambientSfxVolume"
        class="audio-items-single"
        legened="Ambient SFX"
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
