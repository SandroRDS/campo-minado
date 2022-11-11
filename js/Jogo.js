class Jogo 
{ 
    constructor(seletor, configuracoes)
    {
        this._container = document.querySelector(seletor);
        this._configuracoes = configuracoes;
        this._lacunas = this.gerarLacunas();
        this._ponteiro = 1;

        this.configurarContainer();
        this.inserirBombasRecursivamente(configuracoes.bombas);
    }

    configurarContainer()
    {
        this._container.style.width = this._configuracoes.width;
        this._container.style.height = this._configuracoes.height;
        this._container.style.gridTemplateColumns = `repeat(${this._configuracoes.columns}, 1fr)`;
        this._container.style.gridTemplateRows = `repeat(${this._configuracoes.rows}, 1fr)`;
    }

    gerarLacunas()
    {
        const quantidadeDeColunas = this._configuracoes.columns;
        const quantidadeDeLinhas = this._configuracoes.rows;
        const lacunas = [];
        let novaLacuna, elemento;

        for(let y = 1; y <= quantidadeDeLinhas; y++)
        {
            for(let x = 1; x <= quantidadeDeColunas; x++)
            {
                elemento = document.createElement(`button`);
                elemento.setAttribute("class","lacuna");
                elemento = this._container.appendChild(elemento);
                
                novaLacuna = new Lacuna({
                    seletor: elemento,
                    coordenadaX: x,
                    coordenadaY: y,
                    limiteX: quantidadeDeColunas,
                    limiteY: quantidadeDeLinhas
                });
                
                lacunas.push(novaLacuna);
            }
        }

        return lacunas;
    }

    modificarPonteiro(valor)
    {
        this._ponteiro = valor;
    }

    inserirBombasRecursivamente(quantidadeDeBombas)
    {
        for(let i = 1; i <= quantidadeDeBombas; i++)
        {
            this.inserirBomba()
        }
    }

    inserirBomba()
    {
        const indiceAleatorio = this.escolherIndiceAleatorio();

        if(this._lacunas[indiceAleatorio]._temBomba)
        {
            this.inserirBomba();
        }
        else
        {
            this._lacunas[indiceAleatorio]._temBomba = true;
            console.log(this._lacunas[indiceAleatorio]);
        }
    }

    escolherIndiceAleatorio()
    {
        const min = 0;
        const max = this._lacunas.length;
        
        return Math.floor(Math.random() * (max - min) + min);
    }
}
