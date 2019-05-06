class Grafico{
  constructor(listaLabels){
    var vetorDatasets = [];
    for(let i = 0; i<listaLabels.length; i++){
      var r = Math.floor((Math.random() * 255) + 1);
      var g = Math.floor((Math.random() * 255) + 1);
      var b = Math.floor((Math.random() * 255) + 1);
      var objDataset= {
                label: listaLabels[i],
                fill: true,
                lineTension: 0.2,
                backgroundColor: "rgba(253,"+g+","+b+",0.5)",
                borderColor: "rgba(255,255,255,1)",
                borderCapStyle: 'round',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: "rgba(163,255,15,1)",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 10,
                pointHoverRadius: 10,
                pointHoverBackgroundColor: "rgba("+r+","+g+","+b+")",
                pointHoverBorderColor: "rgba(220,220,220,0.5)",
                pointHoverBorderWidth: 1,
                pointStyle: "rectRot",
                pointRadius: 0.4,
                pointHitRadius: 5,
                data: [],
              };

              vetorDatasets.push(objDataset);

    }

    this.data = {
      labels: [],
      datasets: vetorDatasets,
    };

    this.option = {
      showLines: true,
      responsive: true,
      legend: {
            labels: {
                fontColor: '#fff'
            }
    },
    title: {
     display: true,
     fontColor: '#fff',
     text: language.title

 },
 scales: {
     yAxes: [{
         ticks: {
             beginAtZero:true,
             fontColor: '#fff'
         },
     }],
   xAxes: [{
         ticks: {
             fontColor: '#fff'
         },
     }]

}
    };

  }

  getData(){
    return this.data;
  }

  getOptions(){
    return this.option;
  }

  showLineChart(canvas){
      this.elemento= Chart.Line(canvas,{
      data:this.getData(),
      options:this.getOptions()
    });

  }

  getLineChart(){
    return this.elemento;
  }

  setLineChart(a){
    this.elemento = a;
  }

  add(id, label, data){
    let chart = this.getLineChart();
    if(label!=undefined && data!=undefined){
    var tamanhoAtual = chart.data.datasets[id].data.length;

    chart.data.datasets[id].data[tamanhoAtual] = label;
    chart.data.labels[tamanhoAtual] = geracao;
    this.setLineChart(chart);
    this.getLineChart().update();
    }
  }

  clear(){
  var chart = this.getLineChart();
    chart.data.labels.length = 0;
    for(let i = 0; i < chart.data.datasets.length; i++){
      chart.data.datasets[i].data.length=0; // Percorre o vetor de dados e limpa
    }
    this.setLineChart(chart)
    this.getLineChart().update();
  }

}
