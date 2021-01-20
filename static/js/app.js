d3.json("samples.json").then((data) => {

    //console.log(data);
    //unpack the data from samples jason
    function unpack(rows, index){
        return rows.map(function(row){
            return row[index];
        })

    }

    //Extract names, metadata and samples arrays from the data
    var names = data.names;
    var metadata = data.metadata;
    var samples = data.samples;

    //Call the optionChanged function whwenver a new Test Subject ID is selected from the drop down
    
    d3.selectAll("#selDataset").on("change", optionChanged);

    var subjectIDDD = d3.select("#selDataset");
    for (i=0 ; i < names.length ; i++)
    {
        //create the test subject ID drop down from names array in samples dataset
        var option = subjectIDDD.append("option");
        option.text(names[i]);
        option.property("value", names[i]);
    }
    optionChanged();
    //function to display bar chart, takes in the parameters, otu_id, sample_valeus and otu_labels
    function buildHorizontalPlot(otu_ids, sample_values, otu_labels){
        console.log(`Bar Chart Data`)
        console.log(`OTU ID: `+otu_ids);
        console.log(`Sample Values : `+sample_values);
        console.log(`OTU Labels` + otu_labels);

        //create an array of OUT IDs, this will be used to display the bar chart in reverse order
        otus = [];
        for (i=0;i<10;i++){
            otus.push(`OTU `+otu_ids[i]);
        }
        //creating trace and layout for the bar chart
        var trace = {
            x: sample_values.slice(0,10).reverse(),
            y: otus.reverse(),
            type : "bar",
            orientation : "h",
            text : otu_labels.slice(0,10).reverse()
        }
        var bardata = [trace];
        var layout = {
            title : "Individual OTU Chart",
            //yaxis:{range: otu_ids.slice(0,10), showlegend:true},
            //xaxis:{title: "Values"}
        }
        //Display bar chart
        Plotly.newPlot("bar", bardata, layout);
    }

    //function to display bubble chart, takes parameters OTU_IDs, sample_values and otu_labels
    function buildBubbleChart(otu_ids, sample_values, otu_labels){
        console.log(`Bubble Chart Data`)
        console.log(`OTU ID: `+otu_ids);
        console.log(`Sample Values : `+sample_values);
        console.log(`OTU Labels` + otu_labels);

        //create trace and layout for bubble chart
        var trace1 = {
            x: otu_ids,
            y: sample_values,
            type : "scatter",
            text : otu_labels,
            mode : "markers",
            marker : {
                    color : otu_ids,
                    size : sample_values
            }
        } 
        var bubbledata = [trace1];
        var layout1 = {
            title : "Bubble Chart for OTU IDs and Sample Values",
            //yaxis:{range: otu_ids.slice(0,10), showlegend:true},
            xaxis:{title: "OTU ID"}
        }
        Plotly.newPlot("bubble", bubbledata, layout1);
    }
//Bonus part of the exercise, included it here instead of adding it in bonus.js
    //function to build guage chart

    function buildGaugeChart(washfrq){
      //var level = parseFloat(washfrq)*20;
     
        var data = [{
            values: [90, 10, 10, 10, 10, 10,10,10,10,10],
            labels: ["","0-1", "1-2", "2-3", "3-4", "4-5", "5-6", "6-7", "7-8", "8-9"],
            marker: {
                colors: [
                    'rgb(255, 255, 255)',
                    'rgb(232,226,202)',
                    'rgb(226,210,172)',
                    'rgb(223,189,139)',
                    'rgb(223,162,103)',
                    'rgb(226,126,64)',
                    'rgb(226,210,172)',
                    'rgb(223,189,139)',
                    'rgb(223,162,103)',
                    'rgb(226,126,64)'
                ]
            },
            domain: {"x": [0, 0.48]},
            name: "Gauge",
            hole: .5,
            type: "pie",
            direction: "clockwise",
            rotation: 90,
            showlegend: false,
            textinfo: "label",
            textposition: "inside",
            hoverinfo: "none"
        }];

        //set the locx and locy variables according to wash frequency, this will be used to draw the line in the gauge chart.
        var locx = 0.0;
        var locy = 0.0;
        if(washfrq >= 0.0 && washfrq <= 1.0)
        {
            locx = 0.05;
            locy = 0.55;
        }
        else if (washfrq >1.0 && washfrq <= 2.0)
        {
            locx = 0.04;
            locy = 0.65;
        }
        else if (washfrq >2.0 && washfrq <= 3.0)
        {
            locx = 0.1;
            locy = 0.8;
        }
        else if (washfrq >3.0 && washfrq <= 4.0)
        {
            locx = 0.175;
            locy = 0.85;
        }
        else if (washfrq >4.0 && washfrq <= 5.0)
        {
            locx = 0.25;
            locy = 0.85;
        }
        else if (washfrq >5.0 && washfrq <= 6.0)
        {
            locx = 0.3;
            locy = 0.85;
        }
        else if (washfrq >6.0 && washfrq <= 7.0)
        {
            locx = 0.375;
            locy = 0.85;
        }
        else if (washfrq >7.0 && washfrq <= 8.0)
        {
            locx = 0.4;
            locy = 0.7;
        }
        else if (washfrq >8.0 && washfrq <= 9.0)
        {
            locx = 0.45;
            locy = 0.55;
        }
        var layout = {
          shapes:[{
              type: 'line',
              x0: 0.25,
              y0: 0.5,
              x1: locx,
              y1: locy,
              line: {
                color: 'black',
                width: 3
              }
            }],
          title: `Belly Button Wash Frequency`,
          xaxis: {visible: false, range: [-1, 1]},
          yaxis: {visible: false, range: [0, 1]}
        }; 
        Plotly.newPlot('gauge', data, layout);
      }
        
      //This function is triggered whenever the user makes a selection in the drop down.
      
    function optionChanged(){
        //var table = ``;
        var dropdownMenu = d3.select("#selDataset");
       var i =0;
        var id = dropdownMenu.property("value");
        for (j =0; j<samples.length;j++){
            if (samples[j]["id"] === id)
            {
                i=j;
                break;
            }
        }


        console.log(`Selected ID:` + samples[i]["id"]);

        //create the demographics table for the selected subject ID
        var demotable = d3.select("#sample-metadata");
        
        demotable.selectAll("table").remove();
        var table = demotable.append("table");
        var tbody = table.append("tbody");
        var keys = Object.keys(metadata[i]);
        var values = Object.values(metadata[i]);
        for (j=0;j<keys.length;j++){
            var row = tbody.append("tr");
            var td0 = row.append("td");
            td0.text(keys[j]+`:     `);
            var td1 = row.append("td");
            td1.text(values[j]);
        }
        console.log(`Selected ID:` + samples[i]["id"]);

        //Invoke functions to draw charts (bar, bubble and guage)
        buildHorizontalPlot(samples[i]["otu_ids"], samples[i]["sample_values"],samples[i]["otu_labels"]);
        buildBubbleChart(samples[i]["otu_ids"], samples[i]["sample_values"],samples[i]["otu_labels"]);
        console.log(values[values.length-1]);
        //Bonus part of the exercise. Included the code in the same file instead of adding it in bonus.js
        buildGaugeChart(values[values.length-1]);
        //gaugechart();
    }
  });
  

