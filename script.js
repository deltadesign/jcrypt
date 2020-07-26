// player inventory
let inventory = [];


// rooms
class Room {
  constructor (roomName, description){
    this._roomName = roomName;
    this._description = description;
    this._linkedRooms={};
    this._character = "";
  }
  get roomName () {
    return this._roomName;
  }
  get description () {
    return this._description;
  }
  get character (){
    return this._character;
  }
  set character (value){
    this._character = value;
  }
  describe (){
    return `You're in the ${this._roomName}, ${this._description}`
  }
  linkRoom (direction, roomToLink) {
    this._linkedRooms[direction] = roomToLink;
  }
  move (direction){
    if (direction in this._linkedRooms) {
      return this._linkedRooms[direction];
    }else{
      alert("you can't move in that direction");
      return this;
    }
  }

}

// rooms

const room1 = new Room ("Crypt Entrance", "It's cold dark and smelly")
const room2 = new Room ("Dungeon", "It's creepily quiet")
const room3 = new Room ("Tunnels", "It's musty and dark")
const room4 = new Room ("Jailer's Quarters", "It's damp and cold")
const room5 = new Room ("Jail Cell", "it's horrible")
const room6 = new Room ("Java's Crypt", "the door is locked, you can't get out",)

//Room1 links
room1.linkRoom ("north", room2);
room1.linkRoom ("east", room3);
room1.linkRoom ("west", room4);

//Room2 links
room2.linkRoom ("south", room1);
room2.linkRoom ("east", room5);
room2.linkRoom ("west", room6);

//Room3 links
room3.linkRoom ("west", room1);
room3.linkRoom ("north", room5);

//Room4 links
room4.linkRoom ("east", room1);

//Room5 links
room5.linkRoom ("south", room3);
room5.linkRoom ("west", room2);

// characters
class Character {
  constructor (name, description, gift){
    this._name = name
    this._description = description
    this._gift = gift
  }
  get name (){
    return this._name;
  }
  get description (){
    return this._description;
  }
  get gift (){
    return this._gift
  }
  intro (){
    return `You have encountered ${this._name}`
  }
  talk (){
    return `"${this._description}"`
  }
  take (){
    return `"here take this ${gift} I have a feeling you're going to need it"`
  }
}

const bill = new Character ("Bill DoreDum", "I used to run a school, now I run this dump", "Bucket")
const grand = new Character ("Grand Alf", "have you seen two midgets with a ring around here?", "key")
const yodur = new Character ("Yodur", "backwards I talk, knows why not I", "luminescent scimitar")

//character locations
room4.character = bill;
room3.character = yodur;
room5.character = grand;


// display Room function
function displayRoominfo(room){
  text = room.describe();

  document.getElementById("room").innerHTML = text;

  if(room.character != ""){
    document.getElementById("intro").innerHTML = room.character.intro();
  }else{
    document.getElementById("intro").innerHTML = "";
  }
}

// begin game and navigate function 
function beginGame (){
  currentRoom = room1;
  displayRoominfo(currentRoom);

    document.addEventListener("keydown",function(event) {
      if (event.key === "Enter"){
          let command = document.getElementById("userInput").value.toLowerCase();
          const directions = ["north", "east", "west", "south"]
          const commands = ["talk", "take"]
              if (directions.includes(command)){
                currentRoom = currentRoom.move(command)
                displayRoominfo(currentRoom);
                document.getElementById("userInput").value ="";
              }else if (commands.includes(command)) {
                document.getElementById("convo").innerHTML = currentRoom.character(command)
              }else{
                  alert(command + " is not a valid command");
                  document.getElementById("userInput").value ="";                  
          }
      }
  });
}

beginGame()

console.log("WORK IN PROGRESS")

