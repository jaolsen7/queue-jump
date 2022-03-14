import { useAuth } from "../util/auth";
import { Container, Card, Button } from 'react-bootstrap';
import sampleRestaurant2 from './sampleRestaurant2.jpg'
import sampleRestaurant1 from './sampleRestaurant1.webp'

export default function favorites() {
    return (
        <>
          <div className='jumbotron text-light bg-success p-2'>
            <Container>
              <h1>Viewing Favorite Restaurants!</h1>
            </Container>
          </div>
          <Container>
                  <Card className="col-12 m-3">
                    <Card.Img variant="left" src={sampleRestaurant1} className="w-100 p-2" />
                    <Card.Body>
                      <Card.Title>Jeune Et Jolie</Card.Title>
                      <Card.Text>A beautiful, probably French, restaurant in scenic Encinitas. Serving light lunch and dinner fare</Card.Text>
                      <Button className='btn-block btn-success d-block' /*onClick={() => handleDeleteBook(book.bookId)}*/>
                        Check for Reservations
                      </Button>
                      <Button className='btn-block btn-danger my-2' /*onClick={() => handleDeleteBook(book.bookId)}*/>
                        Remove From Favorites
                      </Button>
                    </Card.Body>
                  </Card>
                  <Card className="col-12 m-3">
                  <Card.Img variant="top" src={sampleRestaurant2} className="w-100 p-2" />
                    <Card.Body>
                      <Card.Title>Cafe Americano</Card.Title>
                      <Card.Text>Scenic sidewalk eatery. Enjoy pastries and coffee while you watch the city walk by</Card.Text>
                     <Button className='btn-block btn-success d-block' /*onClick={() => handleDeleteBook(book.bookId)}*/>
                        Check for Reservations
                      </Button>
                      <Button className='btn-block btn-danger my-2' /*onClick={() => handleDeleteBook(book.bookId)}*/>
                        Remove From Favorites
                      </Button>
                    </Card.Body>
                  </Card>
          </Container>
        </>
      );
}