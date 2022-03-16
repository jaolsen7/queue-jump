import { Container, Card, Button } from 'react-bootstrap';
import { QUERY_MYFAVORITES } from "../util/queries";
import { useQuery } from '@apollo/client';

export default function Favorites() {

  const { loading, data } = useQuery(QUERY_MYFAVORITES);
  
  const favorites = data?.me.favorites || []

    return (
        <>
          <div className='jumbotron text-light bg-success p-2'>
            <Container>
              <h1>Favorites</h1>
            </Container>

              </div>
              <Container>
            {favorites.map((favorites) => (
                  <Card key={favorites._id} className="col-12 m-3">
                    <Card.Img variant="left" src={favorites.photo_link} className="w-100 p-2" />
                    <Card.Body>
                      <Card.Title>{favorites.restaurant_name}</Card.Title>
                      <Card.Text>{favorites.food_type}</Card.Text>
                      <Card.Text>{favorites.description}</Card.Text>
                      <Button className='btn-block btn-success d-block'>
                        Check for Reservations!
                      </Button>
                      <Button className='btn-block btn-danger my-2' /*onClick={() => handleDeleteBook(book.bookId)}*/>
                        Remove From Favorites
                      </Button>
                    </Card.Body>
                  </Card>
            ))}
          </Container>
        </>
      );
}