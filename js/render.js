"use strict";

(function () {

  const similarWizardTemplate = document
    .getElementById("similar-wizard-template")
    .content;
  const similar = document.querySelector('.setup-similar');
  const similarList = document.querySelector('.setup-similar-list');

  function renderWizard(wizard) {
    const wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector(".setup-similar-label").textContent =
      wizard.name;
    wizardElement.querySelector(".wizard-coat").style.fill = wizard.colorCoat;
    wizardElement.querySelector(".wizard-eyes").style.fill = wizard.colorEyes;

    return wizardElement;
  }

  window.render = (data) => {
    const takeNumber = data.length > 4 ? 4 : data.length;
    similarList.innerHTML = '';
    for (let i = 0; i < takeNumber; i++) {
      similarList.appendChild(renderWizard(data[i]));
    }
    similar.classList.remove('hidden');
  };




})();
