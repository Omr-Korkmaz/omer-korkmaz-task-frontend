import { useEffect, useState } from "react";
import { fetchData } from "./utils";
import { Beer } from "../../types";
import { Link as RouterLink } from "react-router-dom";
import { Button, Checkbox, Paper, TextField, Link } from "@mui/material";
import styles from "./Home.module.css";

const Home = () => {
  const [beerList, setBeerList] = useState<Array<Beer>>([]);
  const [filterText, setFilterText] = useState<string>("");

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterText(event.target.value);
    // setCurrentPage(1);
  };

const filteredBeer = beerList.filter((beer) =>
    beer.name.toLowerCase().includes(filterText.toLowerCase())
  );
  // const [savedList, setSavedList] = useState<Array<Beer>>([]);
  const getSavedListStorage = () => {
    const savedListStorage = localStorage.getItem("savedList");
    return savedListStorage ? JSON.parse(savedListStorage) : [];
  };

  const [savedList, setSavedList] = useState<Array<Beer>>(getSavedListStorage);

  // eslint-disable-next-line
  useEffect(fetchData.bind(this, setBeerList), []);

  useEffect(() => {
    localStorage.setItem("savedList", JSON.stringify(savedList));
  }, [savedList]);

  const handleRemoveAll = () => {
    setSavedList([]);
  };

  const handleCheckboxChange = (beer: Beer) => {
    const isSaved = savedList.some((savedBeer) => savedBeer.id === beer.id);

    if (isSaved) {
      setSavedList((prevSavedList) =>
        prevSavedList.filter((savedBeer) => savedBeer.id !== beer.id)
      );
    } else {
      setSavedList((prevSavedList) => [...prevSavedList, beer]);
    }
  };

  // const filteredBeerList = beerList.filter(
  //   (beer) => !savedList.some((savedBeer) => savedBeer.id === beer.id)
  // );

  const handleReload = () => {
    window.location.reload();
  };

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
                <Button variant="contained" onClick={handleReload}>
                  Reload list
                </Button>
              </div>
              <ul className={styles.list}>
                {filteredBeer.map((beer, index) => (
                  <li key={index.toString()}>
                    {/* <Checkbox /> */}

                    <Checkbox
                      checked={savedList.some(
                        (savedBeer) => savedBeer.id === beer.id
                      )}
                      onChange={() => handleCheckboxChange(beer)}
                    />
                    <Link component={RouterLink} to={`/beer/${beer.id}`}>
                      {beer.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </Paper>

          <Paper>
            <div className={styles.listContainer}>
              <div className={styles.listHeader}>
                <h3>Saved items</h3>
                <Button
                  variant="contained"
                  size="small"
                  onClick={handleRemoveAll}
                >
                  Remove all items
                </Button>
              </div>

              <ul className={styles.list}>
                {savedList.map((beer, index) => (
                  <li key={index.toString()}>
                    {/* <Checkbox /> */}

                    <Checkbox
                      checked={savedList.some(
                        (savedBeer) => savedBeer.id === beer.id
                      )}
                      onChange={() => handleCheckboxChange(beer)}
                    />
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
