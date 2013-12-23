ig.module(
  "game.house"
)
.requires(
  "impact.entity",
  "game.duende"
)
.defines(function(){

  EntityHouse = ig.Entity.extend({

    animSheet: new ig.AnimationSheet("media/houses.png", 50, 50),
    chimney: new ig.Image("media/chimney.png"),

    init: function(x, y, settings){
      this.parent(x, y, settings);

      this.addAnim("idle", 1, [[0, 1, 2, 3].random()]);

      this.pos.x += Math.random() * 10 * [1, -1].random();
      this.pos.y = ig.game.floorPoints[Math.floor((this.pos.x + this.animSheet.width / 2))] - this.animSheet.height + 20;
      this.chimneyOffsetX = (this.animSheet.width - this.chimney.width) * Math.random();
      this.chimneyOffsetY = -1 * this.chimney.height + 10;
    },

    update: function(){
      this.parent();
      if(!this.duende && Math.random() > 0.998){
        this.duende = new EntityDuende(this.pos.x + this.chimneyOffsetX - 3, this.pos.y + this.chimneyOffsetY);
      }
      if(this.duende){
        this.duende.update();
        if(this.duende._killed){
          delete this.duende;
        }
      }
    },

    draw: function(){
      this.parent();
      if(this.duende){
        this.duende.draw();
      }
      this.chimney.draw(this.pos.x + this.chimneyOffsetX, this.pos.y + this.chimneyOffsetY);
    }
  });
});

