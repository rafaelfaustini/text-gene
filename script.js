var elapsed = 0;﻿
var popula = new Array();
var geracao = 0;
var quantidade_pop;
var tamanho_nome;
var soma_pesos = 0;
var soma_fitness = 0;
var population;
var nome = "Hello World";
var Frase = "Hello World";
var População = 500;
var PopulaçãoMin = 2;
var PopulaçãoMax = 2000;
var myFont;
var overpass;
var Mutação = 1;
var MutaçãoMin = 0;
var MutaçãoMax = 100;
trigger = false;
taxa = 0.01;



String.prototype.replaceAt = function(index, character) {
  return this.substr(0, index) + character + this.substr(index + character.length);
};

function mutacao(dna, taxamt) {
  var tamanho_dna = dna.length;
  for (i = 0; i < tamanho_dna; i++) {
    if (random(1) < taxamt) {
      dna = dna.replaceAt(i, String.fromCharCode(random(32, 319))); //Posição, Caractere
    }
  }
  return dna;
}


function criar_pop(n, nome) {
  geracao = 0;
  var len = nome.length;
  geracao += 1;
  quantidade_pop = n;
  var word;
  var pessoa = function(gene, fitness) { // Colocar o objeto pessoa no vetor
    this.gene = gene;
    this.fitness = fitness;
  };



  for (i = 0; i < n; i++) {
    for (j = 0; j < len; j++) {
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
  var sortOrder = 1;
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
  var longer = s1;
  var shorter = s2;
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

function editDistance(s1, s2) {

  var costs = new Array();
  for (var i = 0; i <= s1.length; i++) {
    var lastValue = i;
    for (var j = 0; j <= s2.length; j++) {
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
      costs[s2.length] = lastValue;
  }
  return costs[s2.length];
}

function fitness() {
  quantidade_pop = popula.length;
  var count = 0;
  soma_pesos = 0;
  soma_fitness = 0;
  for (i = 0; i < quantidade_pop; i++) {
    count += similarity(popula[i].gene, nome);
    count = (count * 100);
    popula[i].fitness = count;
    popula[i].fitness = pow(popula[i].fitness, 4);
    soma_fitness += popula[i].fitness;
    soma_pesos += count;
    count = 0;

  }
  popula.sort(dynamicSort("-fitness"));
}

function checar() {
  quantidade_pop = popula.length;
  for (i = 0; i < quantidade_pop; i++) {
    if (popula[i].gene == nome) {
      return false;
    } else {
      return true;
    }
  }
}
var pai_index = 0;
var mae_index = 0;

function selecionar(soma) {
  peso_aleatorio = int(random(1, soma));

  peso_aleatorio2 = int(random(1, soma));
  quantidade_pop = popula.length;
  for (i = 0; i < quantidade_pop; i++) {
    peso_aleatorio = peso_aleatorio - popula[i].fitness;
    if (peso_aleatorio <= 0) {
      pai_index = 0;

    }
    peso_aleatorio2 = peso_aleatorio2 - popula[i].fitness;
    if (peso_aleatorio2 <= 0) {
      mae_index = 0;

    }
  }


}


function procriar() {
  var temp = new Array;
  quantidade_pop = popula.length;
  tamanho_nome = nome.length;
  for (v = 0; v < quantidade_pop; v++) {
    selecionar(soma_pesos);
    append(temp, mutacao(popula[pai_index].gene.substr(0, (tamanho_nome / 2)) + popula[mae_index].gene.substr(tamanho_nome / 2, tamanho_nome), Mutação / 100))
  }



  for (i = 0; i < quantidade_pop; i++) {

    popula[i].gene = temp[i];
  }
  temp = [];
  geracao += 1;

  fitness();

}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function preload() {
  myFont = loadFont('overpass.otf');
  overpass = loadFont('overpass-mono-regular.otf')
}

function tempo() {
  if (trigger == false) {
    elapsed++;
  }
}

function setup() {
  nome = "Hello World";

  textFont(myFont);
  if (nome != '') {
    nome = Frase;
  } else {
    nome = "Hello World";
  }

  if (population < 1) {
    population = População;
  }

  criar_pop(population, nome);
  fitness();

  sliderRange(5, 2000, 1);
  sliderRange(0, 100, 1);
  gui = createGui('Opções');
  gui.addGlobals('Frase', 'População', 'Mutação');
  createCanvas(windowWidth, windowHeight);
  setInterval(tempo, 1000);

}
String.prototype.limite = function(length) {
  return this.length > length ? this.substring(0, length) + "..." : this;
}

function draw() {
  if (nome != Frase && Frase != "") {
    trigger = false;
    nome = Frase;
    popula.length = 0;
    elapsed = 0;
    criar_pop(População, nome);

  }
  if (População != population) {
    trigger = false;
    population = População;
    popula.length = 0;
    elapsed = 0;
    criar_pop(População, nome);
  }
  if (População != population) {
    trigger = false;
    population = População;
    popula.length = 0;
    elapsed = 0;
    criar_pop(População, nome);
  }
  if (nome != '') {

    nome = Frase;
  }


  if (População > 1 || Frase == "") {
    trigger = true;
  }


  background(39, 174, 96);
  textSize(32);

  quantidade_pop = popula.length;
  quantidade_dinamica = quantidade_pop;

  var str = "População:\n";
  switch (População) {
    case População >= 500 && População < 800:
      quantidade_dinamica /= 2;
      break;
    case População >= 800 && População < 1000:
      quantidade_dinamica /= 3;
      break;
    case População >= 1000 && População <= 2000:
      quantidade_dinamica /= 5;
      break;
  }
  for (i = 0; i < quantidade_dinamica * 0.4; i++) {

    str = str + " " + (popula[i].gene)
      .limite(6);
    if (i % 20 == 0 && i != 0)
      str = str + "\n";
  }
  var tam = str.length;

  if (popula[0].gene == nome) {
    trigger = true;
  } else {
    trigger = false;
    procriar();
  }

  var size = 10;
  while (textWidth(str) + 55 < windowWidth) {
    size--;
  }
  textSize(size);
  textFont(overpass);
  text(str, 10, 380);
  fill(255, 255, 255);
  textFont(myFont);
  textSize(64);
  text(popula[0].gene, (windowWidth - textWidth(popula[0].gene)) / 2, 340);
  textSize(27);
  var fit = popula[0].fitness / 1000000;
  text("Geração: " + geracao, 10, 280);
  text("Maior Fitness: " + (fit)
    .toFixed(2) + "%", 10, 230);
  fill(255, 255, 255);
  var media_fit = (soma_fitness / quantidade_pop) / 1000000;
  text("Media de Fitness: " + media_fit.toFixed(2) + "%", 10, 255);
  textSize(27);
  textSize(20);
  text('Tempo de Geração: ' + elapsed + ' segundo(s)', 240, 40);
}