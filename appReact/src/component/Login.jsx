import { useState, useEffect } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import {useUserStore} from '../store/userStore';

function Login() {
    const { userToken, setUserToken } = useUserStore();
    const [isSubmitted, setIsSubmitted] = useState(false);

	async function handleSubmit(event) {
		event.preventDefault()
		const username = event.target.elements.usernameInput.value
		const password = event.target.elements.passwordInput.value

		const login = await fetch('http://localhost:3000/users/login/', {
			method :"POST",
			headers: {
				'Content-Type': 'application/json',
				'authorization' : 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtYWlsIjoibWlsb0Bob3RtYWlsLmZyIiwiaWF0IjoxNjcwMjM3NDgxLCJleHAiOjE3MDE3OTUwODF9.qDSA-8926rh5Gckbb1s069G_IRURUlRVLukY0Wr6qKU'
			  },
			body: JSON.stringify({
				mail: username,
				mdp: password
			})
			
		}).then(response => response.json())

			setUserToken(login.accessToken)

		if (login.hasOwnProperty('accessToken')) {
			setIsSubmitted(true);
		}
		else{
            setUserToken('')
			alert(login.error)
		}
	}

    const renderForm=(
        <div>
            <form onSubmit={handleSubmit}>
            <h1> Login </h1>
                <div className='cote'>
                    <div className='test'>
                        <label>Mail:</label>
                        <label>Password: </label>
                        
                    </div>
                
                    <div className='test'>
                        <input type="email" name="email" id="usernameInput" required />
                        <input type="password" name="password" id="passwordInput" required />
                    </div>
                </div>
                <button type="submit">Se connecter</button>
            </form>
        </div>
    )
    
    return (
		
		<div>
			
			{userToken !== "" ? <Link to={`/`}><h1>Home</h1></Link> : renderForm}
	
		</div>
	);
}
 export default Login