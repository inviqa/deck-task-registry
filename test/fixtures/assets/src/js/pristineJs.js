(function (Drupal) {
  'use strict';

  Drupal.behaviors.pristine = {

    attach: function (context) {

      var button = context.querySelector('.button');
      var body = context.querySelector('body');

      button.addEventListener('click', function (e) {
        e.preventDefault();
        body.classList.add('button--clicked');
      });

    }

  };

})(Drupal);