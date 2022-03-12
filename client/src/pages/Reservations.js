import { useAuth } from "../util/auth";
import { Container, Card, Button } from 'react-bootstrap';
export default function Reservations() {
    return (
        <>
          <div fluid className='jumbotron text-light bg-dark'>
            <Container>
              <h1>Choose a Reservation</h1>
            </Container>
          </div>
          <Container>
                  <Card>
                    <Card.Body>
                      <Card.Title>A nice reservation</Card.Title>
                      <Card.Text>at insert time here!</Card.Text>
                     <Button className='btn-block btn-danger' /*onClick={() => handleDeleteBook(book.bookId)}*/>
                        Take this Reservation!
                      </Button>
                    </Card.Body>
                  </Card>
          </Container>
        </>
      );
}