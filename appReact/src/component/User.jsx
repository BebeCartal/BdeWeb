import { useState, useEffect } from 'react';
import '../App.css';
import { useParams, Link } from 'react-router-dom';
import {useUserStore} from '../store/userStore';

function User() {
    let { id } = useParams();
    const [user, setUser] = useState(null);
    const { userToken, users, userConnect, setUserToken, setUsers } = useUserStore();
    
    useEffect(() => {
		fetch('http://localhost:3000/users/'+id)
			.then((res) => res.json())
			.then((res) => setUsers(res));
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
				'authorization' : 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZFUiOjEsIm1haWwiOiJtaWxvQGhvdG1haWwuZnIiLCJyb2xlIjoxLCJpYXQiOjE2NzA1MzEyMzUsImV4cCI6MTcwMjA4ODgzNX0.hFsjpS_joetTIXp-c1RU9N9MH6-JXNxRtFYf6YQ8EqU'
			  },
			body: JSON.stringify({
				mail: username,
				mdp: password
			})
			
		}).then(response => response.text())
        alert(update)
			
	};

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
		</div>
	);
}

export default User