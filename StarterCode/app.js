d3.json("samples.json").then((data) => {

    console.log(data);
    function unpack(rows, index){
        return rows.map(function(row){
            return row[index];
        })

    }

    var names = data.names;
    var metadata = data.metadata;
    var samples = data.samples;
    //var keys = Object.keys(samples[0]);
    //console.log(`Keys`+ keys);
    /* var ids = [];
    var otu_ids = [];
    var sample_value = []; */
   
    //console.log(samples[0]["id"]);
    d3.selectAll("#selDataset").on("change", optionChanged);

    var subjectIDDD = d3.select("#selDataset");
    for (i=0 ; i < names.length ; i++)
    {
        var option = subjectIDDD.append("option");
        option.text(names[i]);
        option.property("value", names[i]);
    }
    function buildHorizontalPlot(otu_ids, sample_values, otu_labels){
        console.log(`Bar Chart Data`)
        console.log(`OTU ID: `+otu_ids);
        console.log(`Sample Values : `+sample_values);
        console.log(`OTU Labels` + otu_labels);
        otus = [];
        for (i=0;i<10;i++){
            otus.push(`OTU `+otu_ids[i]);
        }
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
        Plotly.newPlot("bar", bardata, layout);
    }
    function buildBubbleChart(otu_ids, sample_values, otu_labels){
        console.log(`Bubble Chart Data`)
        console.log(`OTU ID: `+otu_ids);
        console.log(`Sample Values : `+sample_values);
        console.log(`OTU Labels` + otu_labels);
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
    function buildGaugeChart(washfrq){
      var level = parseFloat(washfrq)*20;

        var data = [
            {
                //domain: 
                x: [0], y: [0],
                value: washfrq,
                text: level,
                type: "scatter"
                
            },
            {
              rotation: 90,
              values: [1/9, 1/9, 1/9, 1/9, 1/9, 1/9, 1/9, 1/9, 1/9, 9],
              text: ["0-1", "1-2", "2-3", "3-4", "4-5", "5-6", "6-7", "7-8", "8-9"],
              marker: {
                colors: ["rgba(255, 0, 0, 0.6)", "rgba(255, 165, 0, 0.6)", "rgba(255, 255, 0, 0.6)", "rgba(144, 238, 144, 0.6)", "rgba(154, 205, 50, 0.6)", "white"]
              },
              labels: ["0-10", "10-50", "50-200", "200-500", "500-2000", ""],
              type: "pie",
              showlegend: false,
              hole: 0.4,
              rotation: 90,
              hoverinfo: "label"
              //values: [1/9, 1/9, 1/9, 1/9, 1/9, 1/9, 1/9, 1/9, 1/9, 9]

            }
        ]; 
        var layout = {
          shapes:[{
              type: 'path',
              x0: 0,
              y0: 0,
              x1: 0.5,
              y1: 0.5,
              line: {
                color: 'black',
                width: 8
              }
            }],
          title: `Belly Button Wash Frequency`,
          xaxis: {visible: false, range: [-1, 1]},
          yaxis: {visible: false, range: [0, 1]}
        }; 
        Plotly.newPlot('gauge', data, layout);
      }
        
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
        buildHorizontalPlot(samples[i]["otu_ids"], samples[i]["sample_values"],samples[i]["otu_labels"]);
        buildBubbleChart(samples[i]["otu_ids"], samples[i]["sample_values"],samples[i]["otu_labels"]);
        console.log(values[-1]);
        buildGaugeChart(values[-1]);
        //gaugechart();
    }
  });
  

