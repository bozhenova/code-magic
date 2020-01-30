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
  var PADDING = (CLOUD_WIDTH - 4 * BAR_WIDTH - 5 * GAP) / 2;


  var getMaxElement = function (timesArray) {
    var maxElement = 0;
    for (var i = 0; i < timesArray.length; i++) {
      if (timesArray[i] > maxElement) {
        maxElement = timesArray[i];
      }
    }
    return maxElement;
  };

  var showResultPoints = function (ctx, timesArray) {
    for (var i = 0; i < timesArray.length; i++) {
      ctx.fillStyle = '#000000';
      ctx.fillText(Math.round(timesArray[i]), CLOUD_X + GAP + (BAR_WIDTH + GAP) * i + PADDING, CLOUD_Y + FONT_GAP * 3 + POINTS_GAP * 2 + (BAR_HEIGHT - (BAR_HEIGHT * timesArray[i] / getMaxElement(timesArray))));
    }
  };

  var drawHistogramName = function (ctx, namesArray) {
    for (var i = 0; i < namesArray.length; i++) {
      ctx.fillStyle = '#000000';
      ctx.fillText(namesArray[i], CLOUD_X + GAP + (BAR_WIDTH + GAP) * i + PADDING, CLOUD_Y + FONT_GAP * 4 + POINTS_GAP * 3 + BAR_HEIGHT);
    }
  };


  var drawHistogram = function (ctx, timesArray, namesArray) {
    for (var i = 0; i < namesArray.length; i++) {
      ctx.fillStyle = namesArray[i] === 'Вы' ? '#ff0000' : 'hsl(210, ' + Math.round(Math.random() * 100) + '%, 50%)';
      var HISTOGRAM_X = CLOUD_X + GAP + (BAR_WIDTH + GAP) * i + PADDING;
      var HISTOGRAM_Y = CLOUD_Y + FONT_GAP * 3 + POINTS_GAP * 3 + (BAR_HEIGHT - (BAR_HEIGHT * timesArray[i] / getMaxElement(timesArray)));
      ctx.fillRect(HISTOGRAM_X, HISTOGRAM_Y, BAR_WIDTH, BAR_HEIGHT * timesArray[i] / getMaxElement(timesArray));
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


    drawHistogram(ctx, times, names);
    showResultPoints(ctx, times);
    drawHistogramName(ctx, names);
  };

})();

