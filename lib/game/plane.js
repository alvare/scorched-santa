ig.module(
  "game.plane"
)
.requires(
  "impact.entity"
)
.defines(function(){

  EntityPlane = ig.Entity.extend({

    animSheet: new ig.AnimationSheet("media/plane.png", 100, 60),
    boomSheet: new ig.AnimationSheet("media/boom.png", 155, 64),
    maxVel: { x: 1000, y: 1000},

    init: function(x, y, settings){
      this.parent(x, y, settings);

      // default direction: right
      this.addAnim("fly", 0.2, [0,1,2,3]);
      this.boomAnim = new ig.Animation(this.boomSheet, 0.1, [16,8,0,17,9,1,18,10,2,19,11,3,20,12,4,21,13,5,22,14,6,23,15,7], true);
      this.vel.x = 200 + Math.random() * 60;
      this.vel.y =  [1, -1].random() * 20 + Math.random() * 10;
      this.anims.fly.flip.x = true;
      this.boomAnim.flip.x = true;

      if(settings.direction == "left"){
        this.vel.x *= -1;
        this.anims.fly.flip.x = false;
        this.boomAnim.flip.x = false;
      }
    },

    update: function(){
      this.parent();
      var elem = this.checkCollision(ig.game.getEntitiesByType("EntityPresent"));
      if(elem){
        this.currentAnim = this.boomAnim;
        this.currentAnim.gotoFrame(1);
        elem.explode();
      }
      if(this.currentAnim == this.boomAnim){
        this.vel.y += 1;
      }
      if(this.pos.x < -300 || this.pos.y > ig.system.width + 100){
        this.kill();
      }
    },

    draw: function(){
      this.parent();
    },

    checkCollision: function(elements){
      for(var i = 0; i < elements.length; i++){
        var elem = elements[i];
        var x = elem.pos.x - this.pos.x;
        var y = elem.pos.y - this.pos.y + 10;
        if(elem.state != "exploding" && Math.sqrt(x*x + y*y) < 50){
          return elem;
        }
      }
      return false;
    }
  });
});

