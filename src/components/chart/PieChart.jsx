import { useEffect } from 'react';
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';

const PieChart = () => {
    useEffect(() => {
        const ctx = document.getElementById('myPieChart');

        // Create a new pie chart
        const myPieChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ["Direct", "Referral", "Social"],
                datasets: [{
                    data: [55, 30, 15],
                    backgroundColor: ['#4e73df', '#1cc88a', '#36b9cc'],
                    hoverBackgroundColor: ['#2e59d9', '#17a673', '#2c9faf'],
                    hoverBorderColor: "rgba(234, 236, 244, 1)",
                }],
            },
            options: {
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true
                    },
                    datalabels: { // Configuración de datalabels
                        color: '#fff', // Color de las etiquetas
                        font: {
                            weight: 'bold',
                            size: 14,
                        },
                        formatter: (value) => `${value}%`, // Mostrar el porcentaje
                        align: 'center', // Centrado horizontal
                        anchor: 'center', // Centrado vertical
                    }
                },
                cutout: 60
            },
            plugins: [ChartDataLabels] // Incluir el plugin en la configuración
        });

        // Clean up the effect
        return () => {
            if (myPieChart) {
                myPieChart.destroy();
            }
        };
    }, []);

    return (
        <div style={{ position: 'relative', height: '250px', width: '250px' }}>
            <canvas id="myPieChart"></canvas>
        </div>
    );
};

export default PieChart;
