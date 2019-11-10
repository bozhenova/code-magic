'use strict';

(function () {
  var CLOUD_X = 100;
  var CLOUD_Y = 10;
  var SHADOW_GAP = 10;
  var CLOUD_WIDTH = 420;
  var CLOUD_HEIGHT = 270;
  var BAR_WIDTH = 40;
  var BAR_HEIGHT = 150;
  var GAP = 50;
  var FONT_GAP = 20;
  var POINTS_GAP = 10;


  var getMaxElement = function (timesArray) {
    var maxElement = 0;
    for (var i = 0; i < timesArray.length; i++) {
      if (timesArray[i] > maxElement) {
        maxElement = timesArray[i];
      }
    }
    return maxElement;
  };

  var showResultPoints = function (timesArray, ctx) {
    for (var i = 0; i < timesArray.length; i++) {
      ctx.fillText(Math.round(timesArray[i]), CLOUD_X + BAR_WIDTH + i * (BAR_WIDTH + GAP), CLOUD_Y + FONT_GAP * 3 + POINTS_GAP * 2 + (BAR_HEIGHT - (BAR_HEIGHT * timesArray[i] / getMaxElement(timesArray))));
    }
  };

  var drawGistogramName = function (namesArray, ctx) {
    for (var i = 0; i < namesArray.length; i++) {
      ctx.fillText(namesArray[i], CLOUD_X + BAR_WIDTH + (BAR_WIDTH + GAP) * i, CLOUD_Y + FONT_GAP * 4 + POINTS_GAP * 3 + BAR_HEIGHT);
    }
  };


  var drawGistogram = function (timesArray, namesArray, ctx) {
    for (var i = 0; i < namesArray.length; i++) {
      ctx.fillStyle = namesArray[i] === 'Вы' ? '#fc0707' : 'hsl(205, ' + Math.round(Math.random() * 100) + '%, 50%)';
      var GISTOGRAM_X = CLOUD_X + BAR_WIDTH + (BAR_WIDTH + GAP) * i;
      var GISTOGRAM_Y = CLOUD_Y + FONT_GAP * 3 + POINTS_GAP * 3 + (BAR_HEIGHT - (BAR_HEIGHT * timesArray[i] / getMaxElement(timesArray)));
      ctx.fillRect(GISTOGRAM_X, GISTOGRAM_Y, BAR_WIDTH, BAR_HEIGHT * timesArray[i] / getMaxElement(timesArray));
    }
  };

  var renderCloud = function (ctx, x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
  };


  window.renderStatistics = function (ctx, names, times) {
    renderCloud(ctx, CLOUD_X + SHADOW_GAP, CLOUD_Y + SHADOW_GAP, 'rgba(0, 0, 0, 0.7)');
    renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

    ctx.font = '16px PT Mono';
    ctx.fillStyle = '#000000';
    ctx.fillText('Ура вы победили!', CLOUD_X + FONT_GAP, CLOUD_Y + FONT_GAP + POINTS_GAP);
    ctx.fillText('Список результатов:', CLOUD_X + FONT_GAP, CLOUD_Y + FONT_GAP * 2 + POINTS_GAP);


    showResultPoints(times, ctx);
    drawGistogramName(names, ctx);
    drawGistogram(times, names, ctx);
  };

})();

