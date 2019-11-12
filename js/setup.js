'use strict';

(function () {
  var userDialog = document.querySelector('.setup');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var similarListElement = userDialog.querySelector('.setup-similar-list');

  userDialog.classList.remove('hidden');


  var wizardsNames = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var wizardsSurnames = [' да Марья', ' Верон', ' Мирабелла', ' Вальц', ' Онопко', ' Топольницкая', ' Нионго', ' Ирвинг'];
  var wizardsCoatColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var wizardsEyesColors = ['black', 'red', 'blue', 'yellow', 'green'];

  var players = 4;
  var wizards = [];

  function randomData(array) {
    var data = array[Math.floor(Math.random() * array.length)];
    return data;
  }

  function wizardsGeneration() {
    for (var i = 0; i < players; i++) {
      var wizard = {};
      wizard.name = randomData(wizardsNames) + randomData(wizardsSurnames);
      wizard.coatColor = randomData(wizardsCoatColors);
      wizard.eyesColor = randomData(wizardsEyesColors);
      wizards.push(wizard);
    }
    return wizards;
  }

  function renderWizard(wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
    return wizardElement;
  }

  function showPlayers() {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < wizards.length; i++) {
      fragment.appendChild(renderWizard(wizards[i]));
    }
    similarListElement.appendChild(fragment);
    userDialog.querySelector('.setup-similar').classList.remove('hidden');
  }

  wizardsGeneration();
  showPlayers();



})();
