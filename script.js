var popula = new Array();
var geracao = 0;
var quantidade_pop;
var soma_pesos = 0;
var pop = 100;
var nome = "Hello World";
var Frase = "Hello World";
var População = 500;
var PopulaçãoMin = 2;
var PopulaçãoMax = 2000;
var myFont;
var overpass;
var Mutação= 1;
var MutaçãoMin= 0;
var MutaçãoMax= 100;
trigger = false;
taxa = 0.01;


String.prototype.replaceAt = function(index, character) {
    return this.substr(0, index) + character + this.substr(index + character.length);
};

function mutacao(dna, taxamt) {
    for (i = 0; i < dna.length; i++) {
        if (random(1) < taxamt) {
            dna = dna.replaceAt(i, String.fromCharCode(random(32, 319))); //Posição, Caractere
        }
    }
    return dna;
}


function criar_pop(n, nome) {

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
        popula.push(new pessoa(word, 0));
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

function fitness() {
    var count = 0;
    soma_pesos = 0;
    for (i = 0; i < popula.length; i++) {
        for (j = 0; j < nome.length; j++) {
            if (popula[i].gene[j] == nome[j])
                count += 1;
        }
        count = (count / nome.length) * 100;
        popula[i].fitness = count;
        soma_pesos += count;
        count = 0;
    }
    popula.sort(dynamicSort("-fitness"));
}

function checar() {

    for (i = 0; i < popula.length; i++) {
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

    for (i = 0; i < popula.length; i++) {
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
    for (v = 0; v < popula.length; v++) {
        selecionar(soma_pesos);
        temp.push(mutacao(popula[pai_index].gene.substr(0, (nome.length / 2)) + popula[mae_index].gene.substr(nome.length / 2, nome.length), Mutação/100));
    }



    for (i = 0; i < popula.length; i++) {

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

function setup() {
    nome = "Hello World";
    pop = 500;
textFont(myFont);
    if (nome != '') {
        nome = Frase;
    } else {
        nome = "Hello World";
    }

    if (pop < 1) {
        pop = População;
    }

    criar_pop(pop, nome);
    fitness();

    sliderRange(5, 2000, 1);
    sliderRange(0, 100, 1);
    gui = createGui('Opções');
    gui.addGlobals('Frase', 'População', 'Mutação');
    createCanvas(windowWidth, windowHeight);

}

function draw() {
    if (nome != Frase && Frase != "") {
        trigger = false;
        nome = Frase;
        popula.length = 0;
        criar_pop(População, nome);

    }
    if (População != pop) {
        trigger = false;
        pop = População;
        popula.length = 0;
        criar_pop(População, nome);
    }
    if (População != pop) {
        trigger = false;
        pop = População;
        popula.length = 0;
        criar_pop(População, nome);
    }
    if (nome != '') {

        nome = Frase;
    }


    if (População > 1 || Frase == "") {
        trigger = true;
    }
    background(39,174,96);
    textSize(32);

    var str = "População: \n ";
    for (i = 0; i < popula.length; i++) {
        str = str + " " + popula[i].gene;
        if(i%20 == 0)
        str = str + "\n";

    }

    for (i = 0; i < popula.length; i++) {
        if (popula[0].gene == nome) {
            trigger = true;
        } else {
            trigger = false;
        }
        if (trigger == false) {
            procriar();


        }
    }
    textSize(10);
    textFont(overpass);
    text(str, 10, 360);
    fill(255, 255, 255);
    textFont(myFont);
    textSize(25);
    text("Geração: " + geracao, 10, 180);
    fill(255, 255, 255);
    textSize(64);

    text(popula[0].gene, (windowWidth - textWidth(popula[0].gene)) / 2, 320);
    textSize(25);
    fill(255, 255,255);
    text("Maior Fitness: " + (popula[0].fitness).toFixed(2)+"%", 10, 230);
    fill(255,255, 255);
    text("Media de Fitness: " + (soma_pesos / popula.length).toFixed(2)+"%", 10, 255);

}
