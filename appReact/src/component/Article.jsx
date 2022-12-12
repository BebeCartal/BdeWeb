import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { usePostStore } from '../store/postStore';
import {useUserStore} from '../store/userStore';

function Article() {
	let { id } = useParams();
	const [post, setPost] = useState(null);
	const { posts } = usePostStore();
	const { userToken, userConnect, role, setUserToken, setConnect, setRole } = useUserStore();

	let idU = userConnect;

	useEffect(() => {
		if (!id || !posts) return;
		setPost(posts.find((item) => Number(item.idA) === Number(id)));
	}, [id, posts]);

	async function del() {

		const deleteArt = await fetch('http://localhost:3000/articles/'+id, {
			method :"DELETE",
			headers: {
				'Content-Type': 'application/json',
				'authorization' : 'bearer '+userToken
			  },
			body: JSON.stringify({
				idA: id,
			})
			
		}).then(response => response.text())
		alert(deleteArt)
	}

	async function favoris() {

		const fav = await fetch('http://localhost:3000/users/'+idU+'/favoris', {
			method :"POST",
			headers: {
				'Content-Type': 'application/json',
				'authorization' : 'bearer '+userToken
			  },
			body: JSON.stringify({
				idU: idU,
				idA: id
			})
			
		}).then(response => response.text())
		alert(fav)
	}

	return (
		<div className='root'>
			
			{post && (
				<>
					<h1>{post.titre}</h1>
					<p className='postTxt'>{post.texte}</p>
					<Link to={`/`}>retour à la liste</Link>
					
					{role !== 1 ? <p></p> : <button onClick={del}>Delete</button>}
					{userToken !== '' ? <button onClick={favoris}>Add to Fav</button> : <p></p>}

				</>
			)}
		</div>
	);
}

export default Article;
