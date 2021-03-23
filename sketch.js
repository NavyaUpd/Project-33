var Engine = Matter.Engine,
  World = Matter.World,
  Events = Matter.Events,
  Bodies = Matter.Bodies;
 
var particles = [];
var plinkos = [];
var divisions = [];
var score = 0;
var particle = null; 
var count = 0;
var gamestate = "play";

var divisionHeight=300;
var score = 0;
function setup() {
  createCanvas(800, 800);

  engine = Engine.create();
  world = engine.world;
  ground = new Ground(width/2,height,width,20);


  for (var k = 0; k <=width; k = k + 80) {
     divisions.push(new Divisions(k, height-divisionHeight/2, 10, divisionHeight));
  }
  for (var j = 75; j <=width; j=j+50) {
    plinkos.push(new Plinko(j,75));
  }
  for (var j = 50; j <=width-10; j=j+50){
    plinkos.push(new Plinko(j,175));
  }  
  for (var j = 75; j <=width; j=j+50){
    plinkos.push(new Plinko(j,275));
  }
  for (var j = 50; j <=width-10; j=j+50){
    plinkos.push(new Plinko(j,375));
  }

  //particles.push(new Particle(random(width/2-30, width/2+30), 10,10));
}

function draw() {
  background("black");
  Engine.update(engine);
  
  textSize(20)
  fill("white");
  text("Score : "+score,20,30);

  text("500", 20, 600);
  text("500", 20+80, 600);
  text("500", 20+80+80, 600);
  text("500", 180+80, 600);

  text("100", 180+80+80, 600);
  text("100", 180+80+80+80, 600);
  text("100", 180+80+80+80+80, 600);

  text("200", 500+80, 600);
  text("200", 500+80+80, 600);
  text("200", 500+80+80+80, 600);

  for (var i = 0; i < plinkos.length; i++) {
    plinkos[i].display();
  }
  for (var j = 0; j < particles.length; j++) {
    particles[j].display();
  }
  for (var k = 0; k < divisions.length; k++) {
    divisions[k].display();
  }

  if(particle !== null){
    particle.display();
      if(particle.body.position.y > 760){
        count++;
          if(particle.body.position.x < 300){
            score += 500;
            particle = null;
          }else if(particle.body.position.x < 600 && particle.body.position.x > 301){
            score += 100;
            particle = null;
          }else if(particle.body.position.x < 900 && particle.body.position.x > 601){
            score += 200;
            particle = null;
          }
      }
  }

  if(count >= 5){
    gamestate = "end";
    textSize(100);
    fill("red");
    strokeWeight(5);
    stroke("white");
    text("GAME OVER", 100, 400);
    noStroke();
  }
}

function mousePressed(){
  if(gamestate !== "end"){
    particle = new Particle(mouseX, 10, 10, 10);
    console.log(count);
  }
}
