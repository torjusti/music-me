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
 * Send a request which provides a new rating to
 * a specific song.
 */
export const rateSong = async (id, rating) => {
  // Create the request object.
  const request = new Request(DOMAIN + '/songs/rate/', {
    method: 'POST',

    headers: {
      // Needs to be added in order for the server
      // to parse the request correctly as JSON.
      'Content-Type': 'application/json',
    },

    body: JSON.stringify({
      id,
      rating,
    }),
  });

  try {
    const response = await fetch(request);

    if (response.ok) {
      return { error: false };
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
export const requestSongs = (
  page,
  search,
  selectedGenres,
  rating,
  orderBy,
  isAsc,
) => {
  const data = {
    page,
    search,
    selectedGenres,
    orderBy,
    isAsc,
  };

  if (rating.ratingEnabled) {
    data.selectedRating = rating.selectedRating;
  }

  return requestData('/songs?' + queryString.stringify(data));
};

/**
 * Attempt posting a new song to the server.
 */
export const postSong = async song => {
  const request = new Request(DOMAIN + '/songs', {
    method: 'POST',

    headers: {
      // Needs to be added in order for the server
      // to parse the request correctly as JSON.
      'Content-Type': 'application/json',
    },

    body: JSON.stringify(song),
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
 * Attempt updating an existing song.
 */
export const putSong = async (id, song) => {
  const request = new Request(DOMAIN + `/songs/${id}`, {
    method: 'PUT',

    headers: {
      // Needs to be added in order for the server
      // to parse the request correctly as JSON.
      'Content-Type': 'application/json',
    },

    body: JSON.stringify(song),
  });

  try {
    // Wait for the response from the server.
    const response = await fetch(request);

    if (response.ok) {
      return { success: true };
    }
  } catch (error) {
    return { error: true };
  }
};

/**
 * Attempt deleting an existing song.
 */
export const deleteSong = async id => {
  const request = new Request(DOMAIN + `/songs/${id}`, {
    method: 'DELETE',
  });

  try {
    const response = await fetch(request);

    if (response.ok) {
      return { success: true };
    }
  } catch (error) {
    return { error: true };
  }
};
