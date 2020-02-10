"use strict";

(function () {
  const setup = document.querySelector(".setup");
  const userPic = setup.querySelector('.setup-user-pic');
  const inputAvatar = setup.querySelector('input[name="avatar"]');


  inputAvatar.addEventListener('change', uploadImage);

  function uploadImage() {
    if (this.files && this.files[0]) {
      userPic.src = URL.createObjectURL(this.files[0]);
      userPic.onload = () => {
        URL.revokeObjectURL(this.src);
      }
    }
  }



})();
