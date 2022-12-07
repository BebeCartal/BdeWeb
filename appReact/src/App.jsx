import { useState, useEffect } from 'react';
import './App.css';
import { Link } from 'react-router-dom';

import { usePostStore } from './store/postStore';
import { useCategoryStore } from './store/categoryStore';
import {useUserStore} from './store/userStore';

function App() {
	const { posts, setPosts } = usePostStore();
	const { categories, setCategories } = useCategoryStore();
	const { userToken, setUserToken } = useUserStore();
	const [SearchTerm, setSearchTerm] = useState("");
	useEffect(() => {
		fetch('http://localhost:3000/articles/')
			.then((res) => res.json())
			.then((res) => setPosts(res));
		fetch('http://localhost:3000/categories/')
			.then((resc) => resc.json())
			.then((resc) => setCategories(resc));
		
		
	}, []);

	const handleSearchTerm = (e) => {
        //value va intercepté la donnée 
        let value = e.target.value;
        //et la mettre dans le string
        setSearchTerm(value);
    };

	const Disconnect = (e) =>{
		setUserToken('');
	}

	return (
		
		<div>
			
			<header>
				<nav>
					{categories.length > 0 &&
					categories.map((post) => {
						return (
							<Link key={post.idC} to={`/categorie/${post.idC}`}><button>{post.nomC}</button></Link>
						);
					})}
				</nav>
				<input type="text" placeholder="search" onChange={handleSearchTerm} />
				{userToken !== "" ? <button onClick={Disconnect}>Disconnect</button> : <Link to={`/login`}><button>Sign In</button></Link>}
				{userToken !== "" ? <p></p> : <Link to={`/register`}><button>Sign Up</button></Link>}
			</header>
			<h1>Les articles</h1>
			
			<div className='tab'>
                {posts.filter((post) => {
                    return post.titre.toLowerCase().includes(SearchTerm.toLowerCase())
                	}).map((post) => {                                                        
                        return (
							<Link to={`/articles/${post.idA}`}>
								<div key={post.idA} className="card">
									<h2>{post.titre}</h2>
									<p>{post.texte}</p>
								</div>
							</Link>
                        );
                    })}
			</div>
		</div>
	);
}

export default App;
