import { useState, useEffect } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import {useUserStore} from '../store/userStore';

function Login() {
    const { userToken, userConnect, setUserToken, setConnect } = useUserStore();
    const [isSubmitted, setIsSubmitted] = useState(false);

	async function handleSubmit(event) {
		event.preventDefault()
		const username = event.target.elements.usernameInput.value
		const password = event.target.elements.passwordInput.value

		const login = await fetch('http://localhost:3000/users/login/', {
			method :"POST",
			headers: {
				'Content-Type': 'application/json',
				'authorization' : 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZFUiOjEsIm1haWwiOiJtaWxvQGhvdG1haWwuZnIiLCJyb2xlIjoxLCJpYXQiOjE2NzA1MzEyMzUsImV4cCI6MTcwMjA4ODgzNX0.hFsjpS_joetTIXp-c1RU9N9MH6-JXNxRtFYf6YQ8EqU'
			  },
			body: JSON.stringify({
				mail: username,
				mdp: password
			})
			
		}).then(response => response.json())

			setUserToken(login.accessToken);
			setConnect(login.user.idU)


		if (login.hasOwnProperty('accessToken')) {
			setIsSubmitted(true);
		}
		else{
            setUserToken('')
			setConnect('')
			alert(login.error)
		}
	}

	const consoleLog = (e =>{
		console.log("Token ."+userToken);
		console.log("users "+ userConnect);
		
	})

    const renderForm=(
        <div className='root'>
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
				<Link to={`/register`}><button>Sign Up</button></Link>
            </form>
        </div>
    )
    
    return (
		
		<div className='root'>
			
			{userToken !== "" ? <Link to={`/`}><h1>Home</h1></Link> : renderForm}
	
		</div>
	);
}
 export default Login