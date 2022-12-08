import { useState, useEffect } from 'react';
import '../App.css';
import { useParams, Link } from 'react-router-dom';
import {useUserStore} from '../store/userStore';

function User() {
    let { id } = useParams();
    const [user, setUser] = useState(null);
    const { userToken, users, setUserToken, setUsers } = useUserStore();
    
    useEffect(() => {
		fetch('http://localhost:3000/users/'+id)
			.then((res) => res.json())
			.then((res) => setUsers(res));
        if (!id || !users) return;
		setUser(users.find((item)));
	}, [users]);



    return (
		<div>
			<header>
			
					<Link to={`/`}><button>Home</button></Link>
						
			</header>

			{user && (
				<>
					<h2>{user.mail}</h2>
					
				</>
			)}
		</div>
	);
}

export default User