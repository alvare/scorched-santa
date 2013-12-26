ig.module(
  "game.santa"
)
.requires(
  "impact.entity"
)
.defines(function(){

  EntitySanta = ig.Entity.extend({

    cannonPos: { x: 20, y: 15 },
    rot_speed: 0.02,
    top_angle: -1.24,
    bottom_angle: 0.1,

    init: function(x, y, settings){
      this.parent(x, y, settings);
      this.him = new ig.Image("media/santa.png");
      this.gun = new ig.Animation(new ig.AnimationSheet("media/cannon.png", 109, 32), 1, [0]);
      this.gun.pivot.x = 15;
      this.gun.angle = -0.5;
    },

    update: function(){
      this.parent();
      this.handleRotation();
    },

    draw: function(){
      this.parent();
      this.him.draw(this.pos.x, this.pos.y);
      this.gun.draw(this.pos.x + this.cannonPos.x, this.pos.y + this.cannonPos.y);
    },

    handleRotation: function(){
      if(ig.input.state("up") && this.gun.angle > this.top_angle){
        this.gun.angle -= this.rot_speed;
      } else if(ig.input.state("down") && this.gun.angle < this.bottom_angle){
        this.gun.angle += this.rot_speed;
      } else if(ig.input.state("aim")){
        this.gun.angle = Math.atan2(ig.input.mouse.y - this.pos.y - 60, ig.input.mouse.x - this.pos.x).limit(this.top_angle, this.bottom_angle);
      }
    }
  });
});

