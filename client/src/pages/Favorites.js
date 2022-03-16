import { Container, Card, Button } from 'react-bootstrap';
import { QUERY_MYFAVORITES } from "../util/queries";
import { useQuery, useMutation } from '@apollo/client';
import { REMOVE_FAVORITE } from "../util/mutations";
import React, { useState } from 'react';

export default function Favorites() {
 
  const { loading, data } = useQuery(QUERY_MYFAVORITES);
  
  const favorites = data?.me.favorites || []
  
  const [removeFavorite, addFavoriteState] = useMutation(REMOVE_FAVORITE)

  const handleSubmit = async (restaurantId) => {
    removeFavorite({variables: {restaurantId} });
    window.location.reload("false");
  };

    return (
        <>
          <div className='jumbotron text-light bg-success p-2'>
            <Container>
              <h1>Favorites</h1>
            </Container>

              </div>
              <Container>
            {favorites.map((favorites) => (
                  <Card key={favorites._id} value={favorites._id} className="col-12 m-3 flex-row flex-wrap fs-4">
                    <Card.Img variant="left" src={favorites.photo_link} className="col-6 p-2" />
                    <Card.Body className="col-6">
                      <Card.Title className="fs-1">{favorites.restaurant_name}</Card.Title>
                      <Card.Text>{favorites.food_type.join(" ")}</Card.Text>
                      <Card.Text>{favorites.description}</Card.Text>
                      <Card.Text><a href={favorites.menu_link} className="text-decoration-none fs-3">Menu</a></Card.Text>
                      <Button className='btn-block btn-success d-block'>
                        Check for Reservations!
                      </Button>
                      <Button className='btn-block btn-danger my-2' onClick={() => handleSubmit(favorites._id)}>
                        Remove From Favorites
                      </Button>
                    </Card.Body>
                  </Card>
            ))}
          </Container>
        </>
      );
}