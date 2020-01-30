"use strict";

(function () {
  var userDialog = document.querySelector(".setup");
  userDialog.classList.remove("hidden");
  var similarWizardTemplate = document
    .getElementById("similar-wizard-template")
    .content.querySelector(".setup-similar-item");
  var similarList = userDialog.querySelector(".setup-similar-list");

  var wizardsNames = [
    "Иван",
    "Хуан Себастьян",
    "Мария",
    "Кристоф",
    "Виктор",
    "Юлия",
    "Люпита",
    "Вашингтон"
  ];

  var wizardsSurnames = [
    " да Марья",
    " Верон",
    " Мирабелла",
    " Вальц",
    " Онопко",
    " Топольницкая",
    " Нионго",
    " Ирвинг"
  ];

  var wizardsCoatColors = [
    "rgb(101, 137, 164)",
    "rgb(241, 43, 107)",
    "rgb(146, 100, 161)",
    "rgb(56, 159, 117)",
    "rgb(215, 210, 55)",
    "rgb(0, 0, 0)"
  ];

  var wizardsEyesColors = ["black", "red", "blue", "yellow", "green"];

  var players = 4;


  function getRandomData(array) {
    var data = array[Math.floor(Math.random() * array.length)];
    return data;
  }

  function wizardsGeneration() {
    var wizardsArray = [];
    for (var i = 0; i < players; i++) {
      var wizard = {};
      wizard.name = getRandomData(wizardsNames) + getRandomData(wizardsSurnames);
      wizard.coatColor = getRandomData(wizardsCoatColors);
      wizard.eyesColor = getRandomData(wizardsEyesColors);
      wizardsArray.push(wizard);
    }
    return wizardsArray;
  }

  function renderWizard(wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector(".setup-similar-label").textContent =
      wizard.name;
    wizardElement.querySelector(".wizard-coat").style.fill = wizard.coatColor;
    wizardElement.querySelector(".wizard-eyes").style.fill = wizard.eyesColor;

    return wizardElement;
  }

  function showWizards() {
    var fragment = document.createDocumentFragment();
    var wizards = wizardsGeneration();
    for (var i = 0; i < wizards.length; i++) {
      var wizard = renderWizard(wizards[i]);
      fragment.appendChild(wizard);
    }
    similarList.appendChild(fragment);
    userDialog.querySelector(".setup-similar").classList.remove("hidden");
  }

  showWizards();
})();
