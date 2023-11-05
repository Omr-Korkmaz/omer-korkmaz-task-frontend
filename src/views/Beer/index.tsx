import * as React from "react";
import { useState, useEffect } from "react";
import { Beer as IBeer } from "../../types";
import { fetchData } from "./utils";
import { useParams } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Collapse,
  Typography,
  Box,
  Divider,
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const Beer = () => {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const { id } = useParams();
  const [beer, setBeer] = useState<IBeer>();

  // eslint-disable-next-line
  useEffect(fetchData.bind(this, setBeer, id), [id]);

  const initialItemsToShow = 4;

  const fieldsToDisplay = [
    { label: "Type", value: beer?.brewery_type },
    { label: "Website", value: beer?.website_url },
    { label: "Phone", value: beer?.phone },
    { label: "Country", value: beer?.country },
    { label: "State", value: beer?.state },
    { label: "Street", value: beer?.street },
    { label: "Postal code", value: beer?.postal_code },
    { label: "Address", value: beer?.address_1 },
  ];

  const itemsToShow = expanded
    ? fieldsToDisplay
    : fieldsToDisplay.slice(0, initialItemsToShow);

  useEffect(() => {
    const iframeData = document.getElementById("iframeId") as HTMLIFrameElement;
    const lat = beer?.latitude;
    const lon = beer?.longitude;

    if (iframeData) {
      iframeData.src = `https://maps.google.com/maps?q=${lat},${lon}&hl=es;&output=embed`;
    }
  }, [beer]);

  return (
    <article>
      <section
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          gap: "30px",
        }}
      >
        <Card sx={{ width: "40%", height: "100%" }}>
          <CardHeader title={beer?.name} />

          <CardContent sx={{ paddingBottom: "0" }}>
            <Box>
              {itemsToShow.map((beer, index) => (
                // good idea to use id 
                <Box  key={index}> 
                  <Typography>
                    <span style={{ fontWeight: "bold" }}>{beer.label}:</span>{" "}
                    {beer.value}
                  </Typography>
                  <Divider sx={{ margin: "10px" }} />
                </Box>
              ))}
            </Box>
          </CardContent>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent sx={{ paddingTop: "0" }}>
              {fieldsToDisplay
                .slice(initialItemsToShow)
                .map((field, index) => (
                  <Box  key={index}>
                    <Typography>
                      <span style={{ fontWeight: "bold" }}>
                        {field.label}:
                      </span>{" "}
                      {field.value}
                    </Typography>
                    <Divider sx={{ margin: "10px" }} />
                  </Box>
                ))}
            </CardContent>
          </Collapse>
          <CardActions>
            {fieldsToDisplay.length > initialItemsToShow && (
              <Box
                onClick={handleExpandClick}
                sx={{
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "center",
                  width: "100%",
                  padding: "10px",
                  alignItem: "right",
                  backgroundColor: "ButtonFace",
                  transition: "background-color 0.3s ease",
                  "&:hover": {
                    backgroundColor: "#88c8fc",
                  },
                }}
              >
                <Typography>{expanded ? "Show Less" : "Show More"}</Typography>
                <ExpandMoreIcon
                  sx={{
                    transform: !expanded ? "rotate(0deg)" : "rotate(180deg)",
                  }}
                />
              </Box>
            )}
          </CardActions>
        </Card>
        <Box sx={{ width: "60%" }}>
          {beer?.latitude && beer?.longitude ? (
            <iframe id="iframeId" height="500px" width="100%"></iframe>
          ) : (
            <h2>No available MAP for the selected beer</h2>
          )}
        </Box>
      </section>
    </article>
  );
};

export default Beer;
