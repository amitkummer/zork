import { defineStore } from 'pinia'

import { startGame } from '~~/assets/game'

export const useStore = defineStore('game', {
  // arrow function recommended for full type inference
  state: () => {
    return {
      game: null,
      // Player location.
      location: "West of House", 
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
    }
  },
  actions: {
    // Start the game and register event callbacks.
    // outputCallback is called by the game when new output is available.
    // locationChangeCallback is called with player location whenever it changes.
    initGame() {
      const outputCallback = (gameOutput) => this.output.push(gameOutput)
      const locationChangeCallback = (playerLocation) =>  this.location = playerLocation
      this.game = startGame(outputCallback, locationChangeCallback)
    },
    // Enter a command executed by the user (e.g, 'open mailbox').
    // This updates the state of all the getter's.
    // Call this with raw player input.
    enterCommand(command) {
      this.game.submitCommand(command)
      this.previousCommands.push(command)
    },
  }
})

