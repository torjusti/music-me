import queryString from 'query-string';

// The domain on which the server runs.
export const DOMAIN = process.env.DOMAIN || 'http://localhost:8000';

/**
 * Load data from the specified path at the server.
 */
export const requestData = async path => {
  // Create the Request object.
  const request = new Request(DOMAIN + path, {
    method: 'GET',
  });

  try {
    // Wait for the response from the server.
    const response = await fetch(request);

    // Attempt converting the repsonse into JSON.
    const data = await response.json();

    if (response.ok) {
      return { data };
    } else {
      return { error: true };
    }
  } catch (error) {
    return { error: true };
  }
};

/**
 * Request songs from the server.
 */
export const requestSongs = (page, search, selectedGenres, selectedRating) => {
  return requestData(
    '/songs?' +
      queryString.stringify({
        page,
        search,
        selectedGenres,
        selectedRating
      }),
  );
};
