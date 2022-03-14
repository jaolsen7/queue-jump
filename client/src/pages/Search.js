import { useAuth } from "../util/auth";
import React, { useState, useEffect } from 'react';
import { Container, Card, Button, Form } from "react-bootstrap";
import sampleRestaurant2 from "./sampleRestaurant2.jpg";
import sampleRestaurant1 from "./sampleRestaurant1.webp";
import sampleRestaurant3 from "./sampleRestaurant3.jpg";

export default function Search() {
  const { isLoggedIn, user } = useAuth();
    // create state for holding returned google api data
    const [searchedBooks, setSearchedBooks] = useState([]);
    // create state for holding our search field data
    const [searchInput, setSearchInput] = useState('');
  
    //alter to take reservation
    // const [saveBook, { error }] = useMutation(SAVE_BOOK);
  
    // create method to search for books and set state on form submit
    const handleFormSubmit = async (event) => {
      event.preventDefault();
  
      if (!searchInput) {
        return false;
      }
  
      try {
          //search mutation here
        const response = await fetch(
          `https://www.googleapis.com/books/v1/volumes?q=${searchInput}`
        );
  
        if (!response.ok) {
          throw new Error('something went wrong!');
        }
  
        const { items } = await response.json();
  
        //change to map restaurants available
        const bookData = items.map((book) => ({
          bookId: book.id,
          authors: book.volumeInfo.authors || ['No author to display'],
          title: book.volumeInfo.title,
          description: book.volumeInfo.description,
          image: book.volumeInfo.imageLinks?.thumbnail || '',
        }));
  
        //change to display searched restaurants
        setSearchedBooks(bookData);
        setSearchInput('');
      } catch (err) {
        console.error(err);
      }
    };
  
    // create function to handle saving a reservation to our database
    const handleSaveBook = async (bookId) => {
      // find the book in `searchedBooks` state by the matching id
      const bookToSave = searchedBooks.find((book) => book.bookId === bookId);
  
      // get token
      const token = useAuth.loggedIn() ? useAuth.getToken() : null;
  
      if (!token) {
        return false;
      }
  
    //   try {
    //     const { data } = await saveBook({
    //       variables: { bookData: { ...bookToSave } },
    //     });
    //     console.log(savedBookIds);
    //     setSavedBookIds([...savedBookIds, bookToSave.bookId]);
    //   } catch (err) {
    //     console.error(err);
    //   }
    };
  return (
    <div>
      <div className="jumbotron text-light bg-success p-2">
        <Container>
          <Form onSubmit={handleFormSubmit}>
                <Form.Control
                  name="searchInput"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type="text"
                  size="lg"
                  placeholder="Search for a reservation"
                />
                <Button type="submit" variant="primary" size="lg" className="my-2">
                  Submit Search
                </Button>
          </Form>
        </Container>
      </div>
      <Container>
        <Card className="col-12 m-3 flex-row flex-wrap">
          <Card.Img
            variant="left"
            src={sampleRestaurant1}
            className="p-2 col-6"
          />
          <Card.Body className="col-6">
            <Card.Title>Jeune Et Jolie</Card.Title>
            <Card.Text>
              A beautiful, probably French, restaurant in scenic Encinitas.
              Serving light lunch and dinner fare
            </Card.Text>
            <Button
              className="btn-block btn-success d-block" /*onClick={() => handleDeleteBook(book.bookId)}*/
            >
              Check for Reservations
            </Button>
          </Card.Body>
        </Card>
        <Card className="col-12 m-3 flex-row flex-wrap">
          <Card.Body className="col-6">
            <Card.Title>Cafe Americano</Card.Title>
            <Card.Text>
              Scenic sidewalk eatery. Enjoy pastries and coffee while you watch
              the city walk by
            </Card.Text>
            <Button
              className="btn-block btn-success d-block" /*onClick={() => handleDeleteBook(book.bookId)}*/
            >
              Check for Reservations
            </Button>
          </Card.Body>
          <Card.Img
            variant="right"
            src={sampleRestaurant2}
            className="p-2 col-6"
          />
        </Card>
        <Card className="col-12 m-3 flex-row flex-wrap">
          <Card.Img
            variant="left"
            src={sampleRestaurant3}
            className="p-2 col-6"
          />
          <Card.Body className="col-6">
            <Card.Title>Taste of Italy</Card.Title>
            <Card.Text>
              Cozy atmosphere and delicious food make this restaurant a
              wonderful location for celebrations and romantic evenings both
            </Card.Text>
            <Button
              className="btn-block btn-success d-block" /*onClick={() => handleDeleteBook(book.bookId)}*/
            >
              Check for Reservations
            </Button>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}
