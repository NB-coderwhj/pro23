var helicopterIMG, helicopterSprite, packageSprite,packageIMG;
var packageBody,ground, middleB_sprite
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

function preload()
{
	helicopterIMG=loadImage("helicopter.png")
	packageIMG=loadImage("package.png")
}

function setup() {
	createCanvas(800, 700);
	rectMode(CENTER);
	

	packageSprite=createSprite(width/2, 80, 10,10);
	packageSprite.addImage(packageIMG)
	packageSprite.scale=0.2

	helicopterSprite=createSprite(width/2, 200, 10,10);
	helicopterSprite.addImage(helicopterIMG)
	helicopterSprite.scale=0.6

	groundSprite=createSprite(width/2, height-35, width,10);
	groundSprite.shapeColor=color(255)

	//middleB_sprite = createSprite(0,0,320,20);
	//middleB_sprite.shapeColor = color(255,0,0)

    //introducing matter.js
	engine = Engine.create();
	world = engine.world;

	//package
	packageBody = Bodies.circle(width/2 , 200 , 5 , {restitution:0, isStatic:true});
	World.add(world, packageBody);
	

	//ground
	ground = Bodies.rectangle(width/2, 650, width, 10 , {isStatic:true} );
	 World.add(world, ground);

	 //left barrier
	 var leftB_options = {
		 isStatic : true
	 }
	 
	leftB = Bodies.rectangle(width/2 - 150,ground.position.y - 30,20,100,leftB_options);
	World.add(world, leftB);

	//right barrier
	var rightB_options = {
		isStatic : true
	}
	rightB = Bodies.rectangle(width/2 + 150, ground.position.y - 30, 20 ,100,rightB_options)
    World.add(world, rightB)

	//middle barrier
	var middleB_options = {
		isStatic : true
	}
	middleB = Bodies.rectangle(width/2, ground.position.y, 320, 20, middleB_options)
	World.add(world,middleB)
	
	Engine.run(engine);
  
}


function draw() {
 
  background(0);
  Engine.update(engine)
  packageSprite.x= packageBody.position.x 
  packageSprite.y= packageBody.position.y
 // middleB_sprite.x = middleB.position.x
 // middleB_sprite.y = middleB.position.y
  rectMode(CENTER);
  fill("red")
  rect(leftB.position.x, leftB.position.y, 20,100 )
  rect(rightB.position.x,rightB.position.y,20,100)
  rect(middleB.position.x,middleB.position.y,320,20)

 // middleB_sprite.collide(packageSprite)
  if(isColliding(middleB, packageBody)){
     Matter.Body.setVelocity(packageBody, 0)
  }
  
  drawSprites();
 
}

function keyPressed() {
 if (keyCode === DOWN_ARROW) {
    // Look at the hints in the document and understand how to make the package body fall only on
	Matter.Body.setStatic(packageBody, false);
	//packageBody.restitution(0);
  }
}

function isColliding(body1,body2){
	if (body1.position.y - body2.position.y < body1.height/2 + body2.height/2 &&
		body2.position.y - body1.position.y < body1.height/2 + body2.height/2){
			return true
		}else{
			return false
		}
}



