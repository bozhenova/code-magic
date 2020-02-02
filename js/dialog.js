"use strict";

(function () {
  var userDialog = document.querySelector(".setup");
  var dialogHandle = userDialog.querySelector(".upload");
  var setupOpen = document.querySelector('.setup-open');
  var setupUserName = userDialog.querySelector('.setup-user-name');
  var setupClose = userDialog.querySelector('.setup-close');
  var baseCoords = {
    x: userDialog.style.left,
    y: userDialog.style.top
  };

  openPopup();

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
    userDialog.classList.remove('hidden');
    userDialog.querySelector(".setup-similar").classList.remove("hidden");
    document.addEventListener('keydown', escapePressHandler);
  }

  function closePopup() {
    userDialog.classList.add('hidden');
    document.removeEventListener('keydown', escapePressHandler);
    userDialog.style.top = baseCoords.y;
    userDialog.style.left = baseCoords.x;
  }

  function escapePressHandler(e) {
    if (e.code === 'Escape' && document.activeElement !== setupUserName) {
      closePopup();
    }
  }

  dialogHandle.addEventListener('mousedown', e => {
    e.preventDefault();
    var dragged = false;

    var startCoords = {
      x: e.clientX,
      y: e.clientY
    };

    function mouseMoveHandler(e) {
      e.preventDefault();
      dragged = true;

      var shift = {
        x: startCoords.x - e.clientX,
        y: startCoords.y - e.clientY
      };

      startCoords = {
        x: e.clientX,
        y: e.clientY
      }

      userDialog.style.top = (userDialog.offsetTop - shift.y) + 'px';
      userDialog.style.left = (userDialog.offsetLeft - shift.x) + 'px';
    }

    function mouseUpHandler(e) {
      e.preventDefault();
      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);

      if (dragged) {
        var clickPreventDefaultHandler = function (e) {
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
    var target = e.target;
    if (target.value.length < 2) {
      target.setCustomValidity('Имя должно состоять минимум из 2-х символов');
    } else {
      target.setCustomValidity('');
    }
  });

})();
