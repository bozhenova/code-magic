"use strict";

(function () {
  var userDialog = document.querySelector(".setup");
  var similarWizardTemplate = document
    .getElementById("similar-wizard-template")
    .content.querySelector(".setup-similar-item");
  var similarList = userDialog.querySelector(".setup-similar-list");
  var setupWizard = userDialog.querySelector('.setup-wizard');
  var wizardCoat = setupWizard.querySelector('.wizard-coat');
  var wizardEyes = setupWizard.querySelector('.wizard-eyes');
  var setupFireball = userDialog.querySelector('.setup-fireball-wrap');
  var coatColorInput = userDialog.querySelector('input[name="coat-color"]');
  var eyesColorInput = userDialog.querySelector('input[name="eyes-color"]');
  var fireballColorInput = userDialog.querySelector('input[name="fireball-color"]');


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

  var fireballColors = ["#ee4830", "#30a8ee", "#5ce6c0", "#e848d5", "#e6e848"];

  var wizardsEyesColors = ["black", "red", "blue", "yellow", "green"];

  var players = 4;

  renderWizards();


  wizardCoat.addEventListener('click', e => {
    colorizeWizard(e, coatColorInput, wizardsCoatColors);
  });

  wizardEyes.addEventListener('click', e => {
    colorizeWizard(e, eyesColorInput, wizardsEyesColors);
  });

  setupFireball.addEventListener('click', e => {
    colorizeWizard(e, fireballColorInput, fireballColors);
  });


  function getRandomData(array) {
    var data = array[Math.floor(Math.random() * array.length)];
    return data;
  }

  function colorizeWizard(e, elem, colors) {
    console.log(e.target);
    console.log(e.currentTarget);
    elem.setAttribute("value", getRandomData(colors));
    if (e.target === e.currentTarget) {
      e.target.style = `fill: ${elem.getAttribute('value')}`;
    } else {
      e.currentTarget.style.background = elem.getAttribute('value');
    }
  }

  function createWizards() {
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

  function renderWizards() {
    var fragment = document.createDocumentFragment();
    var wizards = createWizards();
    for (var i = 0; i < wizards.length; i++) {
      var wizard = renderWizard(wizards[i]);
      fragment.appendChild(wizard);
    }
    similarList.appendChild(fragment);
  }


})();
