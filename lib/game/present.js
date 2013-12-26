ig.module(
  "game.present"
)
.requires(
  "impact.entity",
  "game.fireworks"
)
.defines(function(){

  EntityPresent = ig.Entity.extend({

    amp: 500,
    maxVel: { x: 1000, y: 1000 },
    animSheet: new ig.AnimationSheet("media/present.png", 42, 42),

    init: function(x, y, settings){
      this.parent(x, y, settings);
      this.addAnim("idle", 1, [[0, 1].random()]);
      this.addAnim("boom", 0.1, _.range(13, 3*14), true);

      // cannonLength = 109
      this.pos.x = x + Math.cos(settings.angle) * 109 + settings.cannonPos.x;
      this.pos.y = y + Math.sin(settings.angle) * 109 + settings.cannonPos.y;
      this.vel.x = Math.cos(settings.angle) * this.amp * settings.charge;
      this.vel.y = Math.sin(settings.angle) * this.amp * settings.charge;
      this.rot_speed = (Math.random() / 10) * [1, -1].random();

      this.state = "falling";
    },

    update: function(){
      if(this.state == "falling"){
        this.currentAnim.angle += this.rot_speed;
        this.vel.y += GLOBAL.GRAVITY;

        if(this.pos.y + this.currentAnim.sheet.height/1.2 > ig.game.floorPoints[Math.floor(this.pos.x)] || this.pos.y > ig.system.height){
          this.explode();
        }
      } else if (this.state == "exploding"){
        this.vel.y = 0;
        this.vel.x = 0;
        if(this.currentAnim.loopCount > 0){
          this.kill();
        }
      } else if (this.state == "frozen"){
        this.vel.y = 0;
        this.vel.x = 0;
      }

      this.parent();
    },

    draw: function(){
      this.parent();
    },

    freeze: function(){
      this.state = "frozen";
      ig.game.spawnEntity(EntityFireworks, this.pos.x, this.pos.y);
    },

    explode: function(){
      this.state = "exploding";
      this.currentAnim = this.anims.boom;
      this.currentAnim.gotoFrame(1);
    }
  });
});

