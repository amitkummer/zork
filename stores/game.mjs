import { defineStore } from 'pinia';

import { startGame } from '~~/assets/game';
import { useAudioStore } from './audio';

export const useGameStore = defineStore('game', {
  // arrow function recommended for full type inference
  state: () => {
    return {
      game: null,
      // Player location.
      location: 'West of House',
      // List of commands entered (e.g, 'open mailbox').
      // The commands in this array are ordered chronologically -- first
      // element is the first command which was executed.
      previousCommands: [],
      // Game output.
      // Each item in this array is an output produced by the game.
      // The output in this array is ordered chronologically -- first
      // element is the first output produced by the game, last element
      // is the latest output.
      output: [],
      // Player Inventory.
      inventory: ['Leaflet', 'Knife', 'Lantern', 'Glass Bottle', 'Sword'],
      // Number of times player executed the `go` command.
      stepsCount: 0,
      // Number of times player exeucted the `take` command.
      takeCount: 0,
      // Player score.
      score: 0
    };
  },
  actions: {
    // Start the game and register event callbacks.
    // outputCallback is called by the game when new output is available.
    // locationChangeCallback is called with player location whenever it changes.
    initGame() {
      const outputCallback = (gameOutput) => {
        this.output.push(gameOutput);
        const audioStore = useAudioStore();
        audioStore.speak(gameOutput);
      };
      const locationChangeCallback = (playerLocation) =>
        (this.location = playerLocation);
      const inventoryChangeCallback = (inventory) => {
        // Capitalize each inventory item's name.
        this.inventory = inventory.map(
          (item) => item.charAt(0).toUpperCase() + item.slice(1)
        );
      };
      const validCommandEnteredCallback = (command) => {
        const audioStore = useAudioStore();
        switch (command) {
          case 'DROP':
            audioStore.playDropSound();
            break;
          case 'GO':
            audioStore.playWalkSound();
            this.stepsCount += 1;
            switch (this.stepsCount) {
              case 5:
                audioStore.playExplore5RoomsSound();
                break;
              case 10:
                audioStore.playExplore10RoomsSound();
                break;
              case 20:
                audioStore.playExplore20RoomsSound();
            }
            break;
          case 'TAKE':
            this.takeCount += 1;
            switch (this.takeCount) {
              case 5:
                audioStore.playTake5ItemsSound();
                break;
              case 10:
                audioStore.playTake10ItemsSound();
                break;
              case 20:
                audioStore.playTake20ItemsSound();
            }
            break;
        }
      };
      this.game = startGame(
        outputCallback,
        locationChangeCallback,
        inventoryChangeCallback,
        validCommandEnteredCallback
      );
    },
    // Enter a command executed by the user (e.g, 'open mailbox').
    // This updates the state of all the getter's.
    // Call this with raw player input.
    enterCommand(command) {
      this.previousCommands.unshift(command);
      this.game.submitCommand(command);
    }
  }
});
