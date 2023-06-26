// Create a variable for the url 

const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

// Fetch the console log the JSON data

d3.json(url).then(function(data) {
    console.log(data);
});

// Initialize dashboard

function init() {

    let dropdownMenu = d3.select("#selDataset");

    d3.json(url).then((data) => {

        // Set a variable for sample names
        let names = data.names;

        names.forEach((id) => {

            console.log(id);

            dropdownMenu.append("option")
            .text(id)
            .property("value",id);
        });

        // Start from the first sample in list

        let sample_1 = names[0];

        // Log value for sample_1
        
        console.log(sample_1)

        // Initial plots

        buildMetadata(sample_1);
        buildBarChart(sample_1);
        buildBubbleChart(sample_1);
        buildGaugeChart(sample_1);


    });
};

// Populate metadata info

function buildMetadata(sample) {

    // Use D3 to retrieve data
    d3.json(url).then((data) => {

        // Retrieve all metadata
        let metadata = data.metadata;

        // Filter based on the value of the sample
        let value = metadata.filter(result => result.id == sample);

        // Log the array
        console.log(value)

        // Start at the first index
        let valueData = value[0];

        // Clear metadata
        d3.select("#sample-metadata").html("");

        Object.entries(valueData).forEach(([key, value]) => {

            // Log the key/value pairs
            console.log(key,value);

            d3.select("#sample-metadata").append("h5").text(`${key}: ${value}`);
        });
    });
};

// Building the bar chart

function buildBarChart(sample) {

    // Use D3
    d3.json(url).then((data) => {

        // Retrieve sample data
        let sampleInfo = data.samples;

        // Filter by sample value
        let value = sampleInfo.filter(result => result.id == sample);

        // Start at the first index
        let valueData = value[0];

        // Retrieve otu_ids, labels, and sample values

        let otu_ids = valueData.otu_ids;

        let otu_labels = valueData.otu_labels;

        let sample_values = valueData.sample_values;

        // Log data

        console.log(otu_ids, otu_labels, sample_values);

        // Display the top 10 items in descending order

        let yticks = otu_ids.slice(0,10).map(id => `OTU ${id}`).reverse();
        let xticks = sample_values.slice(0,10).reverse();
        let labels = otu_labels.slice(0,10).reverse();
      
      // Set up the trace for the bar chart
        let trace = {
            x: xticks,
            y: yticks,
            text: labels,
            type: "bar",
            orientation: "h"
        
      };

      // Setup the layout
        let layout = {
            title: "Top 10 OTUs Present"
      };

      // Call Plotly to plot the bar chart
      Plotly.newPlot("bar", [trace], layout)
  });
};

// Build the bubble chart

function buildBubbleChart(sample) {

    // Use D3 to retrieve data
    d3.json(url).then((data) => {

        // Retrieve data
        let sampleInfo = data.samples;

        // Filter by sample value
        let value = sampleInfo.filter(result => result.id == sample);

        // Get the first index
        let valueData = value[0];

        // Get otu ids, labels, and sample values
        let otu_ids = valueData.otu_ids;

        let otu_labels = valueData.otu_labels;

        let sample_values = valueData.sample_values;

        // Log data to console
        console.log(otu_ids, otu_labels, sample_values);

        // Create trace for bubble chart
        let trace_1 = {
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: "markers",
            marker: {
                size: sample_values,
                color: otu_ids,
                colorscale: "Earth"
            }
        };

        // Set up layout
        let layout = {
            title: "Bacteria Per Sample",
            hovermode: "closest",
            xaxis: {title: "OTU ID"},
        };

        // Use Plotly to create bubble chart
        Plotly.newPlot("bubble", [trace_1], layout)
        
    });
};

// Create a function that updates the dashboard when a sample is changed

function optionChanged(value) {

    // Log the value
    console.log(value);

    // Call the functions
    buildMetadata(value);
    buildBarChart(value);
    buildBubbleChart(value);
    buildGaugeChart(value);
};

init();

