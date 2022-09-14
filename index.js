'use strict';

const limparFormulario = (endereco) =>{
    document.getElementById('endereco').value ='';
    document.getElementById('bairro').value = '';
    document.getElementById('cidade').value = '';
    document.getElementById('estado').value = '';
}

const preencherFormulario = (endereco) =>{
    document.getElementById('endereco').value = endereco.logradouro;
    document.getElementById('bairro').value = endereco.bairro;
    document.getElementById('cidade').value = endereco.localidade;
    document.getElementById('estado').value = endereco.uf;
}

const eNumero = (numero) => /^[0-9]+$/.test(numero);
const cepValido = (cep) => cep.length == 8 && eNumero(cep);
 
const pesquisarCep = async() =>{
    limparFormulario();
    const cep = document.getElementById('cep').value;
    const url = `http://viacep.com.br/ws/${cep}/json/`;

    if(cepValido(cep)){
          //Promessa, retorno que não é possível adicioná-lo direto na variável 
        //fetch(url).then(responde => responde.json());
        const dados = await fetch(url);
        const endereco = await dados.json();
        if (endereco.hasOwnProperty('erro')){
            document.getElementById('endereco').value = "CEP INVÁLIDO!"
        }else {
            preencherFormulario(endereco);
        }
    }else {
        document.getElementById('endereco').value = "CEP INCORRETO!"
    }
}


const salvaDados = (event) =>{
    event.preventDefault();
    addLoading()

    const name = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const CEP = document.getElementById('cep').value;
    const endereco = document.getElementById('endereco').valu;
    const bairro = document.getElementById('bairro').value;
    const cidade = document.getElementById('cidade').value;
    const estado = document.getElementById('estado').value;


    fetch('https://api.sheetmonkey.io/form/ft7LE59MXXQBDyBLpj6Twn', {

        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name, email, CEP, endereco, bairro, cidade, estado})
    }).then(() => removeLoading())
}

const button = document.getElementById('btn');

const addLoading = () => {
    button.innerHTML = '<img src="loading.png" class="loading" alt="loading">'
}

const removeLoading = () => {
    button.innerHTML = 'Salvar'

}


document.getElementById('cep').addEventListener("focusout", pesquisarCep);

document.querySelector('form').addEventListener("submit", salvaDados,);