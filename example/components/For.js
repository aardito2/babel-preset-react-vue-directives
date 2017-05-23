import React from 'react';

const articles = [
	{
		id: 1,
		name: 'Article 1',
		content: 'Article 1 content',
	},
	{
		id: 2,
		name: 'Article 2',
		content: 'Article 2 content',
	},
];

export default () => (
	<ul>
		<li vFor="article of articles" key={article.id}>
			<h2>{article.name}</h2>
			<p>{article.content}</p>
		</li>
	</ul>
);

