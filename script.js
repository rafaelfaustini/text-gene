let elapsed = 0;﻿
let popula = new Array();
let pensamento = new Array();
let geracao = 0;
let quantidade_pop;
let tamanho_nome;
let soma_pesos = 0;
let soma_fitness = 0;
let population;
var nome;
var mutacao_l = 1;
let soma = 0;
let muta = 0.01;
let pai_index = 0;
let mae_index = 0;
let trigger = false;
let taxa = 0.01;


String.prototype.replaceAt = function(index, character) {
  return this.substr(0, index) + character + this.substr(index + character.length);
};

function taxa_dinamica(tax) {
  let pulo = null;
  let tamanho_pensamento = pensamento.length;
  let geracao_new = geracao / 10;

  if (tamanho_pensamento > 1 && tamanho_pensamento < (geracao_new) && Number.isInteger(geracao_new)) {
    if ((pensamento[geracao_new - 3].mediafit - pensamento[geracao_new - 2].mediafit) > 0) {

      if(self.lista){
      pulo = self.lista[geracao_new - 2].escolha;
    } else {

    }
    }
  }
  if (Number.isInteger(geracao_new) && tamanho_pensamento < geracao_new) {
    let lembranca = function(acao, mediafit) { // Colocar o objeto pessoa no vetor
      this.acao = acao;
      this.mediafit = mediafit;
    };

    var elemento_pensamento = new lembranca;
    soma /= 10;
    elemento_pensamento.mediafit = soma;
    soma = 0;

    let escolha = int(random(0, 2));
    switch(escolha){
      case 0:
        elemento_pensamento.acao = 0;
        pensamento.push(elemento_pensamento);
        futuro = random(tax - (tax * 2), tax - 0.001);
         //console.log("Acho que preciso diminuir a mutação");
        //console.log(futuro);
        muta = parseFloat(Math.abs(futuro).toFixed(3));
        return futuro.toFixed(3);
      case 1:
        elemento_pensamento.acao = 1;
        pensamento.push(elemento_pensamento);
        futuro = random(tax + 0.001, tax + (tax * 2));
        //console.log("Acho que preciso aumentar a mutação");
        //console.log(futuro);
        muta = parseFloat(abs(futuro).toFixed(3));
        return futuro.toFixed(3);
       case 2:
        elemento_pensamento.acao = 2;
        pensamento.push(elemento_pensamento);
        futuro = tax;
        //console.log("A mutação tá boa assim");
        //console.log(futuro);
        muta = parseFloat(Math.abs(futuro).toFixed(3));
        return futuro.toFixed(3);
    }
  }
  soma += popula[0].fitness;
  return tax;
}

function mutacao(dna, taxamt) {
  let tamanho_dna = dna.length;
  for (let i = 0; i < tamanho_dna; i++) {
    let tmp = random(1);
    let char = Math.floor(random(63, 122));
    if (char === 63) char = 32;
    if (char === 64) char = 46;
    if (tmp < taxamt) {
      dna = dna.replaceAt(i, String.fromCharCode(char) ); //Posição, Caractere
    }
  }
  return dna;
}


function criar_pop(n, nome) {


  geracao = 0;
  let len = nome.length;
  geracao += 1;
  quantidade_pop = n;
  let word;
  let pessoa = function(gene, fitness) { // Colocar o objeto pessoa no vetor
    this.gene = gene;
    this.fitness = fitness;
  };



  for (let i = 0; i < n; i++) {
    for (let j = 0; j < len; j++) {
      if (word === undefined) {
        word = String.fromCharCode(random(32, 319));
      } else {
        word = word + String.fromCharCode(random(32, 319));
      }
    }
    pessoa.gene = word;
    append(popula, new pessoa(word, 0))
    word = undefined;
  }

}

function dynamicSort(property) {
  let sortOrder = 1;
  if (property[0] === "-") {
    sortOrder = -1;
    property = property.substr(1);
  }
  return function(a, b) {
    var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
    return result * sortOrder;
  }
}

function similarity(s1, s2) {
  let longer = s1;
  let shorter = s2;

  if (s1.length < s2.length) {
    longer = s2;
    shorter = s1;
  }
  var longerLength = longer.length;
  if (longerLength == 0) {
    return 1.0;
  }
  return (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength);
}

function editDistance(s1, s2) { // // O()

  var costs = new Array();
  let length_s1 = s1.length;
  let length_s2 = s2.length;
  for (let i = 0; i <= length_s1; i++) {
    var lastValue = i;
    for (let j = 0; j <= length_s2; j++) {
      if (i == 0)
        costs[j] = j;
      else {
        if (j > 0) {
          var newValue = costs[j - 1];
          if (s1.charAt(i - 1) != s2.charAt(j - 1))
            newValue = Math.min(Math.min(newValue, lastValue),
              costs[j]) + 1;
          costs[j - 1] = lastValue;
          lastValue = newValue;
        }
      }
    }
    if (i > 0)
      costs[length_s2] = lastValue;
  }
  return costs[length_s2];
}

function fitness() {
  quantidade_pop = popula.length;
  soma_pesos = 0;
  soma_fitness = 0;
  var count = 0;
  for (i = 0; i < quantidade_pop; i++) {
    count += similarity(popula[i].gene, nome);
    count = (count * 100);
    popula[i].fitness = Math.pow(count,4);
    soma_fitness += popula[i].fitness;
    soma_pesos += count;
    count = 0;

  }
  popula.sort(dynamicSort("-fitness")); // Quick Sort -> n log n
}

function checar() {
  quantidade_pop = popula.length;
  for (let i = 0; i < quantidade_pop; i++) {
    if (popula[i].gene == nome) {
      return false;
    } else {
      return true;
    }
  }
}


function selecionar(soma) {
  peso_aleatorio = parseInt(random(1, soma));
  peso_aleatorio2 = parseInt(random(1, soma));
  quantidade_pop = popula.length;
  let next = 0;
  let seen = 0;
  pai_index = 0;
  mae_index = 0;
  for (i = 0; i < quantidade_pop; i++) {
    next += popula[i].fitness;
    if (seen < peso_aleatorio <= seen + next) {
      pai_index = i;
      break;
    }
    if (seen < peso_aleatorio2 <= seen + next) {
      mae_index = i;
      break;
    }
  }


}


function procriar() {
  let temp = new Array;
  quantidade_pop = popula.length;
  tamanho_nome = nome.length;
  for (v = 0; v < quantidade_pop; v++) {
    selecionar(soma_pesos);
    let tmp = mutacao(popula[pai_index].gene.substr(0, (tamanho_nome / 2)) + popula[mae_index].gene.substr(tamanho_nome / 2, tamanho_nome), taxa_dinamica(mutacao_l / 100));
    append(temp, tmp)
  }
  for (i = 0; i < quantidade_pop; i++) {

    popula[i].gene = temp[i];
  }
  temp = [];
  geracao += 1;
  fitness();

  if(geracao< 500 || geracao%10)
  addData( (popula[0].fitness/ 1000000).toFixed(2), geracao);


}



function tempo() {
  if (trigger == false) {
    elapsed++;
  }
}
function reinicia(){
  popula.length = 0;
  population = document.getElementById("populacao").value;
  elapsed = 0;
  criar_pop(population, nome);
}
function frase(obj){
trigger = false;
nome = obj.value;
if(nome == ''){
  nome="Hello World";
}
reinicia();
}

function pop_slider(obj){
  document.getElementById("pop_label").innerHTML = "População: "+obj.value+" elementos";
  reinicia();
}

function setup() {
  nome = "Hello World";
  population = 1000;
  criar_pop(1000, nome);
  fitness();
  setInterval(tempo, 1000);
  noCanvas();
}
String.prototype.limite = function(length) {
  return this.length > length ? this.substring(0, length) + " " : this;
}
function keyPressed() {
    if(trigger){
      noLoop();
    } else{
      loop();
    }

}

  var tempos_grafico= new Array();

function draw() {


  quantidade_pop = popula.length;
  let quantidade_dinamica = quantidade_pop;

  let str = "População:\n";
  switch (population) {
    case population >= 500 && population < 800:
      quantidade_dinamica /= 2;
      break;
    case population >= 800 && population < 1000:
      quantidade_dinamica /= 3;
      break;
    case population >= 1000 && population <= 2000:
      quantidade_dinamica /= 5;
      break;
  }
  for (let i = 0; i < quantidade_dinamica * 0.4; i++) {

    str += " " + (popula[i].gene)
      .limite(6);
    if (i % 20 == 0 && i != 0)
      str += "\n";
  }
  var tam = str.length;


  if (popula[0].gene == nome) {
    trigger = true;
  } else {
    trigger = false;
    procriar();
  }
    document.getElementById("list_popula").innerHTML = str;
  let atual = (popula[0].gene);
  document.getElementById("frase").innerHTML = atual

  let fit = popula[0].fitness / 1000000;
    document.getElementById("geracao").innerHTML = "Geração: " + geracao;
    document.getElementById("maior_fit").innerHTML = "Maior Fitness: " + (fit)
      .toFixed(2) + "%";

  let media_fit = (soma_fitness / quantidade_pop) / 1000000;
document.getElementById("media_fit").innerHTML = "Media de Fitness: " + media_fit.toFixed(2) + "%"
document.getElementById("tempo_geracao").innerHTML = 'Tempo de Geração: ' + elapsed + ' segundo(s)';

document.getElementById("muta_din").innerHTML = 'Mutação Dinâmica: ' + (muta * 100) + '%';

}
