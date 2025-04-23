import React, { useEffect } from 'react';
import { Chart } from 'react-chartjs-2';
import { chartOptions } from './chartConfig';
import { toast } from "react-hot-toast";

const ComboChart = ({ incomeData, loanData }) => {
  // Verificar si hay más de 12 meses al montar el componente
  useEffect(() => {
    const labels = incomeData?.labels || loanData?.labels;
    if (labels && labels.length > 12) {
      toast.error('El gráfico solo puede mostrar un máximo de 12 meses', {
        position: 'bottom-center',
      });
    }
  }, [incomeData?.labels, loanData?.labels]);

  // Limitar a 12 meses si hay más
  const labels = incomeData?.labels || loanData?.labels || ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'];
  const limitedLabels = labels.slice(0, 12);
  
  const incomeValues = incomeData?.values || [12, 19, 3, 5, 2, 3];
  const loanValues = loanData?.values || [5, 10, 8, 12, 6, 9];
  
  const limitedIncomeValues = incomeValues.slice(0, 12);
  const limitedLoanValues = loanValues.slice(0, 12);

  const extendedColors = [
    '#36b9cc', '#1abc9c', '#e74a3b', '#f6c23e', '#8e44ad', '#e84393',
    '#3498db', '#2ecc71', '#f39c12', '#9b59b6', '#e91e63', '#16a085',
    '#d35400', '#c0392b', '#2980b9', '#27ae60', '#f1c40f', '#8e44ad'
  ];

  // Configuración para gráfico combinado
  const comboOptions = {
    ...chartOptions,
    scales: {
      ...chartOptions.scales,
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Cantidad'
        }
      }
    }
  };

  const chartData = {
    labels: limitedLabels,
    datasets: [
      {
        type: 'bar',
        label: 'Préstamos',
        data: limitedLoanValues,
        backgroundColor: limitedLabels.map((_, index) => 
          `rgba(${parseInt(extendedColors[index % extendedColors.length].substring(1, 3), 16)}, 
                ${parseInt(extendedColors[index % extendedColors.length].substring(3, 5), 16)}, 
                ${parseInt(extendedColors[index % extendedColors.length].substring(5, 7), 16)}, 0.75)`
        ),
        borderColor: limitedLabels.map((_, index) => 
          `rgba(${parseInt(extendedColors[index % extendedColors.length].substring(1, 3), 16)}, 
                ${parseInt(extendedColors[index % extendedColors.length].substring(3, 5), 16)}, 
                ${parseInt(extendedColors[index % extendedColors.length].substring(5, 7), 16)}, 0.5)`
        ),
        borderWidth: 1,
      },
      {
        type: 'line',
        label: 'Ingresos',
        data: limitedIncomeValues,
        backgroundColor: '#e74a3b',
        borderColor: '#e74a3b',
        borderWidth: 2,
        tension: 0.1,
        fill: false,
      },
    ],
  };

  return <Chart type='bar' data={chartData} options={comboOptions} />;
};

export default ComboChart;