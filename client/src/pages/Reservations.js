import { useAuth } from "../util/auth";
import { Container, Card, Button } from 'react-bootstrap';
import sampleRestaurant2 from './sampleRestaurant2.jpg'
import sampleRestaurant1 from './sampleRestaurant1.webp'


export default function Reservations() {
    return (
        <>
          <div className='jumbotron text-light bg-success p-2'>
            <Container>
              <h1>Your Reservations</h1>
            </Container>
          </div>
          <Container className="d-flex justify-content-center flex-wrap">
                  <Card className="col-12 m-3">
                  <Card.Img variant="top" src={sampleRestaurant1} className="w-100 p-2" />
                    <Card.Body className="">
                      <Card.Title>Jeunu Et Jolie</Card.Title>
                      <Card.Text>Your party of 2 is confirmed for 12:30 PM</Card.Text>
                     <Button size="large" variant="danger" /*onClick={() => handleDeleteBook(book.bookId)}*/>
                        Cancel Reservation
                      </Button>
                    </Card.Body>
                  </Card>
                  <Card className="col-12 m-3">
                  <Card.Img variant="top" src={sampleRestaurant2} className="w-100 p-2" />
                    <Card.Body>
                      <Card.Title>Cafe Americano</Card.Title>
                      <Card.Text>Your party of 4 is confirmed for 10 AM</Card.Text>
                     <Button size="large" variant="danger" /*onClick={() => handleDeleteBook(book.bookId)}*/>
                        Cancel Reservation
                      </Button>
                    </Card.Body>
                  </Card>
          </Container>
        </>
      );
}