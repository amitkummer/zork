import { GameEngine } from "./zork/GameEngine.js";

/*
 * @param {function} outputCallback Function called with game output.
 * @param {function} locationChangeCallback Function called with player location whenever it changes.
 * @return {object} Game object which includes methods which mutate the game state.
 * Note: It is advised to not call this function repeatedly, as on each call,
 * 	 old game instances are reset.
 */
export function startGame(outputCallback,
			  locationChangeCallback,
			  inventoryChangeCallback) { 
  GameEngine.init(outputCallback, 
		  locationChangeCallback,
		  inventoryChangeCallback);
  return {
    // TODO: ERROR: can't stringify this!
    // Does this happen only during SSR?
    'submitCommand': GameEngine.submitCommand, 
  }
}

