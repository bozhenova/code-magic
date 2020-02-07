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
    elem.setAttribute("value", getRandomData(colors));
    if (e.target === e.currentTarget) {
      e.target.style = `fill: ${elem.getAttribute('value')}`;
    } else {
      e.currentTarget.style.background = elem.getAttribute('value');
    }
  }

  var form = userDialog.querySelector('.setup-wizard-form');
  form.addEventListener('submit', e => {
    window.save(new FormData(form), function () {
      userDialog.classList.add('hidden');
    }, errorHandler);
    e.preventDefault();
  });

  function renderWizard(wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector(".setup-similar-label").textContent =
      wizard.name;
    wizardElement.querySelector(".wizard-coat").style.fill = wizard.colorCoat;
    wizardElement.querySelector(".wizard-eyes").style.fill = wizard.colorEyes;

    return wizardElement;
  }

  function successHandler(wizards) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < 4; i++) {
      var wizard = renderWizard(getRandomData(wizards));
      fragment.appendChild(wizard);
    }
    similarList.appendChild(fragment);
    userDialog.querySelector('.setup-similar').classList.remove('hidden');
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

  window.load(successHandler, errorHandler);



})();
