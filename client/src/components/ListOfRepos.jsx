import React from 'react';

const ListofRepos = (props) => (
	<ul>
	<li>
		<span>{props.repo.id}</span>
		<br/>
		<span>{props.repo.full_name}</span>
		<br/>
		<span>{props.repo.watchers} watchers</span>
	</li>
	</ul>
)

export default ListofRepos;

