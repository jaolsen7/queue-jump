import { useAuth } from "../util/auth";
import { Container, Card, Button } from "react-bootstrap";
import { QUERY_RESTAURANTS } from "../util/queries";
import { useQuery } from "@apollo/client";

export default function Home() {
  const { loading, data } = useQuery(QUERY_RESTAURANTS);

  const restaurants = data?.restaurants || [];

  const { isLoggedIn, user } = useAuth();
  return (
    <div>
      <div className="jumbotron text-light bg-success p-2">
        <Container>
          <h1>Welcome {isLoggedIn ? user.username : "Guest"}!</h1>
        </Container>
      </div>
      <Container>
        {restaurants.map((restaurants, index) => (
          <Card key={restaurants._id} className="col-12 m-3 flex-row flex-wrap fs-4">
            <Card.Img
              variant={index % 2 === 0 ? "left" : "right"}
              src={restaurants.photo_link}
              className="p-2 col-6"
            />
            <Card.Body className="col-6">
              <Card.Title className="fs-1">{restaurants.restaurant_name}</Card.Title>
              <Card.Text>{restaurants.description}</Card.Text>
              <Card.Text>Style: {restaurants.food_type.join(" ")}</Card.Text>
              <Card.Text><a href={restaurants.menu_link} className="text-decoration-none fs-3 text-black">Menu</a></Card.Text>
              <Button className="btn-block btn-success d-block">
                Check for Reservations
              </Button>
            </Card.Body>
          </Card>
        ))}
      </Container>
    </div>
  );
}