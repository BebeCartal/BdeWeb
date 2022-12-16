import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { usePostStore } from '../store/postStore';
import { useUserStore } from '../store/userStore';
import { useCategoryStore } from '../store/categoryStore';
import { useNavigate } from "react-router-dom";

const linkStyle = {
	textDecoration: "none",
	color: 'white'
};

function Article() {
	const [post, setPost] = useState(null);
	const { userToken, userConnect, role, setUserToken, setConnect, setRole } = useUserStore();
	const navigate = useNavigate();


	let idU = userConnect;

	useEffect(() => {
		fetch('http://localhost:3000/users/')
			.then((res) => res.json())
			.then((res) => setCategories(res));
	}, []);

	async function del() {

		const deleteArt = await fetch('http://localhost:3000/users/', {
			method: "DELETE",
			headers: {
				'Content-Type': 'application/json',
				'authorization': 'bearer ' + userToken
			},
			body: JSON.stringify({
				idA: id,
			})

		}).then(response => response.text())
		navigate('/');
	}

	const Disconnect = (e) => {
		setUserToken('');
		setConnect('');
		setRole('');
	}

	return (

		<div className='root'>

			{post && (
				<>
					<h1>{post.titre}</h1>
					<p className='postTxt'>{post.texte}</p>

					<div className='col'>
						<Link to={`/`}><button>retour à la liste</button></Link>
						{userToken !== '' ? <button onClick={favoris}>Add to Fav</button> : <p></p>}
						{role !== 1 ? <p></p> : <button onClick={del}>Delete</button>}
					</div>

				</>
			)}
		</div>
	);
}

export default Article;
