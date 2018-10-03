'use strict';

(function () {
  // смена способа доставки
  var changeDeliveryMethod = function () {
    var toggleBtnElem = document.querySelector('.deliver__toggle');

    var STORE = 'deliver__store';
    var COURIER = 'deliver__courier';

    var Delivery = {};
    Delivery[STORE] = document.querySelector('.' + STORE);
    Delivery[COURIER] = document.querySelector('.' + COURIER);

    toggleBtnElem.addEventListener('change', function (evt) {
      onToggleBtnElemChange(evt.target, STORE, COURIER, Delivery);
    });
  };

  // смена способа оплаты
  var changePaymentMethod = function () {
    var toggleBtnElem = document.querySelector('.payment__method');

    var CARD = 'payment__card';
    var CASH = 'payment__cash';

    var Payment = {};
    Payment[CARD] = document.querySelector('.' + CARD + '-wrap');
    Payment[CASH] = document.querySelector('.' + CASH + '-wrap');

    toggleBtnElem.addEventListener('change', function (evt) {
      onToggleBtnElemChange(evt.target, CARD, CASH, Payment);
    });
  };

  // функция для обработчика change
  var onToggleBtnElemChange = function (target, method1, method2, methodsObj) {
    if (target.id === method1 ||
      target.id === method2) {
      methodsObj[method1].classList.toggle('visually-hidden');
      methodsObj[method2].classList.toggle('visually-hidden');
      disableFieldset(methodsObj[method1]);
      disableFieldset(methodsObj[method2]);
    }
  };

  // отключает/включает fieldset внутри конкретного враппера
  var disableFieldset = function (wrapper) {
    var fieldset = wrapper.querySelector('fieldset');
    if (fieldset) {
      fieldset.disabled = !fieldset.disabled;
    }
  };


  // валидация полей ввода
  var toPassInputsValidation = function () {
    var cardNumberElem = document.querySelector('#payment__card-number');
    var cardExpiresElem = document.querySelector('#payment__card-date');
    var cardCvcElem = document.querySelector('#payment__card-cvc');
    var holderName = document.querySelector('#payment__cardholder');

    var onInputFocus = function (input, text) {
      input.addEventListener('input', function () {
        validateOnInput(input, text);
        changeCardStatus();
      });
    };

    var validateOnInput = function (input, text) {
      if (input.validity.patternMismatch) {
        input.setCustomValidity(text);
        input.classList.remove('text-input--correct');
        input.classList.add('text-input--error');
      } else {
        input.setCustomValidity('');
        input.classList.remove('text-input--error');
        input.classList.add('text-input--correct');
      }
    };

    cardNumberElem.addEventListener('focus', onInputFocus(cardNumberElem, 'Введите 16 цифр карты без пробелов'));
    cardExpiresElem.addEventListener('focus', onInputFocus(cardExpiresElem, 'Введите дату в формате "мм/гг"'));
    cardCvcElem.addEventListener('focus', onInputFocus(cardCvcElem, 'Три цифры с задней стороны вашей карты'));
    holderName.addEventListener('focus', onInputFocus(holderName, 'Вводите только латинские буквы'));

    // смена статуса карты
    var cardStatus = document.querySelector('.payment__card-status');
    var changeCardStatus = function () {
      if (window.utils.luhnAlgorithm(cardNumberElem) === true && cardNumberElem.validity.valid && cardExpiresElem.validity.valid && cardCvcElem.validity.valid && holderName.validity.valid) {
        cardStatus.textContent = 'Одобрен';
      } else {
        cardStatus.textContent = 'Не определен';
      }
    };
  };

  changeDeliveryMethod();
  changePaymentMethod();
  toPassInputsValidation();
})();
