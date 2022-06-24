var campoCep = document.getElementById("cep");

campoCep.onblur = function(){
    var valorCep = this.value;

    var campoEndereco = document.getElementById("endereco");
    var campoBairro = document.getElementById("bairro");
    var campoCidade = document.getElementById("cidade");
    var campoEstado = document.getElementById("estado");

    campoEndereco.setAttribute("disabled", "disabled");
    campoBairro.setAttribute("disabled", "disabled");
    campoCidade.setAttribute("disabled", "disabled");
    campoEstado.setAttribute("disabled", "disabled");
    this.setAttribute("disabled", "disabled");

    fetch("https://brasilapi.com.br/api/cep/v1/" + valorCep)
    .then(async function(resposta){
        var dados = await resposta.json();
        campoEndereco.value = dados.street;
        campoBairro.value = dados.neighborhood;
        campoCidade.value = dados.city;
        campoEstado.value = dados.state;

        campoEndereco.removeAttribute("disabled");
        campoBairro.removeAttribute("disabled");
        campoCidade.removeAttribute("disabled");
        campoEstado.removeAttribute("disabled");
        campoCep.removeAttribute("disabled");
    });
}

var btnBuscaBanco = document.getElementById("btn_busca_banco");
btnBuscaBanco.onclick = function(){
    var valorBusca = document.getElementById("cod_banco");

    fetch("https://brasilapi.com.br/api/banks/v1/" + valorBusca.value)
    .then(async function(resposta){
        var dados = await resposta.json();
        var boxResultado = document.getElementById("resultado_busca");

        boxResultado.innerHTML = "ISPB: " + dados.ispb + "<br />" + "Código: " + dados.code + "<br />" + "Nome: " + dados.fullName;
    });
}