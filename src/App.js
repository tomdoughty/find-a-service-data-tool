import React from 'react';
import getLatLong from './getLatLong';
import getOrganisations from './getOrganisations';
import Table from './Table';
import { 
  ORGANISATIONS,
  SEXUAL_HEALTH_SERVICES
} from './constants';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      filter: '',
      postcode: '',
      top: 10,
      data: null,
      apiKey: ''
    }
  }

  handleInput(key, e) {
    this.setState({ 
      [key]: e.target.value,
      data: null
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ loading: true }, async () => {
      const { postcode, filter, top, apiKey } = this.state;
      const { latitude, longitude } = await getLatLong(postcode);
      const result = await getOrganisations(
        latitude, 
        longitude, 
        filter,
        top,
        apiKey
      );
      this.setState({ 
        loading: false,
        data: result.data.value 
      });
    });
  }

  render() {
    const {
      loading,
      filter,
      postcode,
      apiKey,
      top,
      data
    } = this.state;

    return (
      <React.Fragment>
        <h1>API Tool</h1>

        <form onSubmit={e => this.handleSubmit(e)}>

          <label htmlFor='filter'>Select a filter (required)</label>
          <select   
            id='filter'
            required
            value={ filter } 
            onChange={ e => this.handleInput('filter', e) }
          >
            <option value='' disabled>- Select a filter -</option>
            <optgroup label='Organisations'>
              { Object.values(ORGANISATIONS).map(({ code, display }) => (
                <option key={ code } value={ code }>{ display }</option>
              ))}
            </optgroup>
            <optgroup label='Sexual health services'>
              { Object.values(SEXUAL_HEALTH_SERVICES).map(({ code, display }) => (
                <option key={ code } value={ code }>{ display }</option>
              ))}
            </optgroup>
          </select>

          <label htmlFor='postcode'>Postcode (required, full format)</label>
          <input 
            id='postcode' 
            pattern="([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9][A-Za-z]?))))\s?[0-9][A-Za-z]{2})"
            required
            value={ postcode.toUpperCase() }
            onChange={e => this.handleInput('postcode', e)}
          />
            
          <label htmlFor='apikey'>API Key (required)</label>
          <input 
            id='apikey'
            required
            value={ apiKey } 
            onChange={e => this.handleInput('apiKey', e)}
          />

          <label htmlFor='top'>Results count (required, value 1 to 100)</label>
          <input
            type='number'
            min="1" max="100"
            id='top'
            value={ top } 
            onChange={e => this.handleInput('top', e)} 
          />

          <button 
            type='submit'
            disabled={ loading }
          >{ loading ? 'Loading' : 'Submit' }</button>
        </form>

        { data && <Table data={ data } filter={ filter } postcode={ postcode } /> }
      </React.Fragment>
    );
  }
}

export default App;
