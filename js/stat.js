'use strict';

(function () {
  var CLOUD_X = 100;
  var CLOUD_Y = 10;
  var SHADOW_GAP = 10;
  var CLOUD_WIDTH = 420;
  var CLOUD_HEIGHT = 270;
  var BAR_WIDTH = 40;
  var BAR_HEIGHT = 150;
  var NAME_Y = 260;
  var GAP = 50;
  var FONT_GAP = 20;
  var POINTS_GAP = 10;
  var maxTime = 0;

  var findMaxTime = function (timesArray) {
    for (var i = 0; i < timesArray.length; i++) {
      if (timesArray[i] > maxTime) {
        maxTime = timesArray[i];
      }
    }
    return maxTime;
  };

  var showResultPoints = function (timesArray, ctx) {
    for (var i = 0; i < timesArray.length; i++) {
      ctx.fillText(Math.round(timesArray[i]), CLOUD_X + BAR_WIDTH + i * (BAR_WIDTH + GAP), NAME_Y - FONT_GAP - POINTS_GAP - (BAR_HEIGHT * timesArray[i] / maxTime));
    }
  };

  var getRandomBlueColor = function (ctx) {
    ctx.fillStyle = 'hsl(205, ' + Math.round(Math.random() * 100) + '%, 50%)';
  };

  window.renderStatistics = function (ctx, names, times) {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(CLOUD_X + SHADOW_GAP, CLOUD_Y + SHADOW_GAP, CLOUD_WIDTH, CLOUD_HEIGHT);

    ctx.fillStyle = '#fff';
    ctx.fillRect(CLOUD_X, CLOUD_Y, CLOUD_WIDTH, CLOUD_HEIGHT);

    ctx.font = '16px PT Mono';
    ctx.fillStyle = '#000000';
    ctx.fillText('Ура вы победили!', 120, 40);
    ctx.fillText('Список результатов:', 120, 60);

    maxTime = times[0];

    findMaxTime(times);

    showResultPoints(times, ctx);

    var drawGistogram = function () {
      var GISTOGRAM_X = CLOUD_X + BAR_WIDTH + (BAR_WIDTH + GAP) * i;
      var GISTOGRAM_Y = NAME_Y - FONT_GAP - (BAR_HEIGHT * times[i] / maxTime);
      ctx.fillRect(GISTOGRAM_X, GISTOGRAM_Y, BAR_WIDTH, BAR_HEIGHT * times[i] / maxTime);
    };

    var drawGistogramName = function () {
      ctx.fillText(names[i], CLOUD_X + BAR_WIDTH + (BAR_WIDTH + GAP) * i, NAME_Y);
    };

    for (var i = 0; i < names.length; i++) {
      ctx.fillStyle = (names[i] === 'Вы') ? 'rgba(255, 0, 0, 1)' : 'hsl(205, ' + Math.round(Math.random() * 100) + '%, 50%)';

    }

  };

  drawGistogram();
  ctx.fillStyle = '#000000';
  drawGistogramName();
})();
