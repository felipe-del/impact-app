import React, { useEffect, useRef } from 'react';
import { Card } from 'react-bootstrap';
import Chart, { ChartData, ChartOptions } from 'chart.js/auto';
import ChartInstance from 'chart.js/auto';

// Function to format numbers
function number_format(
    number: number,
    decimals: number = 0,
    dec_point: string = '.',
    thousands_sep: string = ','
): string {
    const n = isNaN(number) ? 0 : number;
    const prec = decimals >= 0 ? decimals : 0;
    const sep = thousands_sep || ',';
    const dec = dec_point || '.';
    const toFixedFix = (n: number, prec: number) => {
        const k = Math.pow(10, prec);
        return (Math.round(n * k) / k).toFixed(prec);
    };

    let s = toFixedFix(n, prec).split('.');
    s[0] = s[0].replace(/\B(?=(\d{3})+(?!\d))/g, sep);
    if ((s[1] || '').length < prec) {
        s[1] = s[1] || '';
        s[1] += new Array(prec - s[1].length + 1).join('0');
    }
    return s.join(dec);
}

// AreaChart component
const AreaChart: React.FC = () => {
    const chartRef = useRef<HTMLCanvasElement>(null);
    const chartInstanceRef = useRef<ChartInstance | null>(null);

    useEffect(() => {
        // Chart.js configuration
        Chart.defaults.font.family = 'Nunito, -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';
        Chart.defaults.color = '#858796';

        if (chartRef.current) {
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
            }
            chartInstanceRef.current = new Chart(chartRef.current, {
                type: 'line',
                data: {
                    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                    datasets: [{
                        label: "Earnings",
                        tension: 0.3,
                        backgroundColor: "rgba(78, 115, 223, 0.05)",
                        borderColor: "rgba(78, 115, 223, 1)",
                        pointRadius: 3,
                        pointBackgroundColor: "rgba(78, 115, 223, 1)",
                        pointBorderColor: "rgba(78, 115, 223, 1)",
                        pointHoverRadius: 3,
                        pointHoverBackgroundColor: "rgba(78, 115, 223, 1)",
                        pointHoverBorderColor: "rgba(78, 115, 223, 1)",
                        pointHitRadius: 10,
                        pointBorderWidth: 2,
                        data: [0, 10000, 5000, 15000, 10000, 20000, 15000, 25000, 20000, 30000, 25000, 40000],
                    }],
                } as ChartData<'line'>,
                options: {
                    maintainAspectRatio: false,
                    layout: {
                        padding: {
                            left: 10,
                            right: 25,
                            top: 25,
                            bottom: 0
                        }
                    },
                    scales: {
                        x: {
                            type: 'category',
                            grid: {
                                display: false,
                                drawBorder: false
                            },
                            ticks: {
                                maxTicksLimit: 7
                            }
                        },
                        y: {
                            ticks: {
                                maxTicksLimit: 5,
                                padding: 10,
                                callback: (value: number | string) => '$' + number_format(Number(value))
                            },
                            grid: {
                                color: "rgb(234, 236, 244)",
                                zeroLineColor: "rgb(234, 236, 244)",
                                drawBorder: false,
                                borderDash: [2],
                                zeroLineBorderDash: [2]
                            }
                        }
                    },
                    plugins: {
                        legend: {
                            display: false
                        },
                        tooltip: {
                            backgroundColor: "rgb(255,255,255)",
                            bodyColor: "#858796",
                            titleMarginBottom: 10,
                            titleColor: '#6e707e',
                            titleFont: {
                                size: 14
                            },
                            borderColor: '#dddfeb',
                            borderWidth: 1,
                            padding: {
                                x: 15,
                                y: 15
                            },
                            displayColors: false,
                            intersect: false,
                            mode: 'index',
                            caretPadding: 10,
                            callbacks: {
                                label: (context) => {
                                    const datasetLabel = context.dataset.label || '';
                                    return datasetLabel + ': $' + number_format(context.raw as number);
                                }
                            }
                        }
                    }
                } as ChartOptions<'line'>
            });
        }

        return () => {
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
            }
        };
    }, []);

    return (
        <Card.Body>
            <div className="chart-area">
                <canvas ref={chartRef} id="myAreaChart"></canvas>
            </div>
        </Card.Body>
    );
}

export default AreaChart;
