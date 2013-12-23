ig.module(
  "game.duende"
)
.requires(
  "impact.entity"
)
.defines(function(){

  EntityDuende = ig.Entity.extend({

    animSheet: new ig.AnimationSheet("media/duende.png", 20, 25),
    downSpeed: 0.5,
    grabDistance: 25,
    lookTime: 4,

    init: function(x, y, settings){
      this.parent(x, y, settings);

      this.addAnim("up", 0.6, [0,1,2], true);
      this.addAnim("down", 0.6, [2,1,0], true);
      this.addAnim("look", 0.4, [3,3,4,5,6,7,7,6,5,4]);
      this.addAnim("grab", 1, [8]);

      this.originalY = this.pos.y;
      this.timer = new ig.Timer();
      this.score = parseInt(this.pos.y/ig.system.width * 10);
      this.present = null;
    },

    update: function(){
      this.parent();
      if(this.currentAnim == this.anims.up){
        if(this.currentAnim.loopCount > 0){
          this.currentAnim = this.anims.look;
          this.currentAnim.gotoFrame(1);
          this.timer.set(this.lookTime);
        } else if(this.pos.y > this.originalY - 25){
          this.pos.y -= 0.5;
        }
      } else if(this.currentAnim == this.anims.look){
        this.present = this.checkCollision(ig.game.getEntitiesByType("EntityPresent"));
        if(this.present){
          this.currentAnim = this.anims.grab;
          this.present.freeze()
          ig.game.incScore(Math.floor(5 * this.pos.x / ig.system.width));
        } else if(this.timer.delta() > 0){
          this.currentAnim = this.anims.down;
          this.currentAnim.gotoFrame(1);
        }
      } else if(this.currentAnim == this.anims.down){
        if(this.pos.y < this.originalY){
          this.pos.y += this.downSpeed;
        } else {
          this.kill();
        }
      } else if(this.currentAnim == this.anims.grab){
        if(this.pos.y < this.originalY){
          this.pos.y += this.downSpeed;
          this.present.pos.y += this.downSpeed;
        } else {
          this.kill();
          this.present.kill();
        }
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
        if(elem.state != "exploding" && Math.sqrt(x*x + y*y) < this.grabDistance){
          return elem;
        }
      }
      return false;
    }
  });
});

