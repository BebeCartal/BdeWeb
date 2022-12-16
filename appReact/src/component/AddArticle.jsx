import { useState, useEffect } from 'react';
import '../App.css';
import { useParams, Link } from 'react-router-dom';
import { useUserStore } from '../store/userStore';
import { useCategoryStore } from '../store/categoryStore';


function AddArt() {
	const { userToken, userConnect, role, setUserToken, setConnect, setRole } = useUserStore();
	const { categories, setCategories } = useCategoryStore();

	useEffect(() => {
		fetch('http://localhost:3000/categories/')
			.then((rescat) => rescat.json())
			.then((rescat) => setCategories(rescat));
	}, [])

	async function handleSubmit(event) {
		event.preventDefault()
		const title = event.target.elements.titleInput.value
		const content = event.target.elements.contentInput.value
		const cat = event.target.elements.cat.value

		const addArticle = await fetch('http://localhost:3000/articles/', {
			method: "POST",
			headers: {
				'Content-Type': 'application/json',
				'authorization': 'bearer ' + userToken
			},
			body: JSON.stringify({
				titre: title,
				texte: content,
				categorie: cat,
			}),

		}).then(response => response.text())
		alert(addArticle);
	}

	return (

		<div className='root'>

			<form onSubmit={handleSubmit} id='AddArt' className="normalForm">

				<h1> Add Article </h1>

				<div id="art">
					<label for="categorie">Choose a categorie:</label>

					<select name="categorie" id="cat">
						{categories.length > 0 &&
							categories.map((post) => {
								return (
									<option value={post.nomC}>{post.nomC}</option>
								);
							})
						}
					</select>

					<label for="title">Title:</label>
					<textarea type="text" name="title" id="titleInput" required rows="2" cols="50" />

					<label>Content: </label>
					<textarea type="text" name="content" id="contentInput" required rows="35" cols="100" />
				</div>

				<button type="submit">Add</button>

				<Link to={`/`}><button>Home</button></Link>
			</form>

		</div>
	);
}
export default AddArt