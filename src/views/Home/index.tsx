import { useEffect, useState } from "react";
import { fetchData } from "./utils";
import { Beer } from "../../types";
import { Link as RouterLink } from "react-router-dom";
import { Button, Checkbox, Paper, TextField, Link } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
// import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
// import { useDemoData } from '@mui/x-data-grid-generator';

import styles from "./Home.module.css";

const ITEMS_PER_PAGE = 5;

const Home = () => {
  const [beerList, setBeerList] = useState<Array<Beer>>([]);
  const [savedList, setSavedList] = useState<Array<Beer>>([]);
  const [filterText, setFilterText] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortBy, setSortBy] = useState<string | null>(null);


  const totalPages = Math.ceil(beerList.length / ITEMS_PER_PAGE);

  // eslint-disable-next-line
  useEffect(fetchData.bind(this, setBeerList), []);

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterText(event.target.value);
    setCurrentPage(1);
  };

  const handleSort = (criteria: string) => {
    setSortBy(criteria);

    setCurrentPage(1);
  };

  const sortBeerList = (list: Beer[]) => {
    if (sortBy === 'name') {
      return list.slice().sort((a, b) => a.name.localeCompare(b.name));
    }
    return list;
  };




  const filteredBeerList = beerList.filter((beer) =>
    beer.name.toLowerCase().includes(filterText.toLowerCase())
  );

  const sortedBeerList = sortBeerList(filteredBeerList);


  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  // const currentBeerList = filteredBeerList.slice(startIndex, endIndex);

  const currentBeerList = sortedBeerList.slice(startIndex, endIndex);


  return (
    <article>
      <section>
        <main>
          <Paper>
            <div className={styles.listContainer}>
              <div className={styles.listHeader}>
                <TextField
                  label="Filter..."
                  variant="outlined"
                  value={filterText}
                  onChange={handleFilterChange}
                />

{/* <DataGrid rows={rows} columns={columns} /> */}

<Button variant="contained" onClick={() => handleSort('name')}>
                  Sort by Name
                </Button>
              
                <Button variant="contained">Reload list</Button>
              </div>

              <ul className={styles.list}>
                {currentBeerList.map((beer, index) => (
                  <li key={index.toString()}>
                    <Checkbox />
                    <Link component={RouterLink} to={`/beer/${beer.id}`}>
                      {beer.name}
                    </Link>
                  </li>
                ))}
              </ul>

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

                <span>
                  {" "}
                  ( Page {currentPage} of {totalPages} ){" "}
                </span>
              </div>
            </div>
          </Paper>

          <Paper>
            <div className={styles.listContainer}>
              <div className={styles.listHeader}>
                <h3>Saved items</h3>
                <Button variant="contained" size="small">
                  Remove all items
                </Button>
              </div>
              <ul className={styles.list}>
                {savedList.map((beer, index) => (
                  <li key={index.toString()}>
                    <Checkbox />
                    <Link component={RouterLink} to={`/beer/${beer.id}`}>
                      {beer.name}
                    </Link>
                  </li>
                ))}
                {!savedList.length && <p>No saved items</p>}
              </ul>
            </div>
          </Paper>
        </main>
      </section>
    </article>
  );
};

export default Home;
