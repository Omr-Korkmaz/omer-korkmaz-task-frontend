import { useEffect, useState } from "react";
import { Beer } from "../../types";
import { fetchData } from "./utils";
import { useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";

const BeerList = () => {
  const navigate = useNavigate();

  const [beerList, setBeerList] = useState<Array<Beer>>([]);

  // eslint-disable-next-line
  useEffect(fetchData.bind(this, setBeerList), []);

  const onRowClick = (params: { id: any }) => {
    if (params.id) {
      navigate(`/beer/${params.id}`);
    }
  };
  const columns = [
    {
      field: "Order",
      Name: "Order",
      width: 70,
      editable: true,
    },
    {
      field: "Name",
      Name: "Name",
      width: 150,
      editable: true,
    },
    {
      field: "Type",
      headerName: "Type",
      width: 100,
      editable: true,
    },
    {
      field: "City",
      headerName: "City",
      type: "number",
      width: 150,
      editable: true,
    },
    {
      field: "Country",
      headerName: "Country",
      type: "number",
      width: 150,
      editable: true,
    },
    {
      field: "Phone",
      headerName: "Phone",
      type: "number",
      width: 150,
      editable: true,
    },
  ];

  const rows = beerList.map((beer, index) => ({
    Order: index + 1,
    id: beer.id,
    Name: beer.name,
    Type: beer.brewery_type,
    City: beer.city,
    Country: beer.country,
    Phone: beer.phone,
  }));

  return (
    <article>
      <section>
        <header>
          <h1>Beer List</h1>
        </header>
        <main>
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              sx={{
                // disable cell selection style
                ".MuiDataGrid-cell:focus": {
                  outline: "none",
                },
                // pointer cursor on ALL rows
                "& .MuiDataGrid-row:hover": {
                  cursor: "pointer",
                  backgroundColor: "lightblue",
                },
              }}
              rows={rows}
              columns={columns}
              checkboxSelection={false}
              onCellClick={(params) => onRowClick(params)}
            />
          </div>
        </main>
      </section>
    </article>
  );
};

export default BeerList;
