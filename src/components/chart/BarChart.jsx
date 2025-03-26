import React, { useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { toast } from "react-hot-toast";

const BarChart = ({ data }) => {
  // Verificar si hay más de 12 meses al montar el componente
  useEffect(() => {
    if (data?.labels && data.labels.length > 12) {
      toast.error('El gráfico solo puede mostrar un máximo de 12 meses', {
        position: 'bottom-right',
      });
    }
  }, [data?.labels]);

  // Limitar a 12 meses si hay más
  const limitedLabels = data?.labels ? data.labels.slice(0, 12) : ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago'];
  const limitedValues = data?.values ? data.values.slice(0, 12) : [12, 19, 3, 5, 2, 3];


  const extendedColors = [
    '#e74a3b', '#f6c23e', '#36b9cc', '#1abc9c', '#8e44ad', '#e84393',
    '#3498db', '#2ecc71', '#f39c12', '#9b59b6', '#e91e63', '#16a085',
    '#d35400', '#c0392b', '#2980b9', '#27ae60', '#f1c40f', '#8e44ad'
  ];

  const chartData = {
    labels: limitedLabels,
    datasets: [
      {
        label: 'Ingresos de activos',
        data: limitedValues,
        backgroundColor: limitedLabels.map((_, index) => extendedColors[index % extendedColors.length]),
        borderColor: limitedLabels.map((_, index) => extendedColors[index % extendedColors.length]),
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      datalabels: {
        anchor: 'end',
        align: 'top',
        color: '#000',
        font: {
          weight: 'bold',
          size: 12,
        },
        formatter: (value) => `${value}`,
      },
    },
  };

  return <Bar data={chartData} options={chartOptions} plugins={[ChartDataLabels]} />;
};

export default BarChart;