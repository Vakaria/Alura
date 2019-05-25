var tempoInicial = $("#tempo-digitacao").text();
var campo = $(".campo-digitacao");

$(function(){
    atualizaTamanhoFrase();
    inicializaContadores();
    inicializaCronometro();
    inicializaMarcadores();
    $("#botao-reiniciar").click(reiniciaJogo);
});

function atualizaTamanhoFrase(){
    var numPalavras = $(".frase").text().split(" ").length;
    $("#tamanho-frase").text(numPalavras);
}

function inicializaContadores() {
    campo.on("input",function() {
        var conteudo = campo.val();

        var qtdPalavras = conteudo.split(" ").length;
        $("#contador-palavras").text(qtdPalavras);

        var qtdCaracteres = conteudo.length;
        $("#contador-caracteres").text(qtdCaracteres);
    });
}

function inicializaCronometro() {
    var tempoRestante = $("#tempo-digitacao").text();
    campo.one("focus", function() {
        $("#botao-reiniciar").attr("disabled", true);
        var cronometroID = setInterval(function() {
            tempoRestante--;
            $("#tempo-digitacao").text(tempoRestante);
            if (tempoRestante < 1) {
                clearInterval(cronometroID);
                finalizaJogo();
            }
        }, 1000);
    });
}   

function finalizaJogo() {
    campo.attr("disabled", true);
    campo.toggleClass("campo-desativado");
    $("#botao-reiniciar").attr("disabled", false);
    
    inserePlacar();
}


function inicializaMarcadores(){
    var frase = $(".frase").text();
    campo.on("input", function(){
        var digitado = campo.val();
        var comparavel = frase.substr(0, digitado.length);
        if(comparavel == digitado){
            campo.removeClass("borda-vermelha");
            campo.addClass("borda-verde");
        } else {
            campo.removeClass("borda-verde");
            campo.addClass("borda-vermelha");
        }
    });
}


function reiniciaJogo(){
    campo.attr("disabled",false);
    campo.val("");
    campo.toggleClass("campo-desativado");
    $("#contador-palavras").text("0");
    $("#contador-caracteres").text("0");
    $("#tempo-digitacao").text(tempoInicial);
    inicializaCronometro();
    campo.removeClass("borda-vermelha");
    campo.removeClass("borda-verde");
}