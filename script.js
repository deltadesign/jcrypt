//inventory
var inventory = []

function addItem(item){
inventory.push(`<li>${item}</li>`)
return document.getElementById("inventory").innerHTML = inventory.join('')
}

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
    return `You're in ${this._roomName}, ${this._description}`
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
const room1 = new Room ("the Crypt Entrance", "It's cold dark and smelly")
const room2 = new Room ("the Dungeon", "It's creepily quiet")
const room3 = new Room ("the Tunnels", "It's musty and dark")
const room4 = new Room ("the Jailer's Quarters", "It's damp and cold")
const room5 = new Room ("a Jail Cell", "it's horrible")
const room6 = new Room ("Java's Crypt", "there's a shadowy figure in the room",)
const room7 = new Room ("the Open air, freedom!", "you have escaped Java's Crypt")

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

//room 6 links 
room6.linkRoom ("north", room7)

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
  item (){
    return `"here take this ${this._gift} I have a feeling you're going to need it"`
  }
  action (value){
    if (value === "talk"){
      return `"${this._description}"`
    } else if (value === "take"){
      alert(`${this._name} gave you a ${this._gift}`)
      addItem(this._gift)
      return `"here take this ${this._gift} I have a feeling you're going to need it"`;
    }
  }
}

const bill = new Character ("Bill DoreDum", "I used to run a school, now I run this dump", "Bucket")
const grand = new Character ("Grand Alf DeGrey", "have you seen two midgets with a ring running around here?", "key")
const yodur = new Character ("Yodur", "backwards I talk, knows why I don't", "luminescent scimitar")
const java = new Character ("Java", "I hope you enjoyed the crypt!", "Java's Crypt training manual")

//character locations
room4.character = bill;
room3.character = yodur;
room5.character = grand;
room6.character = java;


// display Room function
function displayRoominfo(room){
  text = room.describe();

  document.getElementById("room").innerHTML = text;

  if(room.character != ""){
    document.getElementById("intro").innerHTML = room.character.intro();
    document.getElementById("convo").innerHTML = "";
  }else{
    document.getElementById("intro").innerHTML = "";
    document.getElementById("convo").innerHTML = "";
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
                document.getElementById("convo").innerHTML = currentRoom.character.action(command)
                document.getElementById("userInput").value ="";
              }else{
                  alert(command + " is not a valid command");
                  document.getElementById("userInput").value ="";                  
          }
      }
  });
}


beginGame()







