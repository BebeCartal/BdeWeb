import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { usePostStore } from '../store/postStore';
import {useUserStore} from '../store/userStore';
import { useCategoryStore } from '../store/categoryStore';
import { useNavigate } from "react-router-dom";

function Article() {
	let { id } = useParams();
	const [post, setPost] = useState(null);
	const { posts } = usePostStore();
	const { userToken, userConnect, role, setUserToken, setConnect, setRole } = useUserStore();
	const navigate = useNavigate();
	const { categories, setCategories } = useCategoryStore();


	let idU = userConnect;

	useEffect(() => {
		fetch('http://localhost:3000/categories/')
			.then((resc) => resc.json())
			.then((resc) => setCategories(resc));

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
		navigate('/');
	}

	async function addTag() {

		const deleteArt = await fetch('http://localhost:3000/articles/'+id, {
			method :"POST",
			headers: {
				'Content-Type': 'application/json',
				'authorization' : 'bearer '+userToken
			  },
			body: JSON.stringify({
				idA: id,
			})
			
		}).then(response => response.text())
		navigate('/');
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

	const Disconnect = (e) =>{
		setUserToken('');
		setConnect('');
		setRole('');
	}

	return (

		<div className='root'>

			<header>
				<h1>BDE ASCII.net</h1>
				<nav>
					{categories.length > 0 &&
					categories.map((post) => {
						return (
							<Link key={post.idC} to={`/categorie/${post.idC}`}><button>{post.nomC}</button></Link>
						);
					})}
				</nav>
				<div className='headerMenu'>
					{userToken !== "" ? <button onClick={Disconnect}>Disconnect</button> : <Link to={`/login`}><button>Sign In</button></Link>}
					{userToken !== "" ? <Link to={`/users/${userConnect}`}><button>account</button></Link> : <Link to={`/register`}><button>Sign Up</button></Link>}
				</div>
				
				{role !== 1 ? <p></p> :
					<div className='headerMenu'>
						<Link to={`/articles/add`}><button>Add Article</button></Link>
					</div>
					
				}
				
			</header>
			
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
