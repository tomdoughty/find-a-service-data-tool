import React from 'react';
import getLatLong from './getLatLong';
import getOrganisations from './getOrganisations';
import { 
  ORGANISATIONS,
  SEXUAL_HEALTH_SERVICES,
} from './constants';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: '',
      postcode: '',
      top: 10,
      data: null,
      apiKey: '7542f5b4dbd94396910bd1e0af786d78'
    }
  }

  handleInput(key, e) {
    this.setState({ [key]: e.target.value })
  }

  async handleSubmit(e) {
    e.preventDefault();
    const { latitude, longitude } = await getLatLong(this.state.postcode);
    const result = await getOrganisations(
      latitude, 
      longitude, 
      this.state.filter,
      this.state.top,
      this.state.apiKey
    );
    this.setState({ data: result.data.value });
  }

  render() {
    return (
      <div className="App">
        <h1>API Tool</h1>
        <form onSubmit={e => this.handleSubmit(e)}>

          <label htmlFor='filter'>Select a filter</label>
          <select   
            id='filter'
            required
            value={ this.state.filter } 
            onChange={ e => this.handleInput('filter', e) }
          >
            <option value='' disabled>Select a filter</option>
            { Object.values({
              ...ORGANISATIONS, 
              ...SEXUAL_HEALTH_SERVICES
            }).map(({ code, display }) => (
              <option key={ code } value={ code }>{ display }</option>
            ))}
          </select>

          <label htmlFor='postcode'>Postcode</label>
          <input 
            id='postcode' 
            pattern="([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9][A-Za-z]?))))\s?[0-9][A-Za-z]{2})"
            required
            value={ this.state.postcode.toUpperCase() }
            onChange={e => this.handleInput('postcode', e)}
          />

          <label htmlFor='apikey'>API Key</label>
          <input 
            id='apikey'
            required
            value={ this.state.apiKey } 
            onChange={e => this.handleInput('apiKey', e)}
          />

          <label htmlFor='top'>Results count</label>
          <input
            type='number'
            min="1" max="100"
            id='top'
            value={ this.state.top } 
            onChange={e => this.handleInput('top', e)} 
          />

          <button type='submit'>Submit</button>
        </form>
        { this.state.data &&
          this.state.data.map(org => (
            <table>
              <thead>
                <tr>
                  <th>Key</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                { Object.entries(org).map(([ key, value]) => (
                  <tr>
                    <td>{ key }</td>
                    <td>{ JSON.stringify(value) }</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ))}
      </div>
    );
  }
}

export default App;
