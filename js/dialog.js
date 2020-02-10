"use strict";

(function () {
  const setup = document.querySelector(".setup");
  const dialogHandle = setup.querySelector(".upload");
  const setupOpen = document.querySelector('.setup-open');
  const setupUserName = setup.querySelector('.setup-user-name');
  const setupClose = setup.querySelector('.setup-close');
  const baseCoords = {
    x: setup.style.left,
    y: setup.style.top
  };

  setupOpen.addEventListener('click', openPopup);

  setupOpen.addEventListener('keydown', e => {
    if (e.code === 'Enter') {
      openPopup();
    }
  });

  setupClose.addEventListener('click', closePopup)

  setupClose.addEventListener('keydown', e => {
    if (e.code === 'Enter') {
      closePopup();
    }
  });

  function openPopup() {
    setup.classList.remove('hidden');
    setup.querySelector(".setup-similar").classList.remove("hidden");
    document.addEventListener('keydown', escapePressHandler);
  }

  function closePopup() {
    setup.classList.add('hidden');
    document.removeEventListener('keydown', escapePressHandler);
    setup.style.top = baseCoords.y;
    setup.style.left = baseCoords.x;
  }

  function escapePressHandler(e) {
    if (e.code === 'Escape' && document.activeElement !== setupUserName) {
      closePopup();
    }
  }

  dialogHandle.addEventListener('mousedown', e => {
    e.preventDefault();
    let dragged = false;

    let startCoords = {
      x: e.clientX,
      y: e.clientY
    };

    function mouseMoveHandler(e) {
      e.preventDefault();
      dragged = true;

      const shift = {
        x: startCoords.x - e.clientX,
        y: startCoords.y - e.clientY
      };

      startCoords = {
        x: e.clientX,
        y: e.clientY
      }

      setup.style.top = (setup.offsetTop - shift.y) + 'px';
      setup.style.left = (setup.offsetLeft - shift.x) + 'px';
    }

    function mouseUpHandler(e) {
      e.preventDefault();
      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);

      if (dragged) {
        const clickPreventDefaultHandler = function (e) {
          e.preventDefault();
          dialogHandle.removeEventListener('click', clickPreventDefaultHandler);
        }
        dialogHandle.addEventListener('click', clickPreventDefaultHandler);
      }
    }

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  })

  setupUserName.addEventListener('invalid', function () {
    if (setupUserName.validity.tooShort) {
      setupUserName.setCustomValidity('Имя должно состоять минимум из 2-х символов');
    } else if (setupUserName.validity.tooLong) {
      setupUserName.setCustomValidity('Имя не должно превышать 25-ти символов');
    } else if (setupUserName.validity.valueMissing) {
      setupUserName.setCustomValidity('Обязательное поле');
    } else {
      setupUserName.setCustomValidity('');
    }
  });

  setupUserName.addEventListener('input', e => {
    const target = e.target;
    if (target.value.length < 2) {
      target.setCustomValidity('Имя должно состоять минимум из 2-х символов');
    } else {
      target.setCustomValidity('');
    }
  });

})();

