import { useState, useEffect } from "react";
import AreaTableAction from "./AreaTableAction";
import "./AreaTable.scss";

const TABLE_HEADS = [
  "Products",
  "Order ID",
  "Date",
  "Payment",
  "Sold",
  "Total Sold",
  "Action",
];

const AreaTable = () => {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    // Simulate fetching data from an API
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:1213/api/DataMahasiswa/GetDataFacopi"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setTableData(data.Data); // Update state with fetched data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures this runs once on component mount

  return (
    <section className="content-area-table">
      <div className="data-table-info">
        <h4 className="data-table-title">Orderan Teratas</h4>
      </div>
      <div className="data-table-diagram">
        <table>
          <thead>
            <tr>
              {TABLE_HEADS?.map((th, index) => (
                <th key={index}>{th}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData?.map((dataItem) => (
              <tr key={dataItem.Kode}>
                <td>{dataItem["Nama Kopi"]}</td>
                <td>{dataItem.Kode}</td>
                <td>{dataItem["Varian"]}</td>
                <td>{dataItem["Keterangan"]}</td>
                <td>{dataItem["Harga"]}</td>
                <td>{dataItem["Stok"]}</td>
                {/* Assuming you have a similar structure for Action component */}
                <td className="dt-cell-action">
                  <AreaTableAction />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default AreaTable;
