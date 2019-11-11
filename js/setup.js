'use strict';

(function () {
  var userDialog = document.querySelector('.setup');
  userDialog.classList.remove('hidden');

  document.querySelector('.setup-similar').classList.remove('hidden');

  var similarListElement = document.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  var wizardNames = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var wizardSurnames = [' да Марья', ' Верон', ' Мирабелла', ' Вальц', ' Онопко', ' Топольницкая', ' Нионго', ' Ирвинг'];
  var wizardCoatColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var wizardEyesColors = ['black', 'red', 'blue', 'yellow', 'green'];

  var players = 4;
  var wizards = [];

  function randomNum(array) {
    return Math.round(Math.random() * (array.length - 1));
  }

  function wizardsGeneration() {
    for (var i = 0; i < players; i++) {
      var wizard = {};
      wizard.name = wizardNames[randomNum(wizardNames)] + wizardSurnames[randomNum(wizardSurnames)];
      wizard.coatColor = wizardCoatColors[randomNum(wizardCoatColors)];
      wizard.eyesColor = wizardEyesColors[randomNum(wizardEyesColors)];
      wizards.push(wizard);
    }
  }

  wizardsGeneration();
  console.log(wizards);

})();
