class Main
{
    constructor()
    {
        this._jogo;
        this._containerPonteiros = document.querySelector(".ponteiros");
        this._presets = [
            {
                width: "90%",
                height: "90%",
                rows: 5,
                columns: 10,
                bombas: 8
            },
            {
                width: "90%",
                height: "90%",
                rows: 8,
                columns: 14,
                bombas: 15
            },
            {
                width: "90%",
                height: "90%",
                rows: 8,
                columns: 18,
                bombas: 20
            }];

        this._modo = 0;
    }

    iniciarNovoJogo()
    {
        this._jogo = new Jogo(".campo", this._presets[this._modo]);

        this._jogo._container.classList.toggle("campo--desativado");
        this._containerPonteiros.classList.toggle("ponteiros--desativado");
        document.querySelector(".menu").classList.toggle("menu--desativado");
    }

    finalizarJogo(situacao)
    {
        this._jogo.revelarBombas();
        
        if(situacao == 0)
        {
            alert("Você encontrou uma bomba!");
        }
        else
        {
            alert("Você venceu!!");
        }

        this._jogo._container.classList.toggle("campo--desativado");
        this._containerPonteiros.classList.toggle("ponteiros--desativado");
        document.querySelector(".menu").classList.toggle("menu--desativado");
    }
}

const main = new Main();