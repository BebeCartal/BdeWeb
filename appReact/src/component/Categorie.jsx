import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { usePostStore } from '../store/postStore';

function Categorie() {
	let { id } = useParams();
	const [post, setPost] = useState(null);
	const { posts } = usePostStore();

	useEffect(() => {
		if (!id || !posts) return;
		setPost(posts.find((item) => Number(item.idC) === Number(id)));
	}, [id, posts]);

	return (
		<div>
			
			{post && (
				<>
					<h2>{post.nomC}</h2>
					<Link to={`/`}>retour à la liste</Link>
				</>
			)}
		</div>
	);
}

export default Categorie;
