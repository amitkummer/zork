import { defineStore } from 'pinia';

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
      ]
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
    }
  }
});
