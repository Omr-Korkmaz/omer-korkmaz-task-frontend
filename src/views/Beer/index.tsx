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

  const detailsToDisplay = [
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
    ? detailsToDisplay
    : detailsToDisplay.slice(0, initialItemsToShow);

  return (
    <article>
      <section>
        <Card sx={{ maxWidth: 500 }}>
          <CardHeader title={beer?.name} />

          <CardContent sx={{ paddingBottom: "0" }}>
            <Box>
              {itemsToShow.map((detail, index) => (
                <Typography key={index}>
                  <span style={{ fontWeight: "bold" }}>{detail.label}:</span>{" "}
                  {detail.value}
                  <Divider sx={{ margin: "10px" }} />
                </Typography>
              ))}
            </Box>
          </CardContent>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent sx={{ paddingTop: "0" }}>
              {detailsToDisplay
                .slice(initialItemsToShow)
                .map((detail, index) => (
                  <Typography key={index}>
                    <span style={{ fontWeight: "bold" }}>{detail.label}:</span>{" "}
                    {detail.value}
                    <Divider sx={{ margin: "10px" }} />
                  </Typography>
                ))}
            </CardContent>
          </Collapse>
          <CardActions>
            {detailsToDisplay.length > initialItemsToShow && (
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
      </section>
    </article>
  );
};

export default Beer;
