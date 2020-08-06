export const getRestaurantInfoHelper = (response, responseRew) => {
  const parameters = {
    name: response.data.name,
    address: response.data.location.display_address[0],
    coordinates: {
      lat: response.data.coordinates.latitude,
      lng: response.data.coordinates.longitude,
    },
    city: response.data.location.display_address[1],
    rating: response.data.rating,
    photos: response.data.photos,
    phone: response.data.phone,
    price: response.data.price,
    categories: response.data.categories[0].title,
    url: response.data.url,
    reviews: responseRew.data.reviews,
  };

  return parameters;
};

export const searchRestaurantsHelper = (response) => {
  console.log(response);
  return response.data.businesses.map((business) => {
    return {
      id: business.id,
      image: business.image_url,
      name: business.name,
      url: business.url,
      price: business.price,
      phone: business.phone,
      categories: business.categories[0].title,
      address: business.location.display_address[0],
    };
  });
};

export const searchDefaultRestaurantsHelper = (response) =>
  response.data.businesses.map((business) => {
    return {
      id: business.id,
      image: business.image_url,
      name: business.name,
      url: business.url,
      price: business.price,
      phone: business.phone,
      rating: business.rating,
      categories: business.categories[0].title,
      address: business.location.display_address[0],
    };
  });
