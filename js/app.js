"use strict";

// CСкрипт карусели
$(document).ready(function () {
    const slider = $('#slider');
    slider.owlCarousel({
        items: 1,
        loop: true,
        center: true
    });

    $('#prev_slide').click(function () {
        slider.trigger('prev.owl.carousel');
    });
    $('#next_slide').click(function () {
        slider.trigger('next.owl.carousel');
    });
});


// Скрипт кнопки подробнее и назад в карточке товара
const cardContent = document.querySelectorAll('.card__product');
const cardInfo = document.querySelectorAll('.card__info');
const cardEtc = document.querySelectorAll('.card__link');
const cardBack = document.querySelectorAll('.card__info-link');
cardEtc.forEach(function (item, i) {
    item.addEventListener('click', function (e) {
        e.preventDefault();
        cardContent[i].classList.add('card__product--hidden');
        cardInfo[i].classList.add('card__info--active');

    });
});
cardBack.forEach(function (item, i) {
    item.addEventListener('click', function (e) {
        e.preventDefault();
        cardContent[i].classList.remove('card__product--hidden');
        cardInfo[i].classList.remove('card__info--active');

    });
});

// Скрипт переключения активности табов
const tabs = document.querySelectorAll('.catalog__tab');
const tabContent = document.querySelectorAll('.catalog__cards');
tabs.forEach(function (item) {
    item.addEventListener('click', function () {
        const content = document.querySelector('#' + this.dataset.tab);
        tabs.forEach(function (item) {
            item.classList.remove('catalog__tab--active');
        });
        tabContent.forEach(function (item) {
            item.classList.remove('catalog__cards--active');
        });
        this.classList.add('catalog__tab--active');
        content.classList.add('catalog__cards--active');
    });
});


// Карусель для отзывов

$(document).ready(function () {
    const feedSlider = $('.feed-slider');
    feedSlider.owlCarousel({
        items: 1,
        loop: true
    });
    $('.feed__slider-btn--left').click(function () {
        feedSlider.trigger('prev.owl.carousel', [500]);
    });
    $('.feed__slider-btn--right').click(function () {
        feedSlider.trigger('next.owl.carousel', [500]);
    });



    // вызов модалки консалт
    $('[data-consult]').on('click', function () {
        $('#overlay, #consult').fadeIn();
    });
    // закрытие модалок
    $('[data-modal-close]').on('click', function () {
        $('#overlay, #consult, #order, #thanks').fadeOut('slow');
    });

    $('[data-buy-btn]').each(function (i) {
        $(this).on('click', function () {
            $('[data-modal-product]').text($('[data-card-title]').eq(i).text());
            $('#overlay, #order').fadeIn('slow');
        });
    });

    // validate forms and sending forms to mail

    function validateForm(form) {
        $(form).validate({
            rules: {
                userName: "required",
                userEmail: {
                    required: true,
                    email: true
                },
                userPhone: "required"
            },
            messages: {
                userName: "Пожалуйста укажите ваше имя",
                userPhone: "Пожалуйста укажите  номер телефона",
                userEmail: {
                    required: "Пожалуйста укажите вашу почту",
                    email: "Почта должна быть указана в формате nickname@example.com"
                }
            },

            submitHandler: function () {
                $.ajax({
                    type: "POST",
                    url: "./../mailer/smart.php",
                    data: $(form).serialize()
                }).done(function () {
                    $(form).find('input').val('');
                    $(form).trigger('reset');
                    $('#consult, #order').fadeOut();
                    $('#overlay, #thanks').fadeIn();
                });
                return false;
            }
        });
    }

    validateForm('#order form');
    validateForm('#consult form');
    validateForm('#consultation-form');


    // masked input
    $('input[name=userPhone]').mask("+7(999)999-99-99");

    // scroll
    $(window).scroll(function () {
        if ($(this).scrollTop() > 1200) {
            $('.up').fadeIn();
        } else {
            $('.up').fadeOut();
        }
    });
});


