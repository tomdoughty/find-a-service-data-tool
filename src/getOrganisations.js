import axios from 'axios';
import {
  ORGANISATIONS,
  SEARCH_API_HOST,
  SEARCH_API_KEY
} from './constants';

export default async (latitude, longitude, filter, top, apiKey) => {
  let data = {
    searchFields: 'ServicesProvided',
    search: filter,
    searchMode: 'all',
  };
  if (Object.values(ORGANISATIONS).find(org => org.code === filter)) {
    data = {
      filter: `OrganisationTypeID eq '${filter}'`,
    };
  }
  try {
    return await axios({
      method: 'POST',
      url: SEARCH_API_HOST,
      headers: {
        'Content-Type': 'application/json',
        'subscription-key': `${SEARCH_API_KEY}${apiKey}`,
      },
      data: {
        orderby: `geo.distance(Geocode, geography'POINT(${longitude} ${latitude} )')`,
        top,
        ...data
      }
    });
  }
  catch (error) {
    return error;
  };
};
