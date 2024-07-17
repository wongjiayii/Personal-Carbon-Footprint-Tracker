document.getElementById('start-button').addEventListener('click', () => {
    document.getElementById('landing-page').style.display = 'none';
    document.getElementById('input-form').style.display = 'block';
});

document.getElementById('carbon-footprint-form').addEventListener('submit', function (event) {
    event.preventDefault();

    // Collect form data
    const clothingType = document.getElementById('clothing-type').value;
    const material = document.getElementById('material').value;
    const usageFrequency = parseInt(document.getElementById('usage-frequency').value, 10);
    const washingFrequency = parseInt(document.getElementById('washing-frequency').value, 10);

    // Calculate carbon footprint
    const emissionFactors = {
        'Cotton': 2.1,
        'Polyester': 3.8,
        'Wool': 5.5
    };
    const emissionFactor = emissionFactors[material] || 2.0; // Default factor if material is not listed
    const carbonFootprint = emissionFactor * (usageFrequency + (washingFrequency / 2));

    // Show results
    document.getElementById('input-form').style.display = 'none';
    document.getElementById('results-page').style.display = 'block';

    // Update insights
    const insightsText = `Your ${clothingType} made of ${material} has a carbon footprint of approximately ${carbonFootprint.toFixed(2)} kg CO2e.`;
    const encouragementMessage = getEncouragementMessage(carbonFootprint);
    document.getElementById('insights-text').innerText = `${insightsText} ${encouragementMessage}`;

    // Generate charts
    generateCharts(carbonFootprint);

    // Reset form
    this.reset();
});

document.getElementById('reset-button').addEventListener('click', () => {
    document.getElementById('results-page').style.display = 'none';
    document.getElementById('input-form').style.display = 'block';
});

function getEncouragementMessage(carbonFootprint) {
    if (carbonFootprint < 10) {
        return " Great job! You're making sustainable choices!";
    } else if (carbonFootprint >= 10 && carbonFootprint < 20) {
        return " Consider reducing your carbon footprint with more eco-friendly options.";
    } else {
        return " Your carbon footprint is significant. Look for ways to reduce it.";
    }
}

function generateCharts(carbonFootprint) {
    // Bar chart
    const ctxBar = document.getElementById('bar-chart').getContext('2d');
    new Chart(ctxBar, {
        type: 'bar',
        data: {
            labels: ['Clothing Item'],
            datasets: [{
                label: 'Carbon Footprint (kg CO2e)',
                data: [carbonFootprint],
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Pie chart (Example data)
    const ctxPie = document.getElementById('pie-chart').getContext('2d');
    new Chart(ctxPie, {
        type: 'pie',
        data: {
            labels: ['Cotton', 'Polyester', 'Wool', 'Other'],
            datasets: [{
                data: [30, 40, 20, 10],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)'
                ],
                borderWidth: 1
            }]
        }
    });

    // Line chart (Example data)
    const ctxLine = document.getElementById('line-chart').getContext('2d');
    new Chart(ctxLine, {
        type: 'line',
        data: {
            labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'],
            datasets: [{
                label: 'Carbon Footprint Trend (kg CO2e)',
                data: [10, 15, 8, 12, 11],
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                fill: false
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}
