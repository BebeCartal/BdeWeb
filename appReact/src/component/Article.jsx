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

	return (
		<div className='root'>
			
			{post && (
				<>
					<h2>{post.titre}</h2>
					<p>{post.texte}</p>
					<Link to={`/`}>retour à la liste</Link>
				</>
			)}
		</div>
	);
}

export default Article;
