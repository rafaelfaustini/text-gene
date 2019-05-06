let coeficienteTempo=0; // Coeficiente para ajustar o tempo em troca de população, guarda o instante em ms
let popula = new Array();
let pensamento = new Array();
let geracao = 0;
let quantidade_pop;
let tamanho_nome;
let soma_pesos = 0;
let soma_fitness = 0;
let population;
var nome;
var mutacao_l = 5;
let soma = 0;
let muta = 0.05;
let pai_index = 0;
let mae_index = 0;
let trigger = false;
let dinamica = true;
$("#formMutacao").hide();

String.prototype.replaceAt = function(index, character) {
  return this.substr(0, index) + character + this.substr(index + character.length);
};

function inputMutacao(obj){
  valor = obj.value;
  if(isNaN(valor)){
    return;
  }
  muta = valor/100;
  reinicia();
}

function toggleDinamica(obj){
 dinamica = !dinamica;
 $("#formMutacao").hide();
 if(!dinamica){
   muta = 0.1
   $("#formMutacao").show();
 }
 reinicia();
}

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
  tax = abs(tax);
  if (Number.isInteger(geracao_new) && tamanho_pensamento < geracao_new && !isNaN(tax) && tax !== undefined) {
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
      // Diminui a mutação

      muta = parseFloat(Math.abs(futuro)).toFixed(3);

      return futuro.toFixed(3);
      case 1:
      elemento_pensamento.acao = 1;
      pensamento.push(elemento_pensamento);
      futuro = random(tax + 0.001, tax + (tax * 2));
      // Aumenta a mutação
      muta = parseFloat(abs(futuro)).toFixed(3);

      return futuro.toFixed(3);
      case 2:
      elemento_pensamento.acao = 2;
      pensamento.push(elemento_pensamento);
      futuro = tax;
      // Mantém a mutação
      muta = parseFloat(Math.abs(futuro)).toFixed(3);

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
  popula.length = 0;
  geracao = 0;
  let len = nome.length;
  quantidade_pop = n;
  let word;
  let pessoa = function(gene, fitness) { // Colocar o objeto pessoa no vetor
    this.gene = gene;
    this.fitness = fitness;
  };
  grafico.add(0,0,geracao)
  grafico.add(1,muta*100,geracao)
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


function similaridade(s1, s2){
  var count = 0
  tamanho = s1.length;
  for(var i=0; i<tamanho; i++){
    if(s1[i] == s2[i]){
      count++;
    }
  }

  porcentagem = (100*count) / tamanho;
  return porcentagem/100;
}


function fitness() {
  quantidade_pop = popula.length;
  soma_pesos = 0;
  soma_fitness = 0;
  var count = 0;
  for (i = 0; i < quantidade_pop; i++) {
    count += similaridade(popula[i].gene, nome);
    count = (count * 100);
    popula[i].fitness = Math.pow(count,2)/10000;
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

function isDinamica(){
return dinamica;
}

function procriar() {
  let temp = new Array;
  quantidade_pop = popula.length;
  tamanho_nome = nome.length;
  for (v = 0; v < quantidade_pop; v++) {
    selecionar(soma_pesos);
    var valor=mutacao_l;
    if(isDinamica()){
      valor = taxa_dinamica(muta)
    }

    let tmp = mutacao(popula[pai_index].gene.substr(0, (tamanho_nome / 2)) + popula[mae_index].gene.substr(tamanho_nome / 2, tamanho_nome), valor);
    append(temp, tmp)
  }
  for (i = 0; i < quantidade_pop; i++) {

    popula[i].gene = temp[i];
  }
  temp = [];
  geracao += 1;
  fitness();

 let maior = popula[0];
  if(geracao< 60 || geracao%10==0 || maior.fitness == 1){
   let valor = formataFit(popula[0].fitness)
   grafico.add(0, valor, geracao);
   grafico.add(1, muta*100,geracao)

}


}
function reinicia(){
  noLoop();
  grafico.clear();
  coeficienteTempo = millis();
  if(nome == "Hello World")
  nome= language.default;
  criar_pop(population, nome);
  fitness();
  trigger = false;
  loop();
}
function frase(obj){
  trigger = false;
  nome = obj.value;
  if(nome == ''){
    nome=language.default;
  }
  reinicia();
}

function pop_slider(obj){
  population = obj.value;
  document.getElementById("pop_label").innerHTML = language.population+" "+obj.value+" "+language.elements;
  reinicia();
}

function setup() {
  nome = language.default;
  population = 1000;
  criar_pop(1000, nome);
  fitness();
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

function formataFit(numero){
  numero *= 100;
  return formataNumero(numero);
}

function formataNumero(num){
  return (Math.round( num * 100 ) / 100).toFixed(2);
}

function showGeracao(numero){
  document.getElementById("geracao").innerHTML = language.generation+" " + numero;
}
function showMaiorFit(numero){
numero = formataFit(numero)
  document.getElementById("maior_fit").innerHTML = language.best +" " +" " +" " +" " +" " + numero + "%";
}
function showMediaFit(soma, tamanhoPop){
    let media_fit = (soma / tamanhoPop) / 100;
    media_fit = formataNumero(media_fit);
    document.getElementById("media_fit").innerHTML = language.average +" " + media_fit + "%"
}
function showTempoDecorrido(){
  tempo = millis() - coeficienteTempo;
  if(tempo> 1000){
      document.getElementById("tempo_geracao").innerHTML = language.elapsed +" " + (tempo/1000).toFixed(1) + ' s';
  } else {
      document.getElementById("tempo_geracao").innerHTML = language.elapsed +" " + tempo.toFixed(1) + ' ms';
  }
}
function showFrase(frase){
    document.getElementById("frase").innerHTML = frase;
}
function showMutacao(valor, dinAtivada){
    valor *= 100;
    valor = formataNumero(valor);
    var str = 'Mutação: ';
    if(dinAtivada){
      str= 'Mutação Dinâmica: ';
    }
    document.getElementById("muta_din").innerHTML = str + valor + '%';
}
function showListaPop(text){
    document.getElementById("list_popula").innerHTML = text;
}

function checarFim(e){
  // Condição de término atingida ?
  if (e.gene == nome || e.fitness == 10000) {
    trigger = true; // Fim
  } else {
    trigger = false; // Cria nova população
    procriar();
  }
}

var tempos_grafico= new Array();

function draw() {

  if(trigger){
    noLoop();
  }
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

  var maiorElemento = popula[0];

  checarFim(maiorElemento)
  showListaPop(str)
  showFrase(maiorElemento.gene)
  showGeracao(geracao)
  showMaiorFit(maiorElemento.fitness)
  showMediaFit(soma_fitness, quantidade_pop)
  showTempoDecorrido()
  showMutacao(muta, dinamica)
}
