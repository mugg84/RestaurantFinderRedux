let autocomplete, setWhere;

export const handleScriptLoad = () => {
  // Initialize Google Autocomplete

  /*global google*/ autocomplete = new google.maps.places.Autocomplete(
    document.getElementById('autocomplete')
  );

  console.log(autocomplete);

  // address.
  autocomplete.setFields(['address_components', 'formatted_address']);

  // Fire Event when a suggested name is selected
  autocomplete.addListener('place_changed', handlePlaceSelect);
};

export const handlePlaceSelect = () => {
  // Extract City From Address Object

  const addressObject = autocomplete.getPlace();
  const address = addressObject.address_components;

  // Check if address is valid
  if (address) {
    // Set State
    setWhere(address[0].long_name);
  }
};
