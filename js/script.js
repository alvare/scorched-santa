$(function(){
  var updateTimeLoop;

  $("canvas").on("start", function(){
    updateTimeLoop = setInterval(updateTime, 500);
  });

  $("canvas").on("updatehud", function(){
    $("#score").html(ig.game.score);
  });

  $("canvas").on("end", function(){
    clearInterval(updateTimeLoop);
    $("#end").removeClass("hidden");
    $(".winscore").numberTo(ig.game.score);
    setTimeout(function(){
      $("#end").addClass("active");
      $(".wintext").addClass("active");
    });
  });

  $("#play").on("click", startFn);

  $("#playagain").on("click", startAgain);

  function updateTime(){
    var time = -1 * parseInt(ig.game.time.delta());
    $("#time").html(time);
  }

  function startFn(){
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
    var delay = 1;
    var $that = $(this);
    var clk = setInterval(clock, 100);

    function update(){
      $that.html(parseInt(Math.random() * 500));
      if(delay > 900){
        $that.html(n);
        clearInterval(clk);
      } else {
        setTimeout(update, delay);
      }
    }
    update();

    function clock(){
      delay *= 1.2;
    }
  };
})(jQuery);
