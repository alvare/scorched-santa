ig.module( 
	"game.terrain" 
)
.requires(
	"impact.entity"
)
.defines(function(){

  EntityTerrain = ig.Entity.extend({

    init: function(x, y, settings){
    },

    update: function(){
    },

    draw: function(){
      ctx = ig.system.context;

      ctx.beginPath();
      ctx.moveTo(0, ig.system.height);
      for(var x = 0; x < ig.system.width; x++){
        ctx.lineTo(x, ig.game.floorPoints[x]);
      }

      //GLOBAL.TERRAIN.TOPCOLOR = document.getElementById("test").style.backgroundColor;
      //GLOBAL.TERRAIN.BOTTOMCOLOR = document.getElementById("test").style.color;

      var grd = ctx.createLinearGradient(ig.system.width/2, 0, ig.system.width/2, ig.system.height);
      grd.addColorStop(0, GLOBAL.TERRAIN.TOPCOLOR);
      grd.addColorStop(1, GLOBAL.TERRAIN.BOTTOMCOLOR);
      ctx.fillStyle = grd;
      ctx.strokeStyle = "rgba(0, 0, 0, 1)";

      ctx.stroke();
      ctx.lineTo(ig.system.width, ig.system.height);
      ctx.fill();
    }
  });
});

