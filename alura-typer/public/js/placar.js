
$('#botao-placar').click(mostraPlacar);

function mostraPlacar() {
    $('.placar').stop().slideToggle(200);
}


function inserePlacar() {
    var corpoTabela = $(".placar").find("tbody");
    var usuario = "Matheus";
    var numPalavras = $("#contador-palavras").text();
    var td = novaTD(usuario, numPalavras);

    td.find(".botao-remover").click(removeLinha);
    corpoTabela.prepend(td);
    $('.placar').slideDown(400)
    scrollPlacar();
}

function scrollPlacar() {
    var posicaoPlacar = $(".placar").offset().top;

    $("html, body").animate(
    {
        scrollTop: posicaoPlacar + "px"
    }, 1000);
}

function novaTD(usuario, palavras) {
    var linha = $("<tr>");
    var colunaUsuario = $("<td>").text(usuario);
    var colunaPalavras = $("<td>").text(palavras);
    var colunaRemover = $("<td>");
    var link = $('<a>').addClass("botao-remover").attr("href","#");
    var icone = $('<i>').addClass("small").addClass("material-icons").text("delete");
    link.append(icone);
    colunaRemover.append(link);
    linha.append(colunaUsuario);
    linha.append(colunaPalavras);
    linha.append(colunaRemover);
    return linha
}

function removeLinha() {
        event.preventDefault();
        linha = $(this).closest("tr");
        linha.fadeOut(1000)
        setTimeout(() => {
            linha.remove();
        }, 1000);
}