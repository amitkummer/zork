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
      // Ambient FX.
      dropSound: null,
      walkSound: null,
      // Achivements.
      take5ItemsSound: null,
      take10ItemsSound: null,
      take20ItemsSound: null,
      explore5RoomsSound: null,
      explore10RoomsSound: null,
      explore20RoomsSound: null,
      get5ScoreSound: null,
      get10ScoreSound: null,
      get20ScoreSound: null
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
        src: ['audio/drop/2-taps.ogg'],
        preload: true
      });
      this.walkSound = new Howl({
        src: ['audio/walk/2.00Secs-4taps.ogg'],
        preload: true
      });
      this.take5ItemsSound = new Howl({
        src: ['audio/take-item/5-items.ogg'],
        preload: true
      });
      this.take10ItemsSound = new Howl({
        src: ['audio/take-item/10-items.ogg'],
        preload: true
      });
      this.take20ItemsSound = new Howl({
        src: ['audio/take-item/20-items.ogg'],
        preload: true
      });
      this.explore5RoomsSound = new Howl({
        src: ['audio/rooms-explored/5-rooms.ogg'],
        preload: true
      });
      this.explore10RoomsSound = new Howl({
        src: ['audio/rooms-explored/10-rooms.ogg'],
        preload: true
      });
      this.explore20RoomsSound = new Howl({
        src: ['audio/rooms-explored/20-rooms.ogg'],
        preload: true
      });
      this.get5ScoreSound = new Howl({
        src: ['audio/score/5-score.ogg'],
        preload: true
      });
      this.get10ScoreSound = new Howl({
        src: ['audio/score/10-score.ogg'],
        preload: true
      });
      this.get20ScoreSound = new Howl({
        src: ['audio/score/20-score.ogg'],
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
    },
    playTake5ItemsSound() {
      const volume =
        this.settings.find((element) => element.name === 'SFX').value * 0.125;
      this.take5ItemsSound.volume(volume);
      this.take5ItemsSound.play();
      console.log(this.take5ItemsSound);
    },
    playTake10ItemsSound() {
      const volume =
        this.settings.find((element) => element.name === 'SFX').value * 0.125;
      this.take10ItemsSound.volume(volume);
      this.take10ItemsSound.play();
    },
    playTake20ItemsSound() {
      const volume =
        this.settings.find((element) => element.name === 'SFX').value * 0.125;
      this.take20ItemsSound.volume(volume);
      this.take20ItemsSound.play();
    },
    playExplore5RoomsSound() {
      const volume =
        this.settings.find((element) => element.name === 'SFX').value * 0.125;
      this.explore5RoomsSound.volume(volume);
      this.explore5RoomsSound.play();
    },
    playExplore10RoomsSound() {
      const volume =
        this.settings.find((element) => element.name === 'SFX').value * 0.125;
      this.explore10RoomsSound.volume(volume);
      this.explore10RoomsSound.play();
    },
    playExplore20RoomsSound() {
      const volume =
        this.settings.find((element) => element.name === 'SFX').value * 0.125;
      this.explore20RoomsSound.volume(volume);
      this.explore20RoomsSound.play();
    }
  }
});
