import { defineStore } from 'pinia';
import { Howl } from 'howler';

export const useAudioStore = defineStore('audio', {
  // arrow function recommended for full type inference
  state: () => {
    return {
      // If the player has indicated they want to enable audio at the start
      // of the game, this property is `false`.
      // If this property is `true` then all the playFooSound methods won't
      // play anything.
      isAudioDisabled: true,
      // Game volume.
      // Values are in the range `[0, 8]`.
      speechVolume: 4,
      sfxVolume: 4,
      musicVolume: 4,
      ambientSfxVolume: 4,
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
      get20ScoreSound: null,
      // Music.
      musicSound: null,
      // Master volume for all settings in the range [0, 1].
      masterVolume: 0.25
    };
  },
  getters: {
    getSpeechVolume() {
      return this.speechVolume * 0.125 * this.masterVolume;
    },
    getSfxVolume() {
      const masterSfxVolume = 0.35;
      return this.sfxVolume * 0.125 * masterSfxVolume * this.masterVolume;
    },
    getAmbientSfxVolume() {
      return this.ambientSfxVolume * 0.125 * this.masterVolume;
    },
    getMusicVolume() {
      return this.musicVolume * 0.125 * this.masterVolume;
    }
  },
  actions: {
    speak(text) {
      if (this.isAudioDisabled) return;
      const utter = new SpeechSynthesisUtterance(text);
      utter.volume = this.getSpeechVolume;
      if (window.speechSynthesis.speaking)
        // Stop speeking currently being spoen utterance.
        window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utter);
    },
    // Must be called before playing any non speech sound.
    // Downloads all game audio.
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
      this.musicSound = new Howl({
        src: ['audio/music/dungeon.ogg'],
        preload: true,
        loop: true
      });
    },
    playDropSound() {
      if (this.isAudioDisabled) return;
      this.dropSound.volume(this.getAmbientSfxVolume);
      this.dropSound.play();
    },
    playWalkSound() {
      if (this.isAudioDisabled) return;
      this.walkSound.volume(this.getAmbientSfxVolume);
      this.walkSound.play();
    },
    playTake5ItemsSound() {
      if (this.isAudioDisabled) return;
      this.take5ItemsSound.volume(this.getSfxVolume);
      this.take5ItemsSound.play();
    },
    playTake10ItemsSound() {
      if (this.isAudioDisabled) return;
      this.take10ItemsSound.volume(this.getSfxVolume);
      this.take10ItemsSound.play();
    },
    playTake20ItemsSound() {
      if (this.isAudioDisabled) return;
      this.take20ItemsSound.volume(this.getSfxVolume);
      this.take20ItemsSound.play();
    },
    playExplore5RoomsSound() {
      if (this.isAudioDisabled) return;
      this.explore5RoomsSound.volume(this.getSfxVolume);
      this.explore5RoomsSound.play();
    },
    playExplore10RoomsSound() {
      if (this.isAudioDisabled) return;
      this.explore10RoomsSound.volume(this.getSfxVolume);
      this.explore10RoomsSound.play();
    },
    playExplore20RoomsSound() {
      if (this.isAudioDisabled) return;
      this.explore20RoomsSound.volume(this.getSfxVolume);
      this.explore20RoomsSound.play();
    },
    playMusic() {
      if (this.isAudioDisabled) return;
      this.musicSound.volume(this.getMusicVolume);
      this.musicSound.play();
    }
  }
});
