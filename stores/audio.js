import { defineStore } from 'pinia';

export const useStore = defineStore('audio', {
  // arrow function recommended for full type inference
  state: () => {
    return {
      // Game volume.
      // Values are in the range `[1, 8]`.
      settings: [
        {
          name: 'Speech',
          value: 4
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
  }
});
