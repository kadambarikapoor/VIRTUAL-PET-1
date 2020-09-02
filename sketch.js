var dog, dogImage;
var happyDog, happyDogImage;
var database;
var foodS, foodStock;
function preload(){
  dogImage = loadImage("Dog.png");
  happyDogImage = loadImage("happydog.png");
}

function setup() {
  createCanvas(500, 500);
  
  database = firebase.database();
  dog = createSprite(250, 250, 50, 50);
  dog.addImage("dog", dogImage)
  dog.scale = 0.2;
  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
}

function draw() {  
  background(46, 139, 87);

  if (keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage("happyDog", happyDogImage);
    //console.log(happyDogImage);
  }
  drawSprites();
  textSize(20);
  fill("white")
  text("Note: Press the up arrow to feed Drago milk!", 50, 50);
  textSize(20);
  fill("white")
  text("Food remaining:"+ foodS ,160, 100); 
}
function readStock(data){
  foodS=data.val();
}
function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }
  database.ref('/').update({
    Food:x
  })
}