import { useState, useEffect } from 'react';
import '../App.css'
import { useParams, Link } from 'react-router-dom';
import { useCategoryStore } from '../store/categoryStore';

import { usePostStore } from '../store/postStore';

function Categorie() {
	let { id } = useParams();
	const { posts, setPosts } = usePostStore();
	const [categ, setCateg] = useState(null);
	const { categories, setCategories } = useCategoryStore();

	
	useEffect(() => {
		fetch('http://localhost:3000/categories/'+id)
			.then((res) => res.json())
			.then((res) => setPosts(res));
		fetch('http://localhost:3000/categories/')
			.then((resc) => resc.json())
			.then((resc) => setCategories(resc));
		if (!id || !categories) return;
		setCateg(categories.find((item) => Number(item.idC) === Number(id)));
	}, [id]);

	const handleSearchTerm = (e) => {
        //value va intercepté la donnée 
        let value = e.target.value;
        //et la mettre dans le string
        setSearchTerm(value);
    };

	return (
		<div className='root'>
			<header>
			
				<nav>
					<Link to={`/`}><button>Retour à la liste</button></Link>
					{categories.length > 0 &&
					categories.map((post) => {
						return (
							<Link key={post.idC} to={`/categorie/${post.idC}`}><button>{post.nomC}</button></Link>
						);
					})}
				</nav>
				<input type="text" placeholder="search" onChange={handleSearchTerm} />
				
			</header>

			{categ && (
				<>
					<h2>{categ.nomC}</h2>

					
					<div className="tab">
						{posts.length > 0 &&
							posts.map((post) => {
								return (
									<Link to={`/articles/${post.idA}`}>
										<div key={post.idA} className="card">
											
											<h2>{post.titre}</h2>
										</div>
									</Link>
								);
							})}
					</div>
					
				</>
			)}
		</div>
	);
}

export default Categorie;
