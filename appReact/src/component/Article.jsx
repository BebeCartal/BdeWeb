import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { usePostStore } from '../store/postStore';

function Article() {
	let { id } = useParams();
	const [post, setPost] = useState(null);
	const { posts } = usePostStore();

	useEffect(() => {
		if (!id || !posts) return;
		setPost(posts.find((item) => Number(item.idA) === Number(id)));
	}, [id, posts]);

	async function del() {

		const deleteArt = await fetch('http://localhost:3000/articles/'+id, {
			method :"DELETE",
			headers: {
				'Content-Type': 'application/json',
				'authorization' : 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZFUiOjEsIm1haWwiOiJtaWxvQGhvdG1haWwuZnIiLCJyb2xlIjoxLCJpYXQiOjE2NzA1MzEyMzUsImV4cCI6MTcwMjA4ODgzNX0.hFsjpS_joetTIXp-c1RU9N9MH6-JXNxRtFYf6YQ8EqU'
			  },
			body: JSON.stringify({
				idA: id,
			})
			
		}).then(response => response.text())
		alert(deleteArt)
	}

	return (
		<div className='root'>
			
			{post && (
				<>
					<h1>{post.titre}</h1>
					<p className='postTxt'>{post.texte}</p>
					<Link to={`/`}>retour à la liste</Link>
					<button onClick={del}>Delete</button>
				</>
			)}
		</div>
	);
}

export default Article;
