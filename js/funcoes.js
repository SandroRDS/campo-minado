var letras = ["A","B","C","D","E","F","G"], numeros = {"A": 0, "B": 1, "C": 2, "D": 3, "E": 4, "F": 5, "G": 6}, bandeirasAtivas = {}, lacunasEncontradas = {}, bombasLocalizacao = {};
var quantidadeDeBombas = 16, quantidadeDeLacunas, quantidadeDeBandeiras, contagem;

function mostrarBombas(vitoria)
{
    for(var coluna = 1; coluna <= 14; coluna++)
    {
        for(var linha = 0; linha <= 6; linha++)
        {
            if(bombasLocalizacao[letras[linha] + coluna] == true)
            {
                if(vitoria == true)
                {
                    var botao = document.querySelector(`#${letras[linha]+coluna}`);
                    botao.style.background = "url(images/bomba90x90.png) #1C3144";
                }
                else
                {
                    var botao = document.querySelector(`#${letras[linha]+coluna}`);
                    botao.style.background = "url(images/bomba90x90.png) #85200E";
                }
            }
        }
    }
}

function acionarBombas()
{
    while(contagem < quantidadeDeBombas/2)
    {
        for(var coluna = 1; coluna <= 7; coluna++)
        {
            for(var linha = 0; linha <= 6; linha++)
            {
                var numeroAleatorio = Math.floor(Math.random() * 2) == 0 ? false : true;
                
                if(contagem < quantidadeDeBombas/2)
                {
                    if(numeroAleatorio == true)
                    {
                        bombasLocalizacao[letras[linha] + coluna] = true;
                        contagem++;
                    }
                }
                
            }
        }
    }
    
    while(contagem < quantidadeDeBombas)
    {
        for(var coluna = 8; coluna <= 14; coluna++)
        {
            for(var linha = 0; linha <= 6; linha++)
            {
                var numeroAleatorio = Math.floor(Math.random() * 2) == 0 ? false : true;
                
                if(contagem < quantidadeDeBombas)
                {
                    if(numeroAleatorio == true)
                    {
                        bombasLocalizacao[letras[linha] + coluna] = true;
                        contagem++;
                    }
                }
            }
        }
    }
}

function colocarBandeira(linha, coluna)
{
    if(bandeirasAtivas[linha + coluna] == false)
    {
        var botao = document.querySelector(`#${linha+coluna}`);
        botao.style.background = "url(images/bandeira.png) #683416";
        bandeirasAtivas[linha + coluna] = true;
        quantidadeDeBandeiras--;
        document.getElementById("bandeiras_faltando").innerHTML = quantidadeDeBandeiras;
    }
    else
    {
        var botao = document.querySelector(`#${linha+coluna}`);
        botao.style.backgroundImage = "linear-gradient(to bottom, rgb(105, 54, 12), rgb(121, 62, 15), rgb(105, 54, 12))";
        bandeirasAtivas[linha + coluna] = false;
        quantidadeDeBandeiras++;
        document.getElementById("bandeiras_faltando").innerHTML = quantidadeDeBandeiras;
    }
}

function verificarBombas(direcoes)
{
    var quantidadeBombasAoRedor = 0;

    for(var contagem = 0; contagem < direcoes.length; contagem++)
    {
        if(bombasLocalizacao[direcoes[contagem]] == true)
        {
            quantidadeBombasAoRedor++;
        }
    }

    return quantidadeBombasAoRedor;
}

function verificarArredores(linha, coluna)
{   
    var direcoes = [];
    coluna = parseInt(coluna);

    if(numeros[linha] > 0)
    {
        direcoes.push(letras[(numeros[linha] - 1)] + (coluna));

        if(coluna > 1)
        {
            direcoes.push(letras[(numeros[linha] - 1)] + (coluna - 1));
        }

        if(coluna < 14)
        {
            direcoes.push(letras[(numeros[linha] - 1)] + (coluna + 1));
        }
    }

    if(numeros[linha] < 6)
    {
        direcoes.push(letras[(numeros[linha] + 1)] + (coluna));

        if(coluna > 1)
        {
            direcoes.push(letras[(numeros[linha] + 1)] + (coluna - 1));
        }
        if(coluna < 14)
        {
            direcoes.push(letras[(numeros[linha] + 1)] + (coluna + 1));
        }
    }

    if(coluna > 1)
    {
        direcoes.push(letras[numeros[linha]] + (coluna - 1));
    }

    if(coluna < 14)
    {
        direcoes.push(letras[numeros[linha]] + (coluna + 1));
    }

    console.log(linha+coluna)
    console.log("🚀 ~ file: funcoes.js ~ line 145 ~ direcoes", direcoes);
    return direcoes;
}

function finalizarJogo(vitoria)
{
    
    if(vitoria == true)
    {
        mostrarBombas(vitoria);
        alert("Parabéns!!! Você Venceu!!");
    }
    else
    {
        mostrarBombas(vitoria);
        alert("Fim de Jogo!!! Você encontrou um bomba!");
    }
    
    document.getElementById("bandeiras_faltando").innerHTML = "";
    document.getElementById("imagem_bandeira").src = "";

    for(var coluna = 1; coluna <= 14; coluna++)
    {
        for(var linha = 0; linha <= 6; linha++)
        {
            document.getElementById(letras[linha]+coluna).disabled = true;
        }
    }

    document.getElementById("play").disabled = false;
}

function cavar(linha, coluna)
{
    if(bombasLocalizacao[linha + coluna] == true)
    {
        finalizarJogo(false);
    }
    else
    {
        if(bandeirasAtivas[linha+coluna] == true)
        {
            quantidadeDeBandeiras--;
        }

        lacunasEncontradas[linha+coluna] = true;
        quantidadeDeLacunas--;

        if(quantidadeDeLacunas == 0)
        {
            finalizarJogo(true);
        }

        var direcoes = verificarArredores(linha, coluna);
        var quantidadeBombasAoRedor = verificarBombas(direcoes);
        
        document.getElementById(linha+coluna).disabled = true;
        
        switch(quantidadeBombasAoRedor)
        {   
            case 0:
                document.getElementById(linha+coluna).style.background = "#441C0E";
                
                for(var contagem = 0; contagem < direcoes.length; contagem++)
                {
                    var coordenada = direcoes[contagem].split("");

                    if(coordenada.length == 3)
                    {
                        var ultimo_numero = coordenada[1] + coordenada[2];
                        coordenada[1] = ultimo_numero;
                    }
                    
                    if(lacunasEncontradas[coordenada[0] + coordenada[1]] == false && bombasLocalizacao[coordenada[0] + coordenada[1]] == false)
                    {
                        console.log("🚀 ~ file: funcoes.js ~ line 207 ~ coordenada", coordenada)
                        cavar(coordenada[0], coordenada[1]);
                    }
                }
                break;

            case 1:
                document.getElementById(linha+coluna).style.background = "url('images/numero1.png') #441C0E";
                break;

            case 2:
                document.getElementById(linha+coluna).style.background = "url('images/numero2.png') #441C0E";
                break;

            case 3:
                document.getElementById(linha+coluna).style.background = "url('images/numero3.png') #441C0E";
                break;

            case 4:
                document.getElementById(linha+coluna).style.background = "url('images/numero4.png') #441C0E";
                break;

            case 5:
                document.getElementById(linha+coluna).style.background = "url('images/numero5.png') #441C0E";
                break;

            case 6:
                document.getElementById(linha+coluna).style.background = "url('images/numero6.png') #441C0E";
                break;

            case 7:
                document.getElementById(linha+coluna).style.background = "url('images/numero7.png') #441C0E";
                break;

            case 8:
                document.getElementById(linha+coluna).style.background = "url('images/numero8.png') #441C0E";
                break;
        }
    }
}

function iniciarJogo()
{
    document.getElementById("play").disabled = true;
    alert("Bem Vindo ao Campo Minado!! Seu objetivo é abrir todas as lacunas sem encontrar uma bomba! Boa sorte!!");
    quantidadeDeLacunas = 82;
    quantidadeDeBandeiras = 16;
    contagem = 0;

    document.getElementById("bandeiras_faltando").innerHTML = quantidadeDeBandeiras;
    document.getElementById("imagem_bandeira").src = "images/bandeira.png";
    
    for(var coluna = 1; coluna <= 14; coluna++)
    {
        for(var linha = 0; linha <= 6; linha++)
        {
            document.getElementById(letras[linha]+coluna).disabled = false;
            document.getElementById(letras[linha]+coluna).style.backgroundImage = "linear-gradient(to bottom, rgb(105, 54, 12), rgb(121, 62, 15), rgb(105, 54, 12))";
            lacunasEncontradas[letras[linha] + coluna] = false;
            bombasLocalizacao[letras[linha] + coluna] = false;
            bandeirasAtivas[letras[linha] + coluna] = false;
        }
    }

    acionarBombas();
}