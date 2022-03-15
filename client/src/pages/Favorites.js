import { Container, Card, Button } from 'react-bootstrap';
import sampleRestaurant2 from './sampleRestaurant2.jpg'
import sampleRestaurant1 from './sampleRestaurant1.webp'
import { ME, QUERY_MYFAVORITES } from "../util/queries";
import { useQuery } from '@apollo/client';

export default function Favorites() {

  const { loading, data } = useQuery(QUERY_MYFAVORITES);
  console.log(data);

  const favorites = data?.me.favorites || []
  favorites.forEach(element => {
    console.log(element.restaurant_name);
  });

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
                    <Card.Img variant="left" src={sampleRestaurant1} className="w-100 p-2" />
                    <Card.Body>
                      <Card.Title>{favorites.restaurant_name}</Card.Title>
                      <Card.Text>{favorites.food_type}</Card.Text>
                      <Card.Text>{favorites.description}</Card.Text>
                      <Button className='btn-block btn-success d-block' /*onClick={() => handleDeleteBook(book.bookId)}*/>
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