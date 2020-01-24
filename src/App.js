import React from 'react';
import getLatLong from './getLatLong';
import getOrganisations from './getOrganisations';
import orgMapper from './orgMapper';
import { 
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
    );
    this.setState({ data: result.data.value });
  }

  render() {
    return (
      <div className="App">
        <h1>NHSUK Find a Service API Tool</h1>
        <form onSubmit={e => this.handleSubmit(e)}>

          <label htmlFor='filter'>Select a filter</label>
          <select   
            id='filter' 
            value={ this.state.filter } 
            onChange={ e => this.handleInput('filter', e) }
          >
            <option value='' disabled>Select a filter</option>
            { Object.values(SEXUAL_HEALTH_SERVICES).map(({ code }) => (
              <option key={ code } value={ code }>{ code }</option>
            ))}
          </select>

          <label htmlFor='postcode'>Postcode</label>
          <input 
            id='postcode' 
            value={ this.state.postcode } 
            onChange={e => this.handleInput('postcode', e)}
          />

          <label htmlFor='top'>Results count</label>
          <input 
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
