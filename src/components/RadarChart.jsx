import React, { useRef, useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';
import { useInView } from 'framer-motion';
import { useTheme } from '../hooks/useTheme';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const RadarChart = () => {
  const { currentTheme, themes } = useTheme();
  const themeColors = themes[currentTheme]?.colors || themes['cyber'].colors;
  
  const primaryColor = themeColors['--neon-cyan'];
  const secondaryColor = themeColors['--neon-purple'];

  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isInView, hasAnimated]);

  // Provide alpha channel helper to create glowing background colors
  const hexToRgba = (hex, alpha) => {
    let r = 0, g = 0, b = 0;
    if (hex.length === 4) {
      r = parseInt(hex[1] + hex[1], 16);
      g = parseInt(hex[2] + hex[2], 16);
      b = parseInt(hex[3] + hex[3], 16);
    } else if (hex.length === 7) {
      r = parseInt(hex.substring(1, 3), 16);
      g = parseInt(hex.substring(3, 5), 16);
      b = parseInt(hex.substring(5, 7), 16);
    }
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  const data = {
    labels: ['Frontend', 'Backend', 'AI/ML', 'DevOps', 'Database', 'Problem Solving'],
    datasets: [
      {
        label: 'Skill Level',
        data: hasAnimated ? [90, 85, 95, 75, 80, 95] : [0, 0, 0, 0, 0, 0], // Animate from 0 to actual values
        backgroundColor: hexToRgba(primaryColor, 0.2),
        borderColor: primaryColor,
        borderWidth: 2,
        pointBackgroundColor: secondaryColor,
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: secondaryColor,
        pointRadius: 4,
        pointHoverRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 2000,
      easing: 'easeOutQuart',
    },
    scales: {
      r: {
        angleLines: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
          circular: true,
        },
        pointLabels: {
          color: 'rgba(255, 255, 255, 0.7)',
          font: {
            family: "'Fira Code', 'Courier New', monospace",
            size: 12,
          },
        },
        ticks: {
          display: false,
          min: 0,
          max: 100,
          stepSize: 20,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        titleColor: primaryColor,
        bodyColor: '#fff',
        borderColor: secondaryColor,
        borderWidth: 1,
        padding: 12,
        displayColors: false,
        titleFont: {
          family: "'Fira Code', 'Courier New', monospace",
          size: 14,
        },
        bodyFont: {
          family: "'Fira Code', 'Courier New', monospace",
          size: 14,
          weight: 'bold',
        },
        callbacks: {
          label: function(context) {
            return `Proficiency: ${context.raw}%`;
          }
        }
      },
    },
  };

  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-full min-h-[300px] md:min-h-[400px] p-4 group"
    >
      <div 
        className="absolute inset-0 bg-transparent blur-[50px] opacity-20 pointer-events-none transition-colors duration-500"
        style={{ backgroundColor: primaryColor }}
      ></div>
      <div className="relative z-10 w-full h-full flex items-center justify-center">
        <Radar data={data} options={options} />
      </div>
    </div>
  );
};

export default RadarChart;
