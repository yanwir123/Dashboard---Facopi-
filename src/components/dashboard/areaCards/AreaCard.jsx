import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

const AreaCard = ({ colors, cardInfo }) => {
  const [customerData, setCustomerData] = useState([]);
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
        setCustomerData(data.Data);
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

  const renderTooltipContent = (dataKey = "Sub Year") => {
    return `${((dataKey / 360) * 100).toFixed(0)}%`; // Mengubah format menjadi persentase dengan dua angka di belakang koma
  };

  return (
    <div className="area-card">
      <div className="area-card-info">
        <h5 className="info-title">{cardInfo.title}</h5>
        <div className="info-value">{cardInfo.value}</div>
        <p className="info-text">{cardInfo.text}</p>
      </div>
      <div className="area-card-chart">
        <PieChart width={100} height={100}>
          <Pie
            data={customerData}
            cx={50}
            cy={45}
            innerRadius={20}
            fill="#e4e8ef"
            paddingAngle={0}
            dataKey="Pemasukan Month"
            startAngle={-270}
            endAngle={150}
            stroke="none"
          >
            {customerData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
              />
            ))}
          </Pie>
          <Pie
            data={customerData}
            cx={50}
            cy={45}
            innerRadius={20}
            fill="#475be8"
            paddingAngle={0}
            dataKey="Pengeluaran Month"
            startAngle={-270}
            endAngle={150}
            stroke="none"
          >
            {customerData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
              />
            ))}
          </Pie>
          <Tooltip formatter={renderTooltipContent} />
        </PieChart>
      </div>
    </div>
  );
};

export default AreaCard;

AreaCard.propTypes = {
  colors: PropTypes.array.isRequired,
  cardInfo: PropTypes.object.isRequired,
};
