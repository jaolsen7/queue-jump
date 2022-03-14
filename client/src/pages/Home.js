import { useAuth } from "../util/auth";
import { Container, Card, Button } from "react-bootstrap";
import sampleRestaurant2 from "./sampleRestaurant2.jpg";
import sampleRestaurant1 from "./sampleRestaurant1.webp";
import sampleRestaurant3 from "./sampleRestaurant3.jpg";

export default function Home() {
  const { isLoggedIn, user } = useAuth();
  return (
    <div>
      <div className="jumbotron text-light bg-success">
        <Container>
          {/* TODO: display logged in user's username */}
          <h1>Welcome {isLoggedIn ? user.username : "Guest"}!</h1>
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
