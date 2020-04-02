"use strict";

(function () {
  const setup = document.querySelector(".setup");
  const setupWizard = setup.querySelector('.setup-wizard');
  const wizardCoat = setupWizard.querySelector('.wizard-coat');
  const wizardEyes = setupWizard.querySelector('.wizard-eyes');
  const setupFireball = setup.querySelector('.setup-fireball-wrap');
  const coatColorInput = setup.querySelector('input[name="coat-color"]');
  const eyesColorInput = setup.querySelector('input[name="eyes-color"]');
  const fireballColorInput = setup.querySelector('input[name="fireball-color"]');


  const wizard = {
    onEyesChange: function (color) {
      return color;
    },
    onCoatChange: function (color) {
      return color;
    }
  };



  const fireballColors = ["#ee4830", "#30a8ee", "#5ce6c0", "#e848d5", "#e6e848"];

  const wizardsCoatColors = [
    'rgb(146, 100, 161)',
    'rgb(215, 210, 55)',
    'rgb(241, 43, 107)',
    'rgb(101, 137, 164)',
    'rgb(0, 0, 0)',
    'rgb(215, 210, 55)',
    'rgb(56, 159, 117)',
    'rgb(241, 43, 107)'
  ];


  const wizardsEyesColors = [
    'red',
    'orange',
    'yellow',
    'green',
    'lightblue',
    'white',
    'blue',
    'purple'
  ];


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
    const data = array[Math.floor(Math.random() * array.length)];
    return data;
  }

  function colorizeWizard(e, elem, colors) {
    const newColor = getRandomData(colors);
    elem.setAttribute("value", newColor);
    if (e.currentTarget.matches('.setup-fireball-wrap')) {
      e.currentTarget.style.background = newColor;
    } else {
      e.target.style = `fill: ${newColor}`;
    }
    elem === coatColorInput ? wizard.onCoatChange(newColor) :
      wizard.onEyesChange(newColor);
  }

  const form = setup.querySelector('.setup-wizard-form');
  form.addEventListener('submit', e => {
    window.save(new FormData(form), function () {
      setup.classList.add('hidden');
    }, errorHandler);
    e.preventDefault();
  });


  function errorHandler(errorMessage) {
    const node = document.createElement('div');
    node.classList.add('error-message');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '40px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  }

  window.wizard = wizard;

})();
