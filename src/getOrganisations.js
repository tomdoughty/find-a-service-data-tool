import axios from 'axios';
import {
  SEARCH_API_HOST,
  SEARCH_API_KEY
} from './constants';

export default async (latitude, longitude, filter, top) => {
  try {
    return await axios({
      method: 'POST',
      url: SEARCH_API_HOST,
      headers: {
        'Content-Type': 'application/json',
        'subscription-key': SEARCH_API_KEY,
      },
      data: {
        searchFields: 'ServicesProvided',
        search: filter,
        searchMode: 'all',
        orderby: `geo.distance(Geocode, geography'POINT(${longitude} ${latitude} )')`,
        top,
      },
    });
  }
  catch (error) {
    return error;
  };
};
