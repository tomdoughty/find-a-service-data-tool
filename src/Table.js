import React from 'react';
import { 
	ORGANISATIONS,
	SEXUAL_HEALTH_SERVICES,
} from './constants';

const getServiceName = (filter) => {
	return Object.values({ ...ORGANISATIONS, ...SEXUAL_HEALTH_SERVICES}).find(({ code }) => code === filter).display;
}

export default ({ data, filter, postcode }) => (
	<React.Fragment>
		<h2>Showing { data.length } results for { getServiceName(filter) } near { postcode.toUpperCase() }</h2>
		{ data.map(org => (
			<table key={ org.OrganisationID }>
				<thead>
					<tr>
						<th>Key</th>
						<th>Value</th>
					</tr>
				</thead>
				<tbody>
					{ Object.entries(org).map(([ key, value]) => (
					<tr key={ key }>
						<td>{ key }</td>
						<td>{ JSON.stringify(value) }</td>
					</tr>
					))}
				</tbody>
			</table>
		))}
	</React.Fragment>
)