"use strict";

(function () {

  var wizards = [];

  var coatColor;
  var eyesColor;

  function getRank(wizard) {
    var rank = 0;

    if (wizard.colorCoat === coatColor) {
      rank += 2;
    }

    if (wizard.colorEyes === eyesColor) {
      rank += 1;
    }

    return rank;
  }


  function namesComparator(leftName, rightName) {
    if (leftName > rightName) {
      return 1;
    } else if (leftName < rightName) {
      return -1;
    } else {
      return 0;
    }
  }

  function wizardsComparator(left, right) {
    var rankDiff = getRank(right) - getRank(left);
    return rankDiff === 0 ? namesComparator(left.name, right.name) : rankDiff;
  }

  function updateFilter() {
    window.render(wizards.slice().sort(wizardsComparator));
  }

  window.wizard.onCoatChange = function (color) {
    coatColor = color;
    window.debounce(updateFilter.bind({}, arguments));
  };

  window.wizard.onEyesChange = function (color) {
    eyesColor = color;
    window.debounce(updateFilter);
  };

  function successHandler(data) {
    wizards = data;
    updateFilter();
  }

  function errorHandler(errorMessage) {
    var node = document.createElement('div');
    node.classList.add('error-message');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '40px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  }

  var URL = 'https://js.dump.academy/code-and-magick/data';
  window.load(URL, successHandler, errorHandler);

})();
