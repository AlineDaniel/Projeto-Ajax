const selectEstado = document.getElementById("estado");

fetch("https://brasilapi.com.br/api/ibge/uf/v1")
.then(async function(resposta){
    const dados = await resposta.json();
    selectEstado.innerHTML = "";
    selectEstado.removeAttribute("disabled");
    dados.sort(function(a,b){
        if(a.nome > b.nome){
            return 1;
        }
        if(a.nome < b.nome){
            return -1;
        }
        return 0;
    });

    dados.forEach(function(estado){
        const optionEstado = document.createElement("option");
        optionEstado.value = estado.sigla;
        optionEstado.innerText = estado.nome;
        selectEstado.append(optionEstado);
    });
});

selectEstado.onchange = function(){
    const listaMunicipios = document.getElementById("municipios");
    listaMunicipios.innerHTML = "<li>CARREGANDO MUNICIPIOS...</li>";

    fetch("https://brasilapi.com.br/api/ibge/municipios/v1/" + this.value)
    .then(async function(resposta){
        const dados = await resposta.json();
        listaMunicipios.innerHTML = "";
        dados.sort(function(a,b){
            if(a.nome > b.nome){
                return 1;
            }
            if(a.nome < b.nome){
                return -1;
            }
            return 0;
        });

        dados.forEach(function(municipio){
            const itemMunicipio = document.createElement("li");
            itemMunicipio.innerText = municipio.nome;
            listaMunicipios.append(itemMunicipio);
        });
    });
}