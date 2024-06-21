import { useState, useEffect, useContext } from "react";
import {
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Line,
} from "recharts";
import { ThemeContext } from "../../../context/ThemeContext";
import { FaArrowUpLong } from "react-icons/fa6";
import { LIGHT_THEME } from "../../../constants/themeConstants";
import "./AreaChart.scss";

const AreaLineChart = () => {
  const { theme } = useContext(ThemeContext);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:1213/api/DataDataFacopi/GetKeuanganFacopi"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setChartData(data.Data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const formatTooltipValue = (value) => `${value}k`;

  const formatYAxisLabel = (value) => `${value}k`;

  const formatLegendValue = (value) =>
    value.charAt(0).toUpperCase() + value.slice(1);

  return (
    <div className="area-line-chart">
      <div className="area-line-chart-info">
        <h5 className="area-line-chart-title">Total Pendapatan</h5>
        <div className="area-line-chart-info-data">
          <div className="info-data-value">$85.00</div>
          <div className="info-data-text">
            <FaArrowUpLong />
            <p>17% than last month.</p>
          </div>
        </div>
      </div>
      <div className="area-line-chart-wrapper">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            width={500}
            height={200}
            data={chartData}
            margin={{
              top: 5,
              right: 5,
              left: 0,
              bottom: 5,
            }}
          >
            <XAxis
              padding={{ left: 10 }}
              dataKey="Keterangan"
              tickSize={0}
              axisLine={false}
              tick={{
                fill: theme === LIGHT_THEME ? "#676767" : "#f3f3f3",
                fontSize: 14,
              }}
            />
            <YAxis
              padding={{ bottom: 10, top: 10 }}
              tickFormatter={formatYAxisLabel}
              tickCount={6}
              axisLine={false}
              tickSize={0}
              tick={{
                fill: theme === LIGHT_THEME ? "#676767" : "#f3f3f3",
              }}
            />
            <Tooltip
              formatter={formatTooltipValue}
              cursor={{ fill: "transparent" }}
              contentStyle={{
                color: theme === LIGHT_THEME ? "#000" : "#fff",
                backgroundColor: theme === LIGHT_THEME ? "#fff" : "#000",
                border: `1px solid ${theme === LIGHT_THEME ? "#000" : "#fff"}`,
              }}
            />
            <Legend
              iconType="circle"
              iconSize={10}
              verticalAlign="top"
              align="right"
              formatter={formatLegendValue}
            />
            <Line
              dataKey="Penjualan Bersih"
              stroke={theme === LIGHT_THEME ? "#475be8" : "#bbdefb"}
              strokeWidth={2}
              dot={{
                stroke: theme === LIGHT_THEME ? "#475be8" : "#bbdefb",
                strokeWidth: 2,
                fill: "#fff",
              }}
              activeDot={{
                stroke: theme === LIGHT_THEME ? "#475be8" : "#bbdefb",
                strokeWidth: 2,
                r: 6,
              }}
            />
            <Line
              dataKey="Total Penjualan"
              stroke={theme === LIGHT_THEME ? "#676767" : "#f3f3f3"}
              strokeWidth={2}
              dot={{
                stroke: theme === LIGHT_THEME ? "#676767" : "#f3f3f3",
                strokeWidth: 2,
                fill: "#fff",
              }}
              activeDot={{
                stroke: theme === LIGHT_THEME ? "#676767" : "#f3f3f3",
                strokeWidth: 2,
                r: 6,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AreaLineChart;
