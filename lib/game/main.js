ig.module(
  "game.main"
)
.requires(
  "impact.game",
  "impact.entity",
  "game.santa",
  "game.present",
  "game.terrain",
  "game.house",
  "game.plane"
)
.defines(function(){

  GLOBAL = {
    GRAVITY: 3,
    TERRAIN: {
      AMPLITUDE: 600,
      DIVISOR: 200,
      TOPCOLOR: "#EEFF30",
      BOTTOMCOLOR: "#56CA40"
    }
  };

  if(ig.ua.mobile){
    ig.Sound.enabled = false;
  }

  ig.Input.inject({
    bindTouch: function(selector, action) {
      var element = ig.$( selector );
      var that = this;
      element.addEventListener('mousedown', function(ev) {that.touchStart( ev, action );}, false);
      element.addEventListener('mouseup', function(ev) {that.touchEnd( ev, action );}, false);
      this.parent(selector, action);
    },
  });

  GameScorchedSanta = ig.Game.extend({
    clearColor: "#649FDF",

    // custom
    paused: false,
    santaPos: { x: 0, y: 350 },
    charge: 0,
    chargeSpeed: 0.02,
    charging: false,
    chargeWidth: 20,
    lastCharge: 0,
    score: 0,

    init: function(){
      ig.input.bind(ig.KEY.UP_ARROW, "up");
      ig.input.bind(ig.KEY.DOWN_ARROW, "down");
      ig.input.bind(ig.KEY.SPACE, "shoot");
      ig.input.bind(ig.KEY.MOUSE1, "aim");

      this.santa = this.spawnEntity(EntitySanta, this.santaPos.x, this.santaPos.y);
      this.terrain = this.spawnEntity(EntityTerrain, 0, 0);

      Prng.seed = Math.random() * 500;
      Perlin.setRng(Prng);
      Perlin.noiseDetail(5, 0.1)
      this.floorPoints = _.map(_.range(ig.system.width), function(x){
        return ig.system.height - (x/ig.system.width) * GLOBAL.TERRAIN.AMPLITUDE*Perlin.noise(x/GLOBAL.TERRAIN.DIVISOR);
      });

      this.houses = [];
      var houseOffsetA = 200;
      var houseOffsetB = 100;
      var houseCount = 10;
      var positionsX = this.takeNfrom(6, _.range(houseOffsetA, ig.system.width - houseOffsetB + 1, (ig.system.width - houseOffsetA - houseOffsetB) / houseCount));
      for(var x = 0; x < houseCount; x++){
        this.houses.push(this.spawnEntity(EntityHouse, positionsX[x]));
      }

      this.time = new ig.Timer();
      this.time.set(60);

      $("canvas").trigger("start");
    },

    takeNfrom: function(n, array){
      var result = [];
      for(var i = 0; i < n; i++){
        var item = array.random();
        _.pull(array, item);
        result.push(item);
      }
      return result;
    },

    update: function(){
      if(this.paused) return;
      this.parent();

      this.updateChargeBar();

      if(Math.random() > 0.998){
        this.spawnPlane();
      }

      if(ig.input.pressed("shoot") || ig.input.pressed("aim")){
        this.charging = true;
      } else if((ig.input.released("shoot") || ig.input.released("aim")) && this.charging){
        var settings = { angle: this.santa.gun.angle, cannonPos: this.santa.cannonPos, charge: this.charge };
        this.spawnEntity(EntityPresent, this.santaPos.x, this.santaPos.y, settings);

        this.charging = false;
        this.lastCharge = this.charge;
        this.charge = 0;
      }

      if(this.time.delta() > 0){
        $("canvas").trigger("end");
        this.paused = true;
      }
    },

    draw: function(){
      this.parent();
      this.drawChargeBar();

      if(this.paused){
        ig.system.context.fillStyle = "rgba(0,0,0,0.5)";
        ig.system.context.fillRect(0, 0, ig.system.width, ig.system.height);
      };
    },

    updateChargeBar: function(){
      if(this.charging && this.charge < 1){
        this.charge += this.chargeSpeed;
      }
    },

    drawChargeBar: function(){
      // bar
      ig.system.context.fillStyle = "rgba(200,50,50,0.7)";
      ig.system.context.fillRect(0, ig.system.height - this.chargeWidth, ig.system.width * this.charge, this.chargeWidth);

      // white thing
      ig.system.context.fillStyle = "white";
      ig.system.context.fillRect(this.lastCharge * ig.system.width, ig.system.height - this.chargeWidth, 2, this.chargeWidth);
    },

    incScore: function(score){
      this.score += score;
      $("canvas").trigger("updatehud");
    },

    spawnPlane: function(){
      if(Math.random() > 0.5){
        this.spawnEntity(EntityPlane, ig.system.width, this.floorPoints[ig.system.width - 1] * Math.random(), { direction: "left" });
      } else {
        this.spawnEntity(EntityPlane, -200, this.santaPos.y * Math.random(), { direction: "right" });
      }
    }
  });

  //ig.main("#canvas", GameScorchedSanta, 60, 900, 600, 1);
});
