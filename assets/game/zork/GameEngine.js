import { CLI } from "./CLI.js";
import { Player } from "./Player.js";
import { roomList } from "./Room.js";
import { itemObjects } from "./Item.js";

export const GameEngine = {
  /**
   * @param {} outputCallback Function to be called with new game output.
   * @param {} roomChangedCallback Function to be called with player 
   *                                  location whenever it changes.
   * Start the game engine
   */
  init: (outputCallback, roomChangedCallback, inventoryChangedCallback) => {
    GameEngine.roomChangedCallback = roomChangedCallback;
    GameEngine.inventoryChangedCallback = inventoryChangedCallback;
    GameEngine.initializeCLI(outputCallback);
    GameEngine.initalizePlayer();
    GameEngine.lookAction();
  },

  initializeCLI: (outputCallback) => {
    GameEngine.cli = new CLI(outputCallback);
  },

  initalizePlayer: () => {
    GameEngine.player = new Player();
    GameEngine.player = GameEngine.player.loadPlayerState();

    if (GameEngine.player.gameIsSaved) {
      GameEngine.cli.output(GameEngine.outputList.saveLoaded);
    }
  },

  /*
   * Submit raw user input to the game engine.
   */
  submitCommand: (command) => {
    GameEngine.cli.submitCommand(command);
  },

  /**
   * Save a current gameState object
   */
  saveGame: () => {
    GameEngine.player.savePlayerState();
    GameEngine.cli.output(GameEngine.outputList.gameSaved);
  },

  /**
   * Reset a gameState object
   */
  resetGame: () => {
    GameEngine.player.resetPlayerState();
    GameEngine.cli.output(GameEngine.outputList.gameReset);
  },

  /********* CORE COMMANDS *********/

  // Outputs a help dialog to the player
  printHelp: () => {
    GameEngine.cli.output(GameEngine.outputList.acceptableCommands);
    var acceptedCommands = GameEngine.outputList.acceptableCommandList;
    for (i = 0; i < acceptedCommands.length; i++) {
      GameEngine.cli.output(acceptedCommands[i]);
    }
  },

  printInventory: () => {
    let inventory = GameEngine.player.getPlayerInventory();

    if (inventory === undefined || inventory.length == 0) {
      GameEngine.cli.output(GameEngine.outputList.emptyBag);
    } else {
      GameEngine.cli.output(GameEngine.outputList.bagContains);
      for (j = 0; j < inventory.length; j++) {
        GameEngine.cli.output(GameEngine.player.inventory[j]);
      }
    }
  },
  // Sets the output of items and rooms to verbose mode
  setVerboseOutput: () => {
    GameEngine.player.setVerboseMode(true);
    GameEngine.cli.output(GameEngine.outputList.verboseMode);
  },
  // Sets the output of items and rooms to brief mode
  setBriefOutput: () => {
    GameEngine.player.setVerboseMode(false);
    GameEngine.cli.output(GameEngine.outputList.briefMode);
  },

  getCurrentRoom: () => {
    return GameEngine.player.getCurrentLocation();
  },

  getPreviousRoom: () => {
    return GameEngine.player.getPreviousLocation();
  },

  /********* DIRECTIONAL COMMANDS *********/

  lookAction: () => {
    let currentRoom = GameEngine.getCurrentRoom();

    if (!roomList[currentRoom].roomIsDark) {
      GameEngine.cli.output(
        roomList[currentRoom].name
      );
      GameEngine.cli.output(roomList[currentRoom].look);

      GameEngine.showItems(roomList[currentRoom]);
    } else if (roomList[currentRoom].roomIsDark && !lantern.itemInUse) {
      GameEngine.cli.output(
        roomList[currentRoom].darkText
      );
    } else if (roomList[currentRoom].roomIsDark && lantern.itemInUse) {
      GameEngine.cli.output(
        roomList[currentRoom].name
      );
      GameEngine.cli.output(roomList[currentRoom].look);

      GameEngine.showItems(roomList[currentRoom]);
    }
  },

  showItems: (room) => {
    var itemlist = [];

    for (var i = 0; i < room.items.length; i++) {
      if (room.items[i].specialdesc) {
        GameEngine.cli.output(room.items[i].specialdesc);
      } else {
        itemlist.push(room.items[i].description);
      }
    }

    if (itemlist.length === 1) {
      GameEngine.cli.output("There is a " + itemlist[0] + " here.");
    } else if (itemlist.length > 1) {
      var str = "";
      for (var i = 0; i < itemlist.length; i++) {
        if (!itemlist[i + 1]) {
          str.concat(itemlist[i]);
        } else {
          str.concat(itemlist[i] + ", ");
        }
      }
      GameEngine.cli.output("There is a " + str + " here.");
    }
  },

  goAction: (direction) => {
    let currentRoom = GameEngine.getCurrentRoom();
    let lDirection = direction.toLowerCase();

    if (lDirection == "back") {
      GameEngine.player.setCurrentLocation(
        GameEngine.player.getPreviousLocation()
      );
      GameEngine.player.setPreviousLocation(roomList[currentRoom].varName);
      currentRoom = GameEngine.getCurrentRoom();
    } else {
      if (roomList[currentRoom][lDirection] === undefined) {
        GameEngine.cli.output(GameEngine.outputList.invalidDirection);
        return;
      }

      GameEngine.player.setPreviousLocation(roomList[currentRoom].varName);
      GameEngine.player.setCurrentLocation(
        roomList[currentRoom][lDirection].varName
      );
      currentRoom = GameEngine.getCurrentRoom();
    }

    if (GameEngine.player.getVerboseMode()) {
      if (currentRoom.visited) {
        GameEngine.cli.output(
          roomList[currentRoom].name
        );
        GameEngine.showItems(roomList[currentRoom]);
      } else {
        GameEngine.lookAction();
        roomList[currentRoom].visited = true;
      }
    } else {
      GameEngine.lookAction();
      roomList[currentRoom].visited = true;
    }
  },

  openAction: (direction) => {
    if (direction == "EGG") {
      GameEngine.useAction("EGG");
      return;
    }

    let currentRoom = GameEngine.getCurrentRoom();

    if (
      roomList[currentRoom]["open"] === undefined ||
      !roomList[currentRoom]["open"]
    ) {
      GameEngine.cli.output(GameEngine.outputList.notOpenable);
    } else {
      GameEngine.player.setPreviousLocation(roomList[currentRoom].varName);
      GameEngine.player.setCurrentLocation(
        roomList[currentRoom]["open"].varName
      );
      currentRoom = GameEngine.getCurrentRoom();

      if (GameEngine.player.getVerboseMode()) {
        if (currentRoom.visited) {
          GameEngine.cli.output(
            roomList[currentRoom].name
          );
          GameEngine.showItems(roomList[currentRoom]);
        } else {
          GameEngine.lookAction();
          roomList[currentRoom].visited = true;
        }
      } else {
        GameEngine.lookAction();
        roomList[currentRoom].visited = true;
      }
    }
  },

  takeAction: (item) => {
    let lItem = item.toLowerCase();
    let itemObject = itemObjects[lItem];
    let currentRoom = GameEngine.getCurrentRoom();

    if (!roomList[currentRoom].items.includes(itemObject)) {
      GameEngine.cli.output("A " + lItem + " does not exist here.");
      return;
    }

    if (GameEngine.player.inventory[itemObject]) {
      GameEngine.cli.output("The " + lItem + " is already in your bag.");
      return;
    }

    GameEngine.player.addToInventory(lItem);
    GameEngine.cli.output("You put the " + lItem + " in your bag.");
  },

  readAction: (item) => {
    let lItem = item.toLowerCase();
    let itemObject = itemObjects[lItem];

    if (!GameEngine.player.inventory.includes(lItem)) {
      GameEngine.cli.output("You don't own a " + lItem + " to read.");
      return;
    }

    if (!itemObject.actionArray.includes("read")) {
      GameEngine.cli.output(GameEngine.outputList.notReadable);
      return;
    }

    GameEngine.cli.output(itemObject.contents);
  },

  dropAction: (item) => {
    let lItem = item.toLowerCase();
    let itemObject = itemObjects[lItem];

    if (!GameEngine.player.inventory.includes(lItem)) {
      GameEngine.cli.output("You don't own a " + lItem + " to drop.");
      return;
    }

    let currentRoom = GameEngine.getCurrentRoom();
    roomList[currentRoom].items.push(itemObject);

    GameEngine.player.removeFromInventory(lItem);
    GameEngine.cli.output("You have dropped the " + lItem);
  },

  useAction: (item) => {
    if (!item) {
      GameEngine.cli.output(GameEngine.outputList.notUseable);
    }

    let lItem = item.toLowerCase();

    if (!GameEngine.player.getPlayerInventory().includes(lItem)) {
      GameEngine.cli.output("You don't have a " + lItem + " to use!");
    }

    if (itemObjects[lItem].inUse) {
      GameEngine.cli.output(GameEngine.outputList.alreadyInUse);
      itemObjects[lItem].inUse = false;
      GameEngine.lookAction();
    } else {
      if (lItem == "egg") {
        GameEngine.cli.output(
          itemObjects[lItem].openDesc
        );
        if (GameEngine.getCurrentRoom() == "tree") {
          GameEngine.goAction("back");
          return;
        }
      } else {
        GameEngine.cli.output(itemObjects[lItem].useDesc);
      }
      itemObjects[lItem].inUse = true;
      GameEngine.lookAction();
    }
  },

  outputList: {
    saveLoaded: "Game loaded from a previous save.",
    gameSaved: "Your game state has been saved.",
    gameReset: "Your game state has been reset.",
    emptyBag: "There is nothing in your bag!",
    bagContains: "Your bag contains:",
    acceptableCommands: "Here is a list of acceptable commands:",
    acceptableCommandList: [
      "> go [direction]",
      "> north",
      "> east",
      "> south",
      "> west",
      "> up",
      "> down",
      "> look",
      "> open",
      "> enter",
      "> exit",
      "> climb",
      "> brief [ short descriptions ]",
      "> verbose [ long descriptions ]",
      "> help",
      "> take",
      "> bag",
      "> save [ Save current game]",
      "> reset [ Reset game including save ]",
    ],
    verboseMode:
      'ZORK is now in its "verbose" mode, which always gives long descriptions of locations (even if you\'ve been there before).',
    briefMode:
      'ZORK is now in its normal "brief" printing mode, which gives long descriptions of places never before visited, and short descriptions otherwise.',
    invalidDirection: "You can't go that way.",
    notOpenable: "You can't open that.",
    notUseable: "Use what?",
    alreadyInUse: "The item is already in use. Putting item away.",
    notReadable: "You can't read that.",
  },
};
