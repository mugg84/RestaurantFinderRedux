# Restaurant Finder App with Redux https://restaurant-finder-redux.netlify.app/

# Recipe Finder

A React app which provides a restaurant list according to different parameters.

If you select a restaurant from the list you'll be redirected to a new page with the selected restaurant info.

It automatically displays different types of restaurant list if location permissions are granted.

## Search parameters:

- Type: cousine or restaurant
- Location: search area input with Google address autocomplete feature
- Sort by: sort search results

## Restaurant info page:
- Restaurant details, such as address, stars,
- Google map widget
- Reviews with link

## API

- Yelp API: [Documentation](https://www.yelp.com/developers/documentation/v3)
- Google API: [Documentation](https://developers.google.com/maps/documentation/javascript/places-autocomplete)

## Front-end

- React with Redux and hooks

## Testing

- Jest for unit test
- Enzyme for components

## ToDo

- Complete testing
- Fix issue with Google automplete (if API key restricted location input is disabled)
- Minor style improvement needed
- Instead of using MailChimp newsletter implement a small database to check if the email address has been already provided and to act accordingly.
