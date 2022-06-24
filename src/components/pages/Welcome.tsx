import React from "react";
import { Grid, Paper, styled, Typography } from "@mui/material";

interface Book {
  Caption: string;
}

const books: Book[] = [
  { Caption: "Sapiens. A Brief History of Humankind" },
  { Caption: "Homo Deus. A Brief History of Tomorrow" },
  { Caption: "21 Lessons for the 21st Century" },
  { Caption: "The Game of Life and How to Play It" },
  { Caption: "The Power of the Spoken Word" },
  { Caption: "It's All in Your Head: True Stories of Imaginary Illness" },
  { Caption: "1984. Nineteen Eighty-Four" },
  { Caption: "Harry Potter" },
  { Caption: "Rich Dad Poor Dad" },
  { Caption: "Why We Want You to Be Rich: Two Men, One Message" },
];

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.overline,
  color: theme.palette.text.secondary,
  marginBottom: "15px",
  padding: "15px",
  fontWeight: "bolder",
}));

const WelcomePage: React.FC = () => {
  return (
    <Grid container mb={10}>
      <Grid
        item
        container
        alignItems="center"
        justifyContent="center"
        height="50vh"
        xs={12}
      >
        <Grid item container xs={11} spacing={3} flexDirection="column">
          <Grid item xs={12}>
            <Typography textAlign="center" variant="h2">
              The World's most ranking books!
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography textAlign="center" variant="body1">
              "If you look at what you have in life, you'll always have more. If
              you look at what you don't have in life, you'll never have enough"
              <Typography textAlign="right" variant="overline">
                {" "}
                - Oprah Winfrey
              </Typography>
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={3} />
      <Grid item xs={6}>
        {books.map((book, index) => (
          <Item key={index} elevation={2}>
            {index + 1}. {book.Caption}
          </Item>
        ))}
      </Grid>
      <Grid item xs />
    </Grid>
  );
};

export default WelcomePage;
