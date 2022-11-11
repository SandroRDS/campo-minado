const cardsModos = document.querySelectorAll(".menu__container");

const selecionarModo = (modo) => {
    cardsModos.forEach((elemento) => {
        elemento.classList.remove("menu__container--escolhido");
    })

    cardsModos[modo].classList.add("menu__container--escolhido");

    main._modo = modo;
}