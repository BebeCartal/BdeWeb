import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCategoryStore } from '../store/categoryStore';

function Categorie() {
	let { id } = useParams();
	const [categ, setCateg] = useState(null);
	const { categories } = useCategoryStore();

	useEffect(() => {
		if (!id || !categories) return;
		setCateg(categories.find((item) => Number(item.idC) === Number(id)));
	}, [id, categories]);

	return (
		<div>
			{categ && (
				<>
					<h2>{categ.nomC}</h2>
					<Link to={`/`}>retour à la liste</Link>
				</>
			)}
		</div>
	);
}

export default Categorie;
