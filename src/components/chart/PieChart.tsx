import React, { useEffect } from 'react';
import Chart from 'chart.js/auto';

const PieChart: React.FC = () => {
    useEffect(() => {
        const ctx = document.getElementById('myPieChart') as HTMLCanvasElement;

        // Crear un nuevo gráfico
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
                    }    
                },
                cutout: 60    
            }
        });

        // Guardar la instancia del gráfico en el canvas
        (ctx as any).chartInstance = myPieChart;

        // Limpieza del efecto
        return () => {
            if (myPieChart) {
                myPieChart.destroy();
            }
        };
    }, []);

    return (
        <canvas id="myPieChart"></canvas>
    );
};

export default PieChart;
