import { useEffect, useState } from 'react';
import { Beer } from '../../types';
import { fetchData } from './utils';
import { Avatar, Button, List, ListItemAvatar, ListItemButton, ListItemText, TextField } from '@mui/material';
import SportsBar from '@mui/icons-material/SportsBar';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import styles from "./BeerList.module.css";


const ITEMS_PER_PAGE = 5;


const BeerList = () => {
  const navigate = useNavigate();
  const [beerList, setBeerList] = useState<Array<Beer>>([]);
  const [filterText, setFilterText] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortBy, setSortBy] = useState<string | null>(null);

  // eslint-disable-next-line
  useEffect(fetchData.bind(this, setBeerList), []);

  
  const totalPages = Math.ceil(beerList.length / ITEMS_PER_PAGE);

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


  const onBeerClick = (id: string) => navigate(`/beer/${id}`);

  return (
    <article>
      <section>
        <header>
          <h1>BeerList page</h1>
        </header>
        <main>

        <div>
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
              
              </div>
          <List>



            {currentBeerList.map((beer) => (
              <ListItemButton key={beer.id} onClick={onBeerClick.bind(this, beer.id)}>
                <ListItemAvatar>
                  <Avatar>
                    <SportsBar />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={beer.name} secondary={beer.brewery_type} />
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

                <span>
                  {" "}
                  {/* ( Page {currentPage} of {totalPages} ){" "} */}
                </span>
              </div>

          
        </main>
      </section>
    </article>
  );
};

export default BeerList;
