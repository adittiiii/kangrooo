class Game {
  constructor() {
  this.resetButton=createButton("reset");
  this.resetTitle=createElement("h2");
  this.leaderBoardTitle=createElement("h1");
  this.leader1=createElement("h2");
  this.leader2=createElement("h2");

  }

  getState() {
    var gameStateRef = database.ref("gameState");
    gameStateRef.on("value", function(data) {
      gameState = data.val();
    });
  }
  update(state) {
    database.ref("/").update({
      gameState: state
    });
  }

  start() {
    player = new Player();
    playerCount = player.getCount();

    form = new Form();
    form.display();

    car1 = createSprite(width / 2 - 50, height - 100);
    car1.addImage("car1", car1_img);
    car1.scale = 0.07;

    car2 = createSprite(width / 2 + 100, height - 100);
    car2.addImage("car2", car2_img);
    car2.scale = 0.07;

    cars = [car1, car2];
    
  }

  handleElements() {
    form.hide();
    form.titleImg.position(40, 50);
    form.titleImg.class("gameTitleAfterEffect");
  }

  play() {
    this.display();

    this.handleElements();

    Player.getPlayersInfo();

    if (allPlayers !== undefined) {
      image(track, 0, -height * 5, width, height * 6);

      //index of the array
      var index = 0;
      for (var plr in allPlayers) {
        //add 1 to the index for every loop
        index = index + 1;

        //use data form the database to display the cars in x and y direction
        var x = allPlayers[plr].positionX;
        var y = height - allPlayers[plr].positionY;

        cars[index - 1].position.x = x;
        cars[index - 1].position.y = y;


        if(index === player.index){
          stroke(4);
          fill("red");
          ellipse(x,y,60,60)
  
          camera.position.x =  cars[index - 1].position.x;
          camera.position.y = cars[index - 1].position.y;
          
        }
        
  

      }
      

      this.handlePlayerControls();


      drawSprites();
    }
  }

  handlePlayerControls() {
    // handling keyboard events
    if (keyIsDown(UP_ARROW)) {
      player.positionY += 10;
      player.update();
    }
  }

  display(){
form.hide();
form.titleImg.position(40,50);

form.titleImg.class("gameTitleAfterEffect");

this.resetTitle.html("Reset Game");
this.resetTitle.position(width/2-50, height/2-200);
this.resetTitle.class("resetText");

this.resetButton.position(width/2-10,height/2-150);
this.resetButton.class("aditiresetbutton");

this.leaderBoardTitle.html("leaderBoard");
this.leaderBoardTitle.position(width/3-460,height/2-250);
this.leaderBoardTitle.class("resetText");

this.leader1.position(width/3-20,height/2-100);
this.leader1.class("leaderText");

this.leader2.position(width/3-20,height/2-100);
this.leader2.class("leaderText");

};

handleReset(){
  this.resetButton.mousePressed(()=>{
    database.ref("/").set({
      playerCount: 0,
      gameState: 0, 
      players: {},
    })
  })
}


}
