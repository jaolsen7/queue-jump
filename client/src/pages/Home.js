import { useAuth } from "../util/auth";
import { Container, Card, Button } from "react-bootstrap";
import sampleRestaurant1 from "./sampleRestaurant1.webp";
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
        {restaurants.map((restaurants) => (
          <Card key={restaurants._id} className="col-12 m-3 flex-row flex-wrap">
            <Card.Img
              variant="left"
              src={sampleRestaurant1}
              className="p-2 col-6"
            />
            <Card.Body className="col-6">
              <Card.Title>{restaurants.restaurant_name}</Card.Title>
              <Card.Text>{restaurants.description}</Card.Text>
              <Card.Text>{restaurants.food_type}</Card.Text>
              <Card.Text>{restaurants.menu_link}</Card.Text>
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