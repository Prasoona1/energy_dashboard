// Utility functions for generating realistic data
function randomBetween(min, max, decimals = 2) {
    const value = Math.random() * (max - min) + min;
    return Number(value.toFixed(decimals));
}

function generateTimeSeriesData(days = 30) {
    const departments = ['Assembly', 'Welding', 'Machining', 'Paint Shop', 'Quality Control'];
    const processes = {
        'Assembly': ['Main Line', 'Sub-Assembly', 'Final Testing'],
        'Welding': ['Spot Welding', 'Arc Welding', 'Laser Welding'],
        'Machining': ['CNC Milling', 'Lathe Operations', 'Grinding'],
        'Paint Shop': ['Surface Prep', 'Base Coat', 'Clear Coat'],
        'Quality Control': ['Visual Inspection', 'Dimensional Check', 'Performance Test']
    };

    // Generate base patterns for each department
    const departmentPatterns = {};
    departments.forEach(dept => {
        departmentPatterns[dept] = {
            baseEnergy: randomBetween(0.5, 2.0),
            powerFactorBase: randomBetween(0.85, 0.95),
            voltageBase: randomBetween(220, 240),
            currentBase: randomBetween(10, 30)
        };
    });

    const data = [];
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    // Generate data for each day
    for (let i = 0; i < days; i++) {
        const currentDate = new Date(startDate);
        currentDate.setDate(currentDate.getDate() + i);
        const dateString = currentDate.toISOString().split('T')[0];

        // Add daily variation factor (simulating work days vs weekends)
        const isWeekend = currentDate.getDay() === 0 || currentDate.getDay() === 6;
        const dayFactor = isWeekend ? 0.6 : 1.0;

        departments.forEach(dept => {
            processes[dept].forEach(process => {
                // Add some random variation to base values
                const pattern = departmentPatterns[dept];
                const energyVariation = randomBetween(0.9, 1.1);
                const powerFactorVariation = randomBetween(0.98, 1.02);
                
                data.push({
                    date: dateString,
                    department: dept,
                    processName: process,
                    energyPerUnit: pattern.baseEnergy * dayFactor * energyVariation,
                    powerFactor: Math.min(0.98, pattern.powerFactorBase * powerFactorVariation),
                    voltage: pattern.voltageBase * randomBetween(0.98, 1.02),
                    current: pattern.currentBase * dayFactor * randomBetween(0.9, 1.1),
                    efficiency: randomBetween(75, 95)
                });
            });
        });
    }

    return data;
}

// Generate initial data
const sampleData = generateTimeSeriesData(30);

// Initialize dashboard
document.addEventListener('DOMContentLoaded', () => {
    updateStats();
    createCharts();
    setupDateSelector();
});

// Update top stats
function updateStats() {
    // Calculate average power factor
    const avgPowerFactor = sampleData.reduce((acc, curr) => acc + curr.powerFactor, 0) / sampleData.length;
    document.getElementById('avgPowerFactor').textContent = avgPowerFactor.toFixed(3);

    // Calculate total energy consumption
    const totalEnergy = sampleData.reduce((acc, curr) => acc + curr.energyPerUnit, 0);
    document.getElementById('totalEnergy').textContent = `${totalEnergy.toFixed(2)} kWh`;

    // Count unique departments
    const departments = new Set(sampleData.map(item => item.department));
    document.getElementById('activeDepts').textContent = departments.size;
}

// Create all charts
function createCharts() {
    createEnergyTrendChart();
    createDepartmentConsumptionChart();
    createPowerFactorChart();
    createProcessEfficiencyChart();
}

// Energy Trend Chart
function createEnergyTrendChart() {
    const aggregatedData = aggregateDataByDate(sampleData, 'energyPerUnit');
    
    const ctx = document.getElementById('energyTrendChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: aggregatedData.map(d => d.date),
            datasets: [{
                label: 'Energy per Unit',
                data: aggregatedData.map(d => d.value),
                borderColor: '#8884d8',
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
}

// Department Consumption Chart
function createDepartmentConsumptionChart() {
    const aggregatedData = aggregateDataByDepartment(sampleData, 'energyPerUnit');
    
    const ctx = document.getElementById('deptConsumptionChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: aggregatedData.map(d => d.department),
            datasets: [{
                label: 'Energy per Unit',
                data: aggregatedData.map(d => d.value),
                backgroundColor: '#82ca9d'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
}

// Utility function to aggregate data by date
function aggregateDataByDate(data, metric) {
    const aggregated = {};
    data.forEach(item => {
        if (!aggregated[item.date]) {
            aggregated[item.date] = {
                date: item.date,
                value: 0,
                count: 0
            };
        }
        aggregated[item.date].value += item[metric];
        aggregated[item.date].count += 1;
    });

    return Object.values(aggregated).map(item => ({
        date: item.date,
        value: Number((item.value / item.count).toFixed(2))
    }));
}

// Utility function to aggregate data by department
function aggregateDataByDepartment(data, metric) {
    const aggregated = {};
    data.forEach(item => {
        if (!aggregated[item.department]) {
            aggregated[item.department] = {
                department: item.department,
                value: 0,
                count: 0
            };
        }
        aggregated[item.department].value += item[metric];
        aggregated[item.department].count += 1;
    });

    return Object.values(aggregated).map(item => ({
        department: item.department,
        value: Number((item.value / item.count).toFixed(2))
    }));
}
// Utility functions for generating realistic data
function randomBetween(min, max, decimals = 2) {
    const value = Math.random() * (max - min) + min;
    return Number(value.toFixed(decimals));
}

// Generate sine wave pattern for natural-looking cycles
function generateSinePattern(day, amplitude = 0.5, period = 7) {
    return amplitude * Math.sin(2 * Math.PI * day / period);
}

function generateTimeSeriesData(days = 30) {
    const departments = ['Assembly', 'Welding', 'Machining', 'Paint Shop', 'Quality Control'];
    const processes = {
        'Assembly': ['Main Line', 'Sub-Assembly', 'Final Testing'],
        'Welding': ['Spot Welding', 'Arc Welding', 'Laser Welding'],
        'Machining': ['CNC Milling', 'Lathe Operations', 'Grinding'],
        'Paint Shop': ['Surface Prep', 'Base Coat', 'Clear Coat'],
        'Quality Control': ['Visual Inspection', 'Dimensional Check', 'Performance Test']
    };

    // Generate base patterns for each department with more variation
    const departmentPatterns = {};
    departments.forEach(dept => {
        departmentPatterns[dept] = {
            baseEnergy: randomBetween(0.5, 2.0),
            powerFactorBase: randomBetween(0.85, 0.95),
            voltageBase: randomBetween(220, 240),
            currentBase: randomBetween(10, 30),
            // Add trend factors for each department
            trendFactor: randomBetween(-0.02, 0.02), // Creates slight upward or downward trends
            volatility: randomBetween(0.05, 0.15)    // How much daily variation
        };
    });

    const data = [];
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    // Generate data for each day
    for (let i = 0; i < days; i++) {
        const currentDate = new Date(startDate);
        currentDate.setDate(currentDate.getDate() + i);
        const dateString = currentDate.toISOString().split('T')[0];

        // Add daily variation factors
        const isWeekend = currentDate.getDay() === 0 || currentDate.getDay() === 6;
        const dayFactor = isWeekend ? 0.6 : 1.0;
        
        // Add seasonal pattern
        const seasonalFactor = 1 + generateSinePattern(i, 0.15, 30);
        
        // Generate weather impact (random daily weather effect)
        const weatherImpact = randomBetween(0.9, 1.1);

        departments.forEach(dept => {
            const pattern = departmentPatterns[dept];
            
            // Calculate daily trend
            const trendImpact = 1 + (i * pattern.trendFactor);
            
            // Add random daily volatility
            const dailyVolatility = 1 + randomBetween(-pattern.volatility, pattern.volatility);

            processes[dept].forEach(process => {
                // Calculate final multipliers
                const totalFactor = dayFactor * seasonalFactor * weatherImpact * trendImpact * dailyVolatility;
                
                // Add more dramatic daily variations to power factor
                const powerFactorDaily = pattern.powerFactorBase * 
                    (1 + generateSinePattern(i, 0.05, 3)) * // 3-day cycle
                    (1 + randomBetween(-0.02, 0.02));     // Random daily variation

                // Generate energy consumption with multiple factors
                const baseEnergy = pattern.baseEnergy * 
                    (1 + generateSinePattern(i, 0.2, 7)) * // Weekly cycle
                    totalFactor;

                data.push({
                    date: dateString,
                    department: dept,
                    processName: process,
                    energyPerUnit: Number(baseEnergy.toFixed(2)),
                    powerFactor: Number(Math.min(0.98, powerFactorDaily).toFixed(3)),
                    voltage: Number((pattern.voltageBase * (1 + randomBetween(-0.02, 0.02))).toFixed(1)),
                    current: Number((pattern.currentBase * totalFactor).toFixed(1)),
                    efficiency: Number((85 + generateSinePattern(i, 7, 5) + randomBetween(-2, 2)).toFixed(1))
                });
            });
        });
    }

    return data;
}


// Power Factor Chart
function createPowerFactorChart() {
    const aggregatedData = aggregateDataByDate(sampleData, 'powerFactor');
    
    const ctx = document.getElementById('powerFactorChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: aggregatedData.map(d => d.date),
            datasets: [{
                label: 'Power Factor',
                data: aggregatedData.map(d => d.value),
                borderColor: '#ff7300',
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    min: 0.8,
                    max: 1.0
                }
            }
        }
    });
}

// Process Efficiency Chart
function createProcessEfficiencyChart() {
    const aggregatedData = sampleData.reduce((acc, curr) => {
        if (!acc[curr.processName]) {
            acc[curr.processName] = {
                processName: curr.processName,
                value: 0,
                count: 0
            };
        }
        acc[curr.processName].value += curr.efficiency;
        acc[curr.processName].count += 1;
        return acc;
    }, {});

    const chartData = Object.values(aggregatedData).map(item => ({
        processName: item.processName,
        value: Number((item.value / item.count).toFixed(2))
    }));

    const ctx = document.getElementById('processEfficiencyChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: chartData.map(d => d.processName),
            datasets: [{
                label: 'Efficiency (%)',
                data: chartData.map(d => d.value),
                backgroundColor: '#8884d8'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    min: 70,
                    max: 100
                }
            }
        }
    });
}

// Setup date selector
function setupDateSelector() {
    const dateSelector = document.getElementById('dateSelector');
    const maxDate = new Date().toISOString().split('T')[0];
    dateSelector.value = maxDate;
    
    dateSelector.addEventListener('change', (e) => {
        const selectedDate = e.target.value;
        const filteredData = sampleData.filter(item => item.date === selectedDate);
        updateChartsWithData(filteredData);
    });
}

// Update charts with new data
function updateChartsWithData(data) {
    // Remove existing charts
    document.querySelectorAll('.chart-container').forEach(canvas => {
        canvas.remove();
    });

    // Recreate canvas elements
    document.querySelectorAll('.card-content').forEach(content => {
        if (content.closest('.date-selector')) return;
        const canvas = document.createElement('canvas');
        canvas.className = 'chart-container';
        canvas.id = content.querySelector('canvas')?.id;
        content.appendChild(canvas);
    });

    // Recreate charts with filtered data
    createCharts();
    // ... [Previous data generation code remains the same until the chart creation] ...

// Global variable to store chart instances so we can destroy them before recreating

// ... [Previous data generation code remains the same until the chart creation] ...

// Global variable to store chart instances
//Global variable to store chart instances
let charts = {
    energyTrend: null,
    deptConsumption: null,
    powerFactor: null,
    processEfficiency: null
};

// Global variable for data
let sampleData = [];

// Generate initial data
function initializeData() {
    sampleData = generateTimeSeriesData(30);
}

// Create Energy Trend Chart
function createEnergyTrendChart(filteredData) {
    const ctx = document.getElementById('energyTrendChart').getContext('2d');
    
    if (charts.energyTrend) {
        charts.energyTrend.destroy();
    }

    const aggregatedData = aggregateDataByDate(filteredData, 'energyPerUnit');
    
    charts.energyTrend = new Chart(ctx, {
        type: 'line',
        data: {
            labels: aggregatedData.map(d => d.date),
            datasets: [{
                label: 'Energy per Unit',
                data: aggregatedData.map(d => d.value),
                borderColor: '#8884d8',
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
}

// Create Department Consumption Chart
function createDepartmentConsumptionChart(filteredData) {
    const ctx = document.getElementById('deptConsumptionChart').getContext('2d');
    
    if (charts.deptConsumption) {
        charts.deptConsumption.destroy();
    }

    const aggregatedData = aggregateDataByDepartment(filteredData, 'energyPerUnit');
    
    charts.deptConsumption = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: aggregatedData.map(d => d.department),
            datasets: [{
                label: 'Energy per Unit',
                data: aggregatedData.map(d => d.value),
                backgroundColor: '#82ca9d'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
}

// Create Power Factor Chart
function createPowerFactorChart(filteredData) {
    const ctx = document.getElementById('powerFactorChart').getContext('2d');
    
    if (charts.powerFactor) {
        charts.powerFactor.destroy();
    }

    const aggregatedData = aggregateDataByDate(filteredData, 'powerFactor');
    
    charts.powerFactor = new Chart(ctx, {
        type: 'line',
        data: {
            labels: aggregatedData.map(d => d.date),
            datasets: [{
                label: 'Power Factor',
                data: aggregatedData.map(d => d.value),
                borderColor: '#ff7300',
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    min: 0.8,
                    max: 1.0
                }
            }
        }
    });
}

// Create Process Efficiency Chart
function createProcessEfficiencyChart(filteredData) {
    const ctx = document.getElementById('processEfficiencyChart').getContext('2d');
    
    if (charts.processEfficiency) {
        charts.processEfficiency.destroy();
    }

    const aggregatedData = filteredData.reduce((acc, curr) => {
        if (!acc[curr.processName]) {
            acc[curr.processName] = {
                processName: curr.processName,
                value: 0,
                count: 0
            };
        }
        acc[curr.processName].value += curr.efficiency;
        acc[curr.processName].count += 1;
        return acc;
    }, {});

    const chartData = Object.values(aggregatedData).map(item => ({
        processName: item.processName,
        value: Number((item.value / item.count).toFixed(2))
    }));

    charts.processEfficiency = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: chartData.map(d => d.processName),
            datasets: [{
                label: 'Efficiency (%)',
                data: chartData.map(d => d.value),
                backgroundColor: '#8884d8'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    min: 70,
                    max: 100
                }
            }
        }
    });
}

// Update stats
function updateStats(filteredData) {
    // Calculate average power factor
    const avgPowerFactor = filteredData.reduce((acc, curr) => acc + curr.powerFactor, 0) / filteredData.length;
    document.getElementById('avgPowerFactor').textContent = avgPowerFactor.toFixed(3);

    // Calculate total energy consumption
    const totalEnergy = filteredData.reduce((acc, curr) => acc + curr.energyPerUnit, 0);
    document.getElementById('totalEnergy').textContent = `${totalEnergy.toFixed(2)} kWh`;

    // Count unique departments
    const departments = new Set(filteredData.map(item => item.department));
    document.getElementById('activeDepts').textContent = departments.size;
}

// Update all charts and stats
function updateDashboard(selectedDate) {
    // Filter data for selected date
    const filteredData = sampleData.filter(item => item.date === selectedDate);
    
    // Update stats and charts with filtered data
    updateStats(filteredData);
    createEnergyTrendChart(filteredData);
    createDepartmentConsumptionChart(filteredData);
    createPowerFactorChart(filteredData);
    createProcessEfficiencyChart(filteredData);
}

// Setup date selector
function setupDateSelector() {
    const dateSelector = document.getElementById('dateSelector');
    
    // Get unique dates from data
    const dates = [...new Set(sampleData.map(item => item.date))].sort();
    
    // Set date range and default value
    dateSelector.min = dates[0];
    dateSelector.max = dates[dates.length - 1];
    dateSelector.value = dates[dates.length - 1];
    
    // Add event listener for date changes
    dateSelector.addEventListener('change', (e) => {
        updateDashboard(e.target.value);
    });

    // Initial update with default date
    updateDashboard(dateSelector.value);
}

// Initialize dashboard
document.addEventListener('DOMContentLoaded', () => {
    initializeData();
    setupDateSelector();
});
let alertActive = false; // Track if an alert is already active

function checkAlerts(data) {
    const notifications = [];
    let criticalAlert = false;

    // Loop through the data to check for issues
    data.forEach(item => {
        if (item.powerFactor < 0.85) {
            notifications.push(`Low power factor detected in ${item.department} (${item.processName}) on ${item.date}`);
            criticalAlert = true; // Trigger alert if power factor is low
        }
        if (item.current > 30) {
            notifications.push(`High current detected in ${item.department} (${item.processName}) on ${item.date}`);
            criticalAlert = true; // Trigger alert if current is high
        }
    });

    // Display notifications in the list
    const notificationsSection = document.getElementById('notifications');
    notificationsSection.innerHTML = notifications.length
        ? notifications.map(note => `<li>${note}</li>`).join('')
        : '<li>No alerts</li>';

    // Trigger the red alert banner if there are critical alerts and no alert is already active
    if (criticalAlert && !alertActive) {
        const alertBanner = document.getElementById('redAlert');
        const alertMessage = document.getElementById('alertMessage');
        alertMessage.textContent = "Critical Alert: Check for equipment malfunction!";
        alertBanner.style.display = "block"; // Show the alert banner
        alertActive = true; // Set alert as active
    }
}

// Function to dismiss the red alert
function dismissAlert() {
    const alertBanner = document.getElementById('redAlert');
    alertBanner.style.display = "none"; // Hide the alert banner
    alertActive = false; // Reset the alert to allow new alerts to be triggered
}

}