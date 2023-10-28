import { useEffect, useState } from "react";
import { Beer } from "../../types";
import { fetchData } from "./utils";
import {
  Avatar,
  Button,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  TextField,
} from "@mui/material";
import SportsBar from "@mui/icons-material/SportsBar";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import styles from "./BeerList.module.css";
import { DataGrid } from "@mui/x-data-grid";

const ITEMS_PER_PAGE = 15;

const BeerList = () => {
  const navigate = useNavigate();

  const [beerList, setBeerList] = useState<Array<Beer>>([]);

  // const [filterText, setFilterText] = useState<string>("");
  // const [currentPage, setCurrentPage] = useState<number>(1);
  // const [sortBy, setSortBy] = useState<string | null>(null);

  // eslint-disable-next-line
  useEffect(fetchData.bind(this, setBeerList), []);

  // const totalPages = Math.ceil(beerList.length / ITEMS_PER_PAGE);

  // const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setFilterText(event.target.value);
  //   setCurrentPage(1);
  // };

  // const handleSort = (criteria: string) => {
  //   setSortBy(criteria);

  //   setCurrentPage(1);
  // };

  // const sortBeerList = (list: Beer[]) => {
  //   if (sortBy === 'name') {
  //     return list.slice().sort((a, b) => a.name.localeCompare(b.name));
  //   }
  //   return list;
  // };

  // const filteredBeerList = beerList.filter((beer) =>
  //   beer.name.toLowerCase().includes(filterText.toLowerCase())
  // );

  // const sortedBeerList = sortBeerList(filteredBeerList);
  // const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  // const endIndex = startIndex + ITEMS_PER_PAGE;
  // const currentBeerList = sortedBeerList.slice(startIndex, endIndex);

  // const onBeerClick = (id: string) => navigate(`/beer/${id}`);

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

          {/* 
          <div>
            <TextField
              label="Filter..."
              variant="outlined"
              value={filterText}
              onChange={handleFilterChange}
            />
            <Button variant="contained" onClick={() => handleSort("name")}>
              Sort by Name
            </Button>
          </div>
          <List>
            {currentBeerList.map((beer) => (
              <ListItemButton
                key={beer.id}
                onClick={onBeerClick.bind(this, beer.id)}
              >
                <ListItemAvatar>
                  <Avatar>
                    <SportsBar />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={`${beer.name} ${beer.city}`}
                  secondary={beer.brewery_type}
                />
              </ListItemButton>
            ))}
          </List>
          <div className={styles.pagination}>
            <Button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
              startIcon={<ArrowBackIcon />}
              variant="contained"
            >
              Previous Page
            </Button>
            <Button
              disabled={endIndex >= filteredBeerList.length}
              onClick={() => setCurrentPage(currentPage + 1)}
              endIcon={<ArrowForwardIcon />}
              variant="contained"
            >
              Next Page
            </Button>
          </div> */}
        </main>
      </section>
    </article>
  );
};

export default BeerList;
