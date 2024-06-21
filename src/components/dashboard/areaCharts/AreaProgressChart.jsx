import { useState, useEffect } from "react";

const AreaProgressChart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:1213/api/DataMahasiswa/GetDataFacopi"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const responseData = await response.json();
        setData(responseData.Data);
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

  return (
    <div className="progress-bar">
      <div className="progress-bar-info">
        <h4 className="progress-bar-title">Most Sold Coffee</h4>
      </div>
      <div className="progress-bar-list">
        {data.map((progressbar) => {
          return (
            <div className="progress-bar-item" key={progressbar.Data}>
              <div className="bar-item-info">
                <p className="bar-item-info-name">{progressbar["Nama Kopi"]}</p>
                <p className="bar-item-info-value">
                  {progressbar["Sub_Total"]}
                </p>
              </div>
              <div className="bar-item-full">
                <div
                  className="bar-item-filled"
                  style={{
                    width: `${progressbar}%`,
                  }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AreaProgressChart;
