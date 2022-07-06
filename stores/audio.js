import { defineStore } from 'pinia';
import { Howl } from 'howler';

export const useAudioStore = defineStore('audio', {
  // arrow function recommended for full type inference
  state: () => {
    return {
      // Game volume.
      // Values are in the range `[0, 8]`.
      settings: [
        {
          name: 'Speech',
          value: 0
        },
        {
          name: 'SFX',
          value: 4
        },
        {
          name: 'Music',
          value: 4
        },
        {
          name: 'Ambient SFX',
          value: 4
        }
      ],
      dropSound: null,
      walkSound: null
    };
  },
  actions: {
    speak(text) {
      const utter = new SpeechSynthesisUtterance(text);
      const speechVolume = this.settings.find(
        (element) => element.name === 'Speech'
      ).value;
      utter.volume = speechVolume * 0.125;
      if (window.speechSynthesis.speaking)
        // Stop speeking currently being spoen utterance.
        window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utter);
    },
    initSounds() {
      this.dropSound = new Howl({
        src: ['audio/drop/2-taps.wav'],
        preload: true
      });
      this.walkSound = new Howl({
        src: ['audio/walk/2.00Secs-4taps.wav'],
        preload: true
      });
    },
    playDropSound() {
      const volume =
        this.settings.find((element) => element.name === 'Ambient SFX').value *
        0.125;
      this.dropSound.volume(volume);
      this.dropSound.play();
    },
    playWalkSound() {
      const volume =
        this.settings.find((element) => element.name === 'Ambient SFX').value *
        0.125;
      this.walkSound.volume(volume);
      this.walkSound.play();
    }
  }
});
