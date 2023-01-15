"use strict";

window.onload = function () {
  const parallax = document.querySelector(".parallax");

  if (parallax) {
    const content = document.querySelector(".parallax__container");
    const clouds = document.querySelector(".images-parallax__clouds");
    const house = document.querySelector(".images-parallax__house");

    //   Коэффициенты
    const forClouds = 40;
    const forHouse = 20;

    //   Скорость анимации
    const speed = 0.05;

    //   Обьявление переменных
    let positionX = 0,
      positionY = 0;
    let coordXprocent = 0,
      coordYprocent = 0;

    function setMouseParallaxStyle() {
      const distX = coordXprocent - positionX;
      const distY = coordYprocent - positionY;

      positionX = positionX + distX * speed;
      positionY = positionY + distY * speed;

      // Передаем стили
      clouds.style.cssText = `transform: translate (${positionX / forClouds}%,${
        positionY / forClouds
      }%);`;
      house.style.cssText = `transform: translate (${positionX / forHouse}%,${
        positionY / forHouse
      }%);`;

      requestAnimationFrame(setMouseParallaxStyle);
    }
    setMouseParallaxStyle();

    parallax.addEventListener("mousemove", function (e) {
      //   Получение ширины и высоты
      const parallaxWidth = parallax.offsetWidth;
      const parallaxHeight = parallax.offsetHeight;

      // Ноль по середине
      const coordX = e.pageX - parallaxWidth / 2;
      const coordY = e.pageY - parallaxHeight / 2;

      // Получаем ппроценты
      coordXprocent = (coordX / parallaxWidth) * 100;
      coordYprocent = (coordY / parallaxHeight) * 100;
    });

    //   Parallax при скролле
    let thresholdSets = [];
    for (let i = 0; i <= 1.0; i += 0.005) {
      thresholdSets.push(i);
    }
    const callback = function (entries, observer) {
      const scrollTopProcent =
        (window.pageYOffset / parallax.offsetHeight) * 100;
      setParallaxItemsStyle(scrollTopProcent);
    };
    const observer = new IntersectionObserver(callback, {
      threshold: thresholdSets,
    });

    observer.observe(document.querySelector(".content"));

    function setParallaxItemsStyle(scrollTopProcent) {
      content.style.cssText = `transform: translate(0%, -${
        scrollTopProcent / 9
      }%)`;
      house.parentElement.style.cssText = `transform: translate(0%, -${
        scrollTopProcent / 3
      }%)`;
    }
  }
};
