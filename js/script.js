$(function(){
  $("canvas").on("updatehud", function(){
    $("#score").html(ig.game.score);
  });

  $("canvas").on("end", function(){
    ig.game.paused = true;
    $("#end").removeClass("hidden");
    $(".winscore").numberTo(ig.game.score);
    setTimeout(function(){
      $("#end").addClass("active");
      $(".wintext").addClass("active");
    });
  });

  $("canvas").on("start", function(){
    ig.game.time.set(60);
    updateTime();
  });

  function updateTime(){
    var time = -1 * parseInt(ig.game.time.delta());
    $("#time").html(time);
    if(time <= 0){
      $("canvas").trigger("end");
    } else {
      setTimeout(updateTime, 500);
    }
  }

  $("#play").on("click", start);

  $("#playagain").on("click", startAgain);

  function start(){
    $("#start").addClass("hidden");
    ig.main("#canvas", GameScorchedSanta, 60, 900, 600, 1);
  }

  function startAgain(){
    $("#end").addClass("hidden");
    $("#end").removeClass("active");
    $(".wintext").removeClass("active");
    ig.system.setGame(GameScorchedSanta);
  }
});

(function($){
  $.fn.numberTo = function(n){
    var delay = 5;
    var $that = $(this);
    function update(){
      $that.html(parseInt(Math.random() * 500));
      if(delay > 900){
        $that.html(n);
      } else {
        setTimeout(update, delay);
      }
    }
    update();

    function clock(){
      delay *= 1.1;
      setTimeout(clock, 100);
    }
    clock();
  };
})(jQuery);
