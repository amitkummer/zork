import { defineStore } from 'pinia'

export const useStore = defineStore('game', {
  // arrow function recommended for full type inference
  state: () => {
    return {
      // Player location.
      location: "West of House", 
      // Description of the player's location.
      locationDescription: 'You are standing in an open field west of a white house, with a boarded front door.\nThere is a small mailbox here.',
      // List of commands entered (e.g, 'open mailbox').
      previousCommands: [],
      // Output from the previous command.
      commandOutput: '',
    }
  },
  actions: {
    // Enter a command executed by the user (e.g, 'open mailbox').
    // This updates the state of all the getter's.
    // Call this with raw player input.
    enterCommand(command) {
     return   
    },
  }
})

