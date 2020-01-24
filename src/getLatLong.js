import PostcodesIO from 'postcodesio-client';
const postcodes = new PostcodesIO();

export default async (postcode) => {
  try {
    return await postcodes.lookup(postcode);
  } catch (error) {
    return error;
  }
};
