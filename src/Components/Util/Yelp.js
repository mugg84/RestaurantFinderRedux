import axios from "axios";


let YELP_API_KEY = process.env.REACT_APP_YELP_API_KEY;

const Yelp = {
  // Returns restaurant search resuts

  async searchRestaurants(text) {
    try {
      let response = await axios.get(
        `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?limit=12&term=${text.what}&location=${text.where}&sort_by=${text.sortBy}`,
        {
          headers: {
            Authorization: `Bearer ${YELP_API_KEY}`,
            "X-Requested-With": "XMLHttpRequest",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );

      //If result finds no restaurants in the area
      if (response.data.businesses.length === 0) {
        return "Zero Restaurants";
      }

      const parameters = response.data.businesses.map((business) => {
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

      return parameters;
    } catch (e) {
      console.log(e);
      return "Error";
    }
  },

  // Provides infos about a single restaurant
  async searchRestaurantsInfo(id) {
    try {
      let response = await axios.get(
        `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/${id}`,
        {
          headers: {
            Authorization: `Bearer ${YELP_API_KEY}`,
            "X-Requested-With": "XMLHttpRequest",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );

      let responseRew = await axios.get(
        `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/${id}/reviews`,
        {
          headers: {
            Authorization: `Bearer ${YELP_API_KEY}`,
            "X-Requested-With": "XMLHttpRequest",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );

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
    } catch (e) {
      console.log(e);
      return "Error";
    }
  },

  // Returns restaurnats from user location in sliders
  async SearchDefaultRestaurants(location) {
    try {
      let response = await axios.get(
        `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?limit=6&latitude=${location[0]}&longitude=${location[1]}&categories=restaurants`,
        {
          headers: {
            Authorization: `Bearer ${YELP_API_KEY}`,
            "X-Requested-With": "XMLHttpRequest",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );

      if (response.data.businesses.length === 0) {
        return "Zero Restaurnts";
      }

      const parameters = response.data.businesses.map((business) => {
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

      return parameters;
    } catch (e) {
      console.log(e);
      return "Error";
    }
  },

  // Returns restaurnats from user location in sliders
  async SearchDefaultThaiRestaurants(location) {
    try {
      let response = await axios.get(
        `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?limit=6&latitude=${location[0]}&longitude=${location[1]}&radius=40000&categories=thai`,
        {
          headers: {
            Authorization: `Bearer ${YELP_API_KEY}`,
            "X-Requested-With": "XMLHttpRequest",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );

      if (response.data.businesses.length === 0) {
        return "Zero Restaurnts";
      }

      const parameters = response.data.businesses.map((business) => {
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
      return parameters;
    } catch (e) {
      console.log(e);
      return "Error";
    }
  },

  // Returns restaurnats from user location in sliders
  async SearchDefaultItalianRestaurants(location) {
    try {
      let response = await axios.get(
        `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?limit=6&latitude=${location[0]}&longitude=${location[1]}&radius=40000&categories=italian`,
        {
          headers: {
            Authorization: `Bearer ${YELP_API_KEY}`,
            "X-Requested-With": "XMLHttpRequest",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );

      if (response.data.businesses.length === 0) {
        return "Zero Restaurnts";
      }

      const parameters = response.data.businesses.map((business) => {
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
      return parameters;
    } catch (e) {
      console.log(e);
      return "Error";
    }
  },

  // Returns restaurnats from user location in sliders
  async SearchDefaultIndianRestaurants(location) {
    try {
      let response = await axios.get(
        `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?limit=6&latitude=${location[0]}&longitude=${location[1]}&radius=40000&categories=indpak`,
        {
          headers: {
            Authorization: `Bearer ${YELP_API_KEY}`,
            "X-Requested-With": "XMLHttpRequest",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );

      if (response.data.businesses.length === 0) {
        return "Zero Restaurnts";
      }

      const parameters = response.data.businesses.map((business) => {
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

      return parameters;
    } catch (e) {
      console.log(e);
      return "Error";
    }
  },
};

export default Yelp;
