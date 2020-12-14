//Create variables here
var dog,happyDog,database,foodStock,foodS;
var dogImg;
var fedTime,lastFed,foodObj,currentTime;
var feed,addFood
var GameState,readState

function preload(){
  //load images here
  dogImg = loadImage("Dog.png");
  happyDog = loadImage("happydog.png");
  Garden=loadImage("Garden.png")
  WashRoom=loadImage("WashRoom.png")
  Bedroom=loadImage("BedRoom.png")
}

function setup() {
  var canvas = createCanvas(displayWidth - 20, displayHeight-30);
  database = firebase.database();
  foodStock = database.ref('Food');
  foodStock.on('value',readStock)
  //foodStock.on("value",readStock);
  dog = createSprite(windowWidth/2,250,10,10);
  dog.addImage(dogImg);
  dog.scale = 0.2;
 foodObj=new Food()
 feed=createButton("Feed the dog")
 feed.position(700,95)
 feed.mousePressed(feedDog)
 addFood=createButton("Add food")
 addFood.position(900,95)
 addFood.mousePressed(addFoods)
 fedTime=database.ref('FeedTime')
 fedTime.on('value',function(data){
  lastFed=data.val()
 })
 readState=database.ref('gameState')
 readState.on('value',function(data){
  gameState=data.val()
 })
}


function draw() {  
background(46, 139, 87);
foodObj.display()
fedTime=database.ref('FeedTime')
fedTime.on('value',function(data){
lastFed=data.val()
})

  drawSprites();
  //add styles here
  fill("red");
  textSize(20);
  stroke(5);
  
  
  
  

}
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS)
}

function addFoods(){
  foodS++
database.ref('/').update({
  Food:foodS
})
}

function feedDog(){
  dog.addImage(happyDog)
  foodObj.updateFoodStock(foodObj.getFoodStock()-1)
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

