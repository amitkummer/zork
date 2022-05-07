import { defineStore } from 'pinia'

import { startGame } from '~~/assets/game'
import { useAudioStore } from './audio'

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
      // Player Inventory.
      inventory: ['Leaflet', 'Knife', 'Lantern', 'Glass Bottle', 'Sword'],
    }
  },
  actions: {
    // Start the game and register event callbacks.
    // outputCallback is called by the game when new output is available.
    // locationChangeCallback is called with player location whenever it changes.
    initGame() {
      const outputCallback = (gameOutput) => {
        this.output.push(gameOutput)
        const audioStore = useAudioStore()
        audioStore.speak(gameOutput)
      }
      const locationChangeCallback = (playerLocation) =>  this.location = playerLocation
      const inventoryChangeCallback = (inventory) => {
        // Capitalize each inventory item's name.
        this.inventory = inventory.map((item) => item.charAt(0).toUpperCase() + item.slice(1))
      }
      this.game = startGame(
        outputCallback,
        locationChangeCallback,
        inventoryChangeCallback
      )
    },
    // Enter a command executed by the user (e.g, 'open mailbox').
    // This updates the state of all the getter's.
    // Call this with raw player input.
    enterCommand(command) {
      this.previousCommands.unshift(command)
      this.game.submitCommand(command)
    },
  }
})

