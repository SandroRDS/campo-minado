class Lacuna
{
    constructor(objLacuna)
    {
        this._elementoHTML = objLacuna.seletor;
        
        this._coordenadaX = objLacuna.coordenadaX;
        this._coordenadaY = objLacuna.coordenadaY;
        
        this._limiteX = objLacuna.limiteX;
        this._limiteY = objLacuna.limiteY;
        
        this._temBomba;
        this._temBandeira = false;
        this._temIncognita = false;
        this._estaAberta = false;
        
        this._elementoHTML.onclick = () => this.pressionarLacuna();
    }

    pressionarLacuna()
    {
        const ponteiro = jogo._ponteiro;
        let bombaEncontrada = false;

        switch(ponteiro)
        {
            case 1:
                bombaEncontrada = this.cavarLacuna();
                break;
            
            case 2:
                this.colocarBandeira();
                break;

            case 3:
                this.colocarIncognita();
                break;
        }
    }

    cavarLacuna()
    {
        if(this._temBandeira || this._temIncognita || this._estaAberta)
        {
            return false;
        }
        else
        {
            this._estaAberta = true;

            if(this._temBomba)
            {
                return true;
            }
            else
            {
                const numeroDeBombasAoRedor = this.verificarNumeroDeBombasAoRedor();
                this._elementoHTML.innerHTML = numeroDeBombasAoRedor;
            }
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
                this._temIncognita = false;
            }
        }
    }

    colocarIncognita()
    {
        if(!this._estaAberta)
        {
            if(this._temIncognita)
            {
                this._temIncognita = false;
            }
            else
            {
                this._temIncognita = true;
                this._temBandeira = false;
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
                return {coordenadaX: coordenadaX, coordenadaY: coordenadaY};
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

    verificarNumeroDeBombasAoRedor()
    {
        const coordenadasAoRedor = this.verificarCoordenadasDeLacunasAoRedor();
        let numeroDeBombas = 0;
        
        coordenadasAoRedor.forEach((elemento) => {
            const x = elemento.coordenadaX;
            const y = elemento.coordenadaY;
            
            const indice = (((y - 1) * this._limiteX) + x) - 1;

            if(jogo._lacunas[indice]._temBomba)
            {
                numeroDeBombas++;
            }
        })

        return numeroDeBombas;
    }
}