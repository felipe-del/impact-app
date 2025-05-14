/**
 * AreaChart Component
 * 
 * This component renders an area chart using Chart.js and React.
 * It displays earnings data over a period of time.
 * It is used to visualize earnings trends in a dashboard or report.
 */
import { useEffect, useRef } from 'react';
import { Card } from 'react-bootstrap';
import { Chart } from 'chart.js/auto';

/**
 * Formats a number to a specified decimal and thousands separator.
 * 
 * @component
 * @param {number} number - The number to format.
 * @param {number} [decimals=0] - The number of decimal points to display.
 * @param {string} [dec_point='.'] - The decimal point character.
 * @param {string} [thousands_sep=','] - The thousands separator character.
 * @returns {string} The formatted number as a string.
 */
function number_format(
    number,
    decimals = 0,
    dec_point = '.',
    thousands_sep = ','
) {
    const n = isNaN(number) ? 0 : number;
    const prec = decimals >= 0 ? decimals : 0;
    const sep = thousands_sep || ',';
    const dec = dec_point || '.';
    const toFixedFix = (n, prec) => {
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

/**
 * AreaChart component that displays an area chart using Chart.js.
 * * @returns {JSX.Element} The rendered AreaChart component.
*/
const AreaChart = () => {
    const chartRef = useRef(null);
    const chartInstanceRef = useRef(null);

    useEffect(() => {
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
                },
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
                                callback: (value) => '$' + number_format(Number(value))
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
                                    return datasetLabel + ': $' + number_format(context.raw);
                                }
                            }
                        }
                    }
                }
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
};

export default AreaChart;
