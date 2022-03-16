import { Container, Card, Button } from 'react-bootstrap';
import { useQuery } from "@apollo/client";
import { QUERY_MYRESERVATIONS } from "../util/queries";

export default function Reservations() {
  const { loading, data } = useQuery(QUERY_MYRESERVATIONS);

  const reservations = data?.me.reservations || []
  console.log(reservations)

    return (
        <>
          <div className='jumbotron text-light bg-success p-2'>
            <Container>
              <h1>Your Reservations</h1>
            </Container>
          </div>
          <Container className="d-flex justify-content-center flex-wrap">
          {reservations.map((reservations, index) => (
          <Card key={reservations._id} className="col-12 m-3 flex-row flex-wrap fs-4">
            <Card.Img
              variant={index % 2 === 0 ? "left" : "right"}
              src={reservations.restaurant.photo_link}
              className="p-2 col-6"
            />
            <Card.Body className="col-6">
              <Card.Title className="fs-1">{reservations.restaurant.restaurant_name}</Card.Title>
              <Card.Text>Time: {reservations.time}</Card.Text>
              <Card.Text>Location: {reservations.location}</Card.Text>
              <Card.Text>Party size: {reservations.party_size}</Card.Text>
              <Button className="btn-block btn-danger d-block">
                Cancel Reservation
              </Button>
            </Card.Body>
          </Card>
          ))}
          </Container>
        </>
      );
}