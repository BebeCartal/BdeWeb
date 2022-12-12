import { useState, useEffect } from 'react';
import '../App.css';
import { useParams, Link } from 'react-router-dom';
import {useUserStore} from '../store/userStore';
import { usePostStore } from '../store/postStore';

function User() {
    let { id } = useParams();
	const { posts, setPosts } = usePostStore();
    const [user, setUser] = useState(null);
    const { userToken, users, userConnect, setUserToken, setUsers } = useUserStore();
    
    useEffect(() => {
		fetch('http://localhost:3000/users/'+id)
			.then((res) => res.json())
			.then((res) => setUsers(res));
		
			fetch('http://localhost:3000/users/'+id+'/favoris')
			.then((resc) => resc.json())
			.then((resc) => setPosts(resc));
        if (!id || !userConnect) return;
		setUser(users.find((item) => Number(item.idU) === Number(id)));
	}, [id, users]);


    async function handleSubmit(event) {
		event.preventDefault()
		const username = event.target.elements.usernameInput.value
		const password = event.target.elements.passwordInput.value

		const update = await fetch('http://localhost:3000/users/'+id, {
			method :"PUT",
			headers: {
				'Content-Type': 'application/json',
				'authorization' : 'bearer '+userToken
			  },
			body: JSON.stringify({
				mail: username,
				mdp: password
			})
			
		}).then(response => response.text())
        alert(update)
	};

	async function delFav(idA) {

		const deleteFav = await fetch('http://localhost:3000/users/'+id+'/favoris', {
			method :"DELETE",
			headers: {
				'Content-Type': 'application/json',
				'authorization' : 'bearer '+userToken
			  },
			body: JSON.stringify({
				idU: id,
				idA: idA,

			})
			
		}).then(response => response.text())
		alert(deleteFav)
	}

    const consoleLog = (e =>{
        console.log("id ."+id)
		console.log("users ."+users.find((item) => Number(item.idU) === Number(id)));
		console.log("user connect ."+userConnect);

	})


    return (
		<div className='root'>

            {user && (
				<>
                <div>
                    <form onSubmit={handleSubmit}>
                        <h1>{user.mail}</h1>
                        <div className='cote'>
                            <div className='test'>
                                <label>Confirm Mail:</label>
                                <label>New Password: </label>
                                
                            </div>
                        
                            <div className='test'>
                                <input type="email" name="email" id="usernameInput" required />
                                <input type="password" name="password" id="passwordInput" required />
                            </div>
                        </div>
                        <button type="submit">Update</button>
                        <Link to={`/`}><button>Home</button></Link>
                    </form>
                </div>
				</>
			)}
			<div className='tab'>
				{posts.length > 0 &&
					posts.map((post) => {
						return (
							
								<div key={post.idA} className="card">
									<Link to={`/articles/${post.idA}`}><h2>{post.titre}</h2></Link>
									<p>{post.texte}</p>
									<button onClick={() => delFav(post.idA)}>Del from Fav</button>
								</div>
							
						);
					})}
			</div>
		</div>
	);
}

export default User