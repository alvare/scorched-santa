ig.module(
  "game.fireworks"
)
.requires(
  "impact.entity"
)
.defines(function(){

  EntityFireworks = ig.Entity.extend({

    animSheet: new ig.AnimationSheet("media/fireworks.png", 70, 70),

    init: function(x, y, settings){
      this.parent(x, y, settings);

      this.addAnim("boom", 0.1, [0,1,2,3,4,5,6], true);
    },

    update: function(){
      this.parent();
      if(this.currentAnim.loopCount > 0){
        this.kill();
      }
    },

    draw: function(){
      this.parent();
    }
  });
});

