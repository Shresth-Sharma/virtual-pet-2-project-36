var database;
var dog,happydog;
var foods,foodstock;
var dog1;
var feed,add;
var fedTime,lastFed,lastFed1;
var foodObj;
function preload(){
    dog = loadImage("Dog.png");
    happydog = loadImage("happydog.png");
}
function setup(){
    createCanvas(500,500);
    database = firebase.database();
    dog1 = createSprite(250,250);
    dog1.addImage("hi",dog);
    dog1.scale = 0.4;
    var f = database.ref('food')
    var gameStateRef  = database.ref('food');
        gameStateRef.on("value",function(data){
        foodstock = data.val();
    });
    feed = createButton('FEED');
    add = createButton('ADD');
    feed.size(70,40);
    add.size(70,40);
    feed.position(300,450);
    add.position(400,450);
    foodObj = new Food(50,200);
}
function draw(){
    background((46, 139, 87));
    var gameStateRef  = database.ref('lastfood');
    gameStateRef.on("value",function(data){
    lastFed = data.val();
    });
    
    var gameStateRef  = database.ref('lastfood1');
    gameStateRef.on("value",function(data){
    lastFed1 = data.val();
    });
    if(lastFed!==undefined){
        textSize(30);
        fill("blue");
        if(lastFed>12){
            lastFed = lastFed - 12
            text("LastFed : "+lastFed+":"+lastFed1,50,100);
        }
        else{
            text("LastFed : "+lastFed+":"+lastFed1,50,100);
        }
        
        
    }
    foodObj.display();
    addfood();
    feed1();
    drawSprites();
    textSize(35);
    stroke("red");
    strokeWeight(10);
    fill("green");
    text("Use Up arrow to feed the dog",5,30);
}
function addfood(){
    if(foodstock!==undefined){
    add.mousePressed(()=>{
        foodstock = foodstock + 1
    });
    database.ref('/').update({
        food : foodstock
    });
    }
}
function feed1(){
    dog1.addImage("hio",happydog)
    if(foodstock!==undefined){
    feed.mousePressed(()=>{
        foodstock = foodstock - 1
        database.ref('/').update({
            food : foodstock,
            lastfood : hour(),
            lastfood1 : minute()
        });
    });
    
    }
}