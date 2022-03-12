import { useAuth } from "../util/auth";
import { Container, Card, Button } from 'react-bootstrap';
export default function favorites() {
    return (
        <>
          <div fluid className='jumbotron text-light bg-dark'>
            <Container>
              <h1>Viewing Favorite Restaurants!</h1>
            </Container>
          </div>
          <Container>
                return (
                  <Card>
                    <Card.Img src={require("./sampleRestaurant1.webp")} alt={`A restaurant`}/>
                    <Card.Body>
                      <Card.Title>Restaurant 1</Card.Title>
                      {/* <p className='small'>Authors: {book.authors}</p> */}
                      <Card.Text>Restaurant description</Card.Text>
                      {/* <Button className='btn-block btn-danger' onClick={() => handleDeleteBook(book.bookId)}>
                        Delete this Book!
                      </Button> */}
                    </Card.Body>
                  </Card>
                );
              )
          </Container>
        </>
      );
}