'use strict';

(function () {
  const CLOUD_X = 100;
  const CLOUD_Y = 10;
  const SHADOW_GAP = 10;
  const CLOUD_WIDTH = 420;
  const CLOUD_HEIGHT = 270;
  const BAR_WIDTH = 40;
  const BAR_HEIGHT = 150;
  const GAP = 50;
  const FONT_GAP = 20;
  const POINTS_GAP = 10;
  const PADDING = (CLOUD_WIDTH - 4 * BAR_WIDTH - 5 * GAP) / 2;


  const getMaxElement = function (timesArray) {
    let maxElement = 0;
    for (let i = 0; i < timesArray.length; i++) {
      if (timesArray[i] > maxElement) {
        maxElement = timesArray[i];
      }
    }
    return maxElement;
  };

  const showResultPoints = function (ctx, timesArray) {
    for (let i = 0; i < timesArray.length; i++) {
      ctx.fillStyle = '#000000';
      ctx.fillText(Math.round(timesArray[i]), CLOUD_X + GAP + (BAR_WIDTH + GAP) * i + PADDING, CLOUD_Y + FONT_GAP * 3 + POINTS_GAP * 2 + (BAR_HEIGHT - (BAR_HEIGHT * timesArray[i] / getMaxElement(timesArray))));
    }
  };

  const drawHistogramName = function (ctx, namesArray) {
    for (let i = 0; i < namesArray.length; i++) {
      ctx.fillStyle = '#000000';
      ctx.fillText(namesArray[i], CLOUD_X + GAP + (BAR_WIDTH + GAP) * i + PADDING, CLOUD_Y + FONT_GAP * 4 + POINTS_GAP * 3 + BAR_HEIGHT);
    }
  };


  const drawHistogram = function (ctx, timesArray, namesArray) {
    for (let i = 0; i < namesArray.length; i++) {
      ctx.fillStyle = namesArray[i] === 'Вы' ? '#ff0000' : 'hsl(210, ' + Math.round(Math.random() * 100) + '%, 50%)';
      const HISTOGRAM_X = CLOUD_X + GAP + (BAR_WIDTH + GAP) * i + PADDING;
      const HISTOGRAM_Y = CLOUD_Y + FONT_GAP * 3 + POINTS_GAP * 3 + (BAR_HEIGHT - (BAR_HEIGHT * timesArray[i] / getMaxElement(timesArray)));
      ctx.fillRect(HISTOGRAM_X, HISTOGRAM_Y, BAR_WIDTH, BAR_HEIGHT * timesArray[i] / getMaxElement(timesArray));
    }
  };

  const renderCloud = function (ctx, x, y, color) {
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

