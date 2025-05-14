/**
 * PieChart Component
 * 
 * This component renders a pie chart using Chart.js and React.
 * It displays data with labels and values.
 * It is used to visualize data distribution in a dashboard or report.
 * It also shows a toast notification if there are more than 12 months.
 */
import { useEffect } from 'react';
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';

/**
 * PieChart component that displays a pie chart using Chart.js.
 * 
 * @component
 * @returns {JSX.Element} The rendered PieChart component.
 */
const PieChart = () => {
    useEffect(() => {
        const ctx = document.getElementById('myPieChart');

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
                        display: true,
                        position: 'top',
                        labels: {
                            padding: 20
                        }
                    },
                    datalabels: {
                        color: '#fff',
                        font: {
                            weight: 'bold',
                            size: 14,
                        },
                        formatter: (value) => `${value}%`,
                        align: 'center',
                        anchor: 'center',
                    }
                },
                cutout: 50
            },
            plugins: [ChartDataLabels]
        });

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
