import React, { useCallback, useEffect, useState } from "react";
import { Button, Grid, Paper, styled, Tab, Typography } from "@mui/material";
import {
  getFirestore,
  onSnapshot,
  query,
  collection,
  limit,
  orderBy,
  doc,
} from "firebase/firestore";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { getAuth } from "firebase/auth";
import { grey } from "@mui/material/colors";

interface Book {
  title: string;
  author: string;
  rank: number;
}

const bookConverter = {
  toFirestore: (book: Book) => {
    return {
      title: book.title,
      author: book.author,
      rank: book.rank,
    };
  },
  fromFirestore: (snapshot: any, options: any) => {
    const data = snapshot.data(options);
    const book: Book = {
      title: data.title,
      author: data.author,
      rank: data.rank,
    };
    return book;
  },
};

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.overline,
  color: grey[800],
  marginBottom: "15px",
  padding: "15px",
  fontWeight: "bold",
}));

const WelcomePage: React.FC = () => {
  const [tabIndex, setTabIndex] = useState("1");
  const [books, setBooks] = useState<Book[]>([]);
  const [userBooks, setUserBooks] = useState<Book[]>([]);
  const auth = getAuth();
  const db = getFirestore();

  const fetchUsersTopBooks = useCallback(async () => {
    if (auth.currentUser) {
      const userQuery = doc(db, "users", auth.currentUser?.uid!);
      onSnapshot(userQuery, (querySnapshot) => {
        querySnapshot.get("topBooks").forEach((topBooksQuery: any) => {
          const topBooks: Book[] = [];
          onSnapshot(
            topBooksQuery.withConverter(bookConverter),
            (topBook: any) => {
              topBooks.push(topBook.data());
            }
          );

          setUserBooks(topBooks);
        });
      });
    } else {
      setUserBooks([]);
    }
  }, [db, auth.currentUser]);

  useEffect(() => {
    fetchUsersTopBooks();
  }, [fetchUsersTopBooks]);

  const fetchBooks = useCallback(async () => {
    const booksQuery = query(
      collection(db, "books"),
      orderBy("rank", "desc"),
      limit(10)
    ).withConverter(bookConverter);
    onSnapshot(booksQuery, (querySnapshot) => {
      const updatedBooks: Book[] = [];
      querySnapshot.forEach((doc) => {
        updatedBooks.push(doc.data());
      });

      setBooks(updatedBooks);
    });
  }, [db]);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  return (
    <Grid container mb={10}>
      <Grid
        item
        container
        alignItems="center"
        justifyContent="center"
        height="35vh"
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
        <Grid>
          <TabContext value={tabIndex}>
            <TabList
              onChange={(e: unknown, newIndex: string) => setTabIndex(newIndex)}
            >
              <Tab label="Global" value="1" />
              {auth.currentUser && <Tab label="Personal" value="2" />}
            </TabList>
            <TabPanel value="1">
              {books.map((book, index) => (
                <Item key={index} elevation={2}>
                  {index + 1}. {book.title}
                </Item>
              ))}
            </TabPanel>
            {auth.currentUser && (
              <TabPanel value="2">
                {userBooks.length === 0 ? (
                  <Grid
                    container
                    justifyContent="center"
                    flexDirection="column"
                  >
                    <Typography textAlign="center" variant="h6">
                      No books added...
                    </Typography>
                    <Button>Add books</Button>
                  </Grid>
                ) : (
                  userBooks.map((book, index) => (
                    <Item key={index} elevation={2}>
                      {index + 1}. {book.title}
                    </Item>
                  ))
                )}
              </TabPanel>
            )}
          </TabContext>
        </Grid>
      </Grid>
      <Grid item xs />
    </Grid>
  );
};

export default WelcomePage;
