import { useState, useEffect } from 'react';
import './App.css';
import { Link } from 'react-router-dom';

import { usePostStore } from './store/postStore';
import { useCategoryStore } from './store/categoryStore';

function App() {
	const { posts, setPosts } = usePostStore();
	const { categories, setCategories } = useCategoryStore();//
	const [SearchTerm, setSearchTerm] = useState("");
	const [isSubmitted, setIsSubmitted] = useState(false);
	useEffect(() => {
		fetch('http://localhost:3000/articles/')
			.then((res) => res.json())
			.then((res) => setPosts(res));
		fetch('http://localhost:3000/categories/')
			.then((resc) => resc.json())
			.then((resc) => setCategories(resc));
		
		
	}, []);

	async function handleSubmit(event) {
		event.preventDefault()
		const username = event.target.elements.usernameInput.value
		const password = event.target.elements.passwordInput.value
		console.log(username)
		console.log(password)
		//récupération des données rentrées
		//alert(`You entered : ${username} and ${password}`)

		const login = await fetch('http://localhost:3000/users/login/', {
			method :"POST",
			headers: {
				'Content-Type': 'application/json'
			  },
			body: JSON.stringify({
				mail: username,
				mdp: password
			})
			
		}).then(response => response.text())

			console.log(login)


		if (login !== 'user found') {
		  alert(login)
		}
		else{
			//alert(login)
			setIsSubmitted(true);
		}
	}

	const handleSearchTerm = (e) => {
        //value va intercepté la donnée 
        let value = e.target.value;
        //et la mettre dans le string
        setSearchTerm(value);
    };

	const renderForm=(
	<div>
		<h1> Login </h1>
		<form onSubmit={handleSubmit}>
			<div>
				<label>Mail:</label>
				<input type="email" name="email" id="usernameInput" required />
			</div>
			<div>
				<label>Password: </label>
				<input type="password" name="password" id="passwordInput" required />
			</div>
			<button type="submit">Se connecter</button>
		</form>
	</div>)


	return (
		
		<div className="App">
			{isSubmitted ? <h1>Connect</h1> : renderForm}
			<nav>
				<ul className="menu">
					<li>
					Catégories
					<ul className="sub-menu">
					{categories.length > 0 &&
					categories.map((post) => {
						return (
							<Link key={post.idC} to={`/categorie/${post.idC}`}><li>{post.nomC}</li></Link>
						);
					})}
					</ul>
					</li>
				</ul>
			</nav>
			
			
			<h1>Les articles</h1>
			<div className="card">
				{posts.length > 0 &&
					posts.map((post) => {
						return (
							<div key={post.idA}>
								<h2>{post.titre}</h2>
								<p>{post.texte}</p>
								<Link to={`/articles/${post.idA}`}>Consulter l'article</Link>
							</div>
						);
					})}
			</div>

			<input type="text" placeholder="search" onChange={handleSearchTerm} />
			<div className="card">
                {posts.filter((post) => {
                    return post.titre.toLowerCase().includes(SearchTerm.toLowerCase())
                	}).map((post) => {                                                        
                        return (
                            <div key={post.idA}>
                                <Link to={`/articles/${post.idA}`}><h2>{post.titre}</h2></Link>
                                <p>{post.texte}</p>
                            </div>
                        );
                    })}
			</div>
		</div>
	);
}

export default App;
