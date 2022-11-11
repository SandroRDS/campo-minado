class Lacuna
{
    constructor(coordenadaX, coordenadaY, limiteX, limiteY)
    {
        this._coordenadaX = coordenadaX;
        this._coordenadaY = coordenadaY;
        this._limiteX = limiteX;
        this._limiteY = limiteY;
        this._temBomba;
        this._temBandeira = false;
        this._temIncognita = false;
        this._estaAberta = false;
    }

    cavarLacuna()
    {
        if(this.temBandeira || this.estaAberta)
        {

        }
        else
        {
            this.estaAberta = true;
        }
    }

    colocarBandeira()
    {
        if(!this._estaAberta)
        {
            if(this._temBandeira)
            {
                this._temBandeira = false;
            }
            else
            {
                this._temBandeira = true;
            }
        }
    }

    verificarCoordenadasDeLacunasAoRedor()
    {
        const coordenadas = [];

        const validarCoordenada = (coordenadaX, coordenadaY) => {

            if(coordenadaX === null || coordenadaY === null)
            {
                return null;
            }
            else
            {
                return {"coordenadaX":coordenadaX, "coordenadaY":coordenadaY};
            }
        }

        const obterCoordenadaNorte = () => {
            const coordenadaX = this._coordenadaX;
            const coordenadaY = this._coordenadaY - 1 <= 0 ? null : this._coordenadaY - 1;

            coordenadas.push(validarCoordenada(coordenadaX, coordenadaY));
        };

        const obterCoordenadaNordeste = () => {
            const coordenadaX = this._coordenadaX + 1 > this._limiteX ? null : this._coordenadaX + 1; 
            const coordenadaY = this._coordenadaY - 1 <= 0 ? null : this._coordenadaY - 1;

            coordenadas.push(validarCoordenada(coordenadaX, coordenadaY));
        };

        const obterCoordenadaNoroeste = () => {
            const coordenadaX = this._coordenadaX - 1 <= 0 ? null : this._coordenadaX - 1;
            const coordenadaY = this._coordenadaY - 1 <= 0 ? null : this._coordenadaY - 1;

            coordenadas.push(validarCoordenada(coordenadaX, coordenadaY));
        };

        const obterCoordenadaSul = () => {
            const coordenadaX = this._coordenadaX;
            const coordenadaY = this._coordenadaY + 1 > this._limiteY ? null : this._coordenadaY + 1;

            coordenadas.push(validarCoordenada(coordenadaX, coordenadaY));
        };

        const obterCoordenadaSudeste = () => {
            const coordenadaX = this._coordenadaX + 1 > this._limiteX ? null : this._coordenadaX + 1;
            const coordenadaY = this._coordenadaY + 1 > this._limiteY ? null : this._coordenadaY + 1;

            coordenadas.push(validarCoordenada(coordenadaX, coordenadaY));
        };

        const obterCoordenadaSudoeste = () => {
            const coordenadaX = this._coordenadaX - 1 <= 0 ? null : this._coordenadaX - 1;
            const coordenadaY = this._coordenadaY + 1 > this._limiteY ? null : this._coordenadaY + 1;

            coordenadas.push(validarCoordenada(coordenadaX, coordenadaY));
        };

        const obterCoordenadaLeste = () => {
            const coordenadaX = this._coordenadaX + 1 > this._limiteX ? null : this._coordenadaX + 1;
            const coordenadaY = this._coordenadaY;

            coordenadas.push(validarCoordenada(coordenadaX, coordenadaY));
        };

        const obterCoordenadaOeste = () => {
            const coordenadaX = this._coordenadaX - 1 <= 0 ? null : this._coordenadaX - 1;
            const coordenadaY = this._coordenadaY;

            coordenadas.push(validarCoordenada(coordenadaX, coordenadaY));
        };

        obterCoordenadaNorte();
        obterCoordenadaSul();
        obterCoordenadaLeste();
        obterCoordenadaOeste();
        obterCoordenadaNoroeste();
        obterCoordenadaNordeste();
        obterCoordenadaSudoeste();
        obterCoordenadaSudeste();

        return coordenadas.filter((elemento) => {
            return elemento !== null;
        })
    }
}