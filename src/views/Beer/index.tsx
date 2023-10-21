import { useEffect, useState } from "react";
import { Beer as IBeer } from "../../types";
import { fetchData } from "./utils";
import { useParams } from "react-router-dom";

import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Box, Divider } from "@mui/material";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}



const Beer = () => {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const { id } = useParams();
  const [beer, setBeer] = useState<IBeer>();

  // eslint-disable-next-line
  useEffect(fetchData.bind(this, setBeer, id), [id]);

  return (
    <article>
      <section>
        <Card sx={{ maxWidth: 345 }}>
          <CardHeader title={beer?.name} />

          <CardContent sx={{ paddingBottom: "0" }}>
            <Box>
              <Typography>
                <span style={{ fontWeight: "bold" }}>type:</span>{" "}
                {beer?.brewery_type}
              </Typography>
              <Typography>
                <Divider sx={{ margin: "10px" }} />
                <span style={{ fontWeight: "bold" }}>Website:</span>{" "}
                {beer?.website_url}
              </Typography>
              <Typography>
                <Divider sx={{ margin: "10px" }} />
                <span style={{ fontWeight: "bold" }}>Phone:</span> {beer?.phone}
              </Typography>
              <Typography>
                <Divider sx={{ margin: "10px" }} />
                <span style={{ fontWeight: "bold" }}>Country:</span>{" "}
                {beer?.country}
              </Typography>
            </Box>
          </CardContent>
          {/* <CardActions disableSpacing> */}

          {/* </CardActions> */}
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent sx={{ paddingTop: "0" }}>
              <Typography>
                <Divider sx={{ margin: "10px" }} />
                <span style={{ fontWeight: "bold" }}>State:</span> {beer?.state}
              </Typography>
              <Typography>
                <Divider sx={{ margin: "10px" }} />
                <span style={{ fontWeight: "bold" }}>Street:</span>{" "}
                {beer?.street}
              </Typography>
              <Typography>
                <Divider sx={{ margin: "10px" }} />
                <span style={{ fontWeight: "bold" }}>Postal code:</span>{" "}
                {beer?.postal_code}
              </Typography>
              <Typography>
                <Divider sx={{ margin: "10px" }} />
                <span style={{ fontWeight: "bold" }}>Address:</span>{" "}
                {beer?.address_1}
              </Typography>
            </CardContent>
          </Collapse>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItem: "center",
              backgroundColor: "ButtonFace",
            }}
          >
            <Typography sx={{ margin: "auto 0" }}>
              {expanded ? "Show Less" : "Show More"}
            </Typography>
            <IconButton
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon   sx={{transform: !expanded ? 'rotate(0deg)' : 'rotate(180deg)'}} />
            </IconButton>
          </Box>
        </Card>

      </section>
    </article>
  );
};

export default Beer;
