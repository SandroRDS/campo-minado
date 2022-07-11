var letras = ["A","B","C","D","E","F","G"], numeros = {"A": 0, "B": 1, "C": 2, "D": 3, "E": 4, "F": 5, "G": 6}, bandeirasAtivas = {}, lacunasEncontradas = {}, bombasLocalizacao = {};
var quantidadeDeBombas = 16, quantidadeDeLacunas, contagem;


//FUNÇÃO: MOSTRAR LOCALIZAÇÃO DAS BOMBAS APÓS VITÓRIA/DERROTA
function mostrarBombas(vitoria)
{
    for(var coluna = 1; coluna <= 14; coluna++)
    {
        for(var linha = 0; linha <= 6; linha++)
        {
            if(bombasLocalizacao[letras[linha] + coluna] == true)
            {
                //VITÓRIA -> BOMBAS COM FUNDO AZUL
                if(vitoria == true)
                {
                    var botao = document.querySelector(`#${letras[linha]+coluna}`);
                    botao.style.background = "url(images/bomba90x90.png) #1C3144";
                }
                else //DERROTA -> BOMBAS COM FUNDO VERMELHO
                {
                    var botao = document.querySelector(`#${letras[linha]+coluna}`);
                    botao.style.background = "url(images/bomba90x90.png) #85200E";
                }
            }
        }
    }
}


//FUNÇÃO: DISTRIBUINDO BOMBAS EM LACUNAS ALEATÓRIAS
function acionarBombas()
{
    //DISTRIBUIÇÃO DE BOMBAS DA COLUNA 1 ATÉ 7
    while(contagem < quantidadeDeBombas/2)
    {
        for(var coluna = 1; coluna <= 7; coluna++)
        {
            for(var linha = 0; linha <= 6; linha++)
            {
                //SELECIONANDO ALEATORIAMENTE O NÚMERO 0 OU 1 PARA DETERMINAR SE A LACUNA TERÁ UMA BOMBA OU NÃO
                var numeroAleatorio = Math.floor(Math.random() * 2) == 0 ? false : true;
                
                if((contagem < quantidadeDeBombas/2) && (numeroAleatorio == true))
                {
                    bombasLocalizacao[letras[linha] + coluna] = true;
                    contagem++;
                }
            }    
        }
    }
    
    //DISTRIBUIÇÃO DE BOMBAS DA COLUNA 8 ATÉ 14
    while(contagem < quantidadeDeBombas)
    {
        for(var coluna = 8; coluna <= 14; coluna++)
        {
            for(var linha = 0; linha <= 6; linha++)
            {
                //SELECIONANDO ALEATORIAMENTE O NÚMERO 0 OU 1 PARA DETERMINAR SE A LACUNA TERÁ UMA BOMBA OU NÃO
                var numeroAleatorio = Math.floor(Math.random() * 2) == 0 ? false : true;
                
                if((contagem < quantidadeDeBombas) && (numeroAleatorio == true))
                {
                    bombasLocalizacao[letras[linha] + coluna] = true;
                    contagem++;
                }
            }
        }
    }
}


//FUNÇÃO: COLOCAR UMA BANDEIRA EM UMA LACUNA
function colocarBandeira(linha, coluna)
{
    if(bandeirasAtivas[linha + coluna] == false) //LACUNA SEM BANDEIRA
    {
        var botao = document.querySelector(`#${linha+coluna}`);
        botao.style.background = "url(images/bandeira.png) #683416";
        bandeirasAtivas[linha + coluna] = true;
        quantidadeDeBandeiras--;
    }
    else //LACUNA COM BANDEIRA
    {
        var botao = document.querySelector(`#${linha+coluna}`);
        botao.style.backgroundImage = "linear-gradient(to bottom, rgb(105, 54, 12), rgb(121, 62, 15), rgb(105, 54, 12))";
        bandeirasAtivas[linha + coluna] = false;
        quantidadeDeBandeiras++;
    }
}


//FUNÇÃO: VERIFICAR E RETORNAR QUANTAS BOMBAS TEM AO REDOR DE UM LACUNA
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


//FUNÇÃO: VERIFICAR E RETORNAR AS COORDENADAS DAS LACUNAS ADJACENTES
function verificarArredores(linha, coluna)
{   
    var direcoes = [];
    coluna = parseInt(coluna);

    if(numeros[linha] > 0) //LACUNA NÃO ESTÁ NA PRIMEIRA LINHA
    {
        //NORTE
        direcoes.push(letras[(numeros[linha] - 1)] + (coluna));

        if(coluna > 1) //LACUNA NÃO ESTÁ NA PRIMEIRA COLUNA
        {
            //NOROESTE
            direcoes.push(letras[(numeros[linha] - 1)] + (coluna - 1));
        }

        if(coluna < 14) //LACUNA NÃO ESTÁ NA ÚLTIMA COLUNA
        {
            //NORDESTE
            direcoes.push(letras[(numeros[linha] - 1)] + (coluna + 1));
        }
    }

    if(numeros[linha] < 6) //LACUNA NÃO ESTÁ NA ÚLTIMA LINHA
    {
        //SUL
        direcoes.push(letras[(numeros[linha] + 1)] + (coluna));

        if(coluna > 1) //LACUNA NÃO ESTÁ NA PRIMEIRA COLUNA
        {
            //SUDOESTE
            direcoes.push(letras[(numeros[linha] + 1)] + (coluna - 1));
        }
        if(coluna < 14) //LACUNA NÃO ESTÁ NA ÚLTIMA COLUNA
        {
            //SUDESTE
            direcoes.push(letras[(numeros[linha] + 1)] + (coluna + 1));
        }
    }

    if(coluna > 1) //LACUNA NÃO ESTÁ NA PRIMEIRA COLUNA
    {
        //OESTE
        direcoes.push(letras[numeros[linha]] + (coluna - 1));
    }

    if(coluna < 14) //LACUNA NÃO ESTÁ NA ÚLTIMA COLUNA
    {
        //LESTE
        direcoes.push(letras[numeros[linha]] + (coluna + 1));
    }

    return direcoes;
}


//FUNÇÃO: ENCERRA O JOGO
function finalizarJogo(vitoria)
{
    if(vitoria == true) //MENSAGEM DE VITÓRIA
    {
        mostrarBombas(vitoria);
        alert("Parabéns!!! Você Venceu!!");
    }
    else //MENSAGEM DE DERROTA
    {
        mostrarBombas(vitoria);
        alert("Fim de Jogo!!! Você encontrou um bomba!");
    }

    //DESABILITANDO TODAS AS LACUNAS
    for(var coluna = 1; coluna <= 14; coluna++)
    {
        for(var linha = 0; linha <= 6; linha++)
        {
            document.getElementById(letras[linha]+coluna).disabled = true;
        }
    }

    //REABILITANDO O BOTÃO PLAY
    document.getElementById("play").disabled = false;
}

//FUNÇÃO: CAVAR EM UMA LACUNA
function cavar(linha, coluna)
{
    if(bombasLocalizacao[linha + coluna] == true) //ENCONTROU UMA BOMBA
    {
        finalizarJogo(false);
    }
    else //ABRIU UMA LACUNA SEM BOMBA
    {
        document.getElementById(linha+coluna).disabled = true;
        lacunasEncontradas[linha+coluna] = true;
        quantidadeDeLacunas--;
        
        if(quantidadeDeLacunas == 0) //JOGADOR ABRIU TODAS AS LACUNAS
        {
            finalizarJogo(true);
        }
        
        //CHAMANDO A FUNÇÃO PARA RETORNAR AS COORDENADAS DAS LACUNAS ADJACENTES
        var direcoes = verificarArredores(linha, coluna);

        //CHAMANDO A FUNÇÃO PARA RETORNAR QUANTAS BOMBAS TEM AO RETOR DA LACUNA CAVADA
        var quantidadeBombasAoRedor = verificarBombas(direcoes);
        
        switch(quantidadeBombasAoRedor)
        {
            //NENHUMA BOMBA AO REDOR   
            case 0:
                document.getElementById(linha+coluna).style.background = "#441C0E";
                
                //CAVANDO TODAS AS LACUNAS AO REDOR QUE AINDA NÃO FORAM ESCAVADAS
                for(var contagem = 0; contagem < direcoes.length; contagem++)
                {
                    var coordenada = direcoes[contagem].split("");

                    //CLÁUSULA PARA PASSAR CORRETAMENTE A COORDENADA DE COLUNAS NUMERICAMENTE MAIORES QUE 2 ALGARISMOS (Coluna 10 até 14)
                    if(coordenada.length == 3)
                    {
                        coordenada[1] += coordenada[2];
                    }
                    
                    if(lacunasEncontradas[coordenada[0] + coordenada[1]] == false)
                    {
                        cavar(coordenada[0], coordenada[1]);
                    }
                }
                break;
            
            //1 BOMBA AO REDOR
            case 1:
                document.getElementById(linha+coluna).style.background = "url('images/numero1.png') #441C0E";
                break;
            
            //2 BOMBAS AO REDOR
            case 2:
                document.getElementById(linha+coluna).style.background = "url('images/numero2.png') #441C0E";
                break;
            
            //3 BOMBAS AO REDOR
            case 3:
                document.getElementById(linha+coluna).style.background = "url('images/numero3.png') #441C0E";
                break;

            //4 BOMBAS AO REDOR
            case 4:
                document.getElementById(linha+coluna).style.background = "url('images/numero4.png') #441C0E";
                break;

            //5 BOMBAS AO REDOR
            case 5:
                document.getElementById(linha+coluna).style.background = "url('images/numero5.png') #441C0E";
                break;

            //6 BOMBAS AO REDOR
            case 6:
                document.getElementById(linha+coluna).style.background = "url('images/numero6.png') #441C0E";
                break;

            //7 BOMBAS AO REDOR
            case 7:
                document.getElementById(linha+coluna).style.background = "url('images/numero7.png') #441C0E";
                break;

            //8 BOMBAS AO REDOR
            case 8:
                document.getElementById(linha+coluna).style.background = "url('images/numero8.png') #441C0E";
                break;
        }
    }
}


//FUNÇÃO: INICIAR O JOGO
function iniciarJogo()
{
    //DESABILITANDO O BOTÃO PLAY
    document.getElementById("play").disabled = true;
    
    //MENSAGEM DE INTRODUÇÃO
    alert("Bem Vindo ao Campo Minado!! Seu objetivo é cavar todas as lacunas sem encontrar uma bomba! Boa sorte!!");
    
    //RESET DE VARIÁVEIS
    quantidadeDeLacunas = 82;
    contagem = 0;
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

    //CHAMANDO A FUNÇÃO PARA DISTRUIBUIR BOMBAS ALEATÓRIAMENTE PELAS LACUNAS
    acionarBombas();
}