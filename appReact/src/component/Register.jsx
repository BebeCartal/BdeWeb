import { useState, useEffect } from 'react';
import '../App.css';
import { Link, useNavigate } from 'react-router-dom';
import {useUserStore} from '../store/userStore';

function Register() {
    const { userToken, setUserToken } = useUserStore();
    const [isSubmitted, setIsSubmitted] = useState(false);
	const navigate = useNavigate();

	async function handleSubmit(event) {
		event.preventDefault()
		const username = event.target.elements.usernameInput.value
		const password = event.target.elements.passwordInput.value

		const login = await fetch('http://localhost:3000/users/', {
			method :"POST",
			headers: {
				'Content-Type': 'application/json',
			  },
			body: JSON.stringify({
				mail: username,
				mdp: password
			})
			
		}).then(response => response.json())

		if (login.hasOwnProperty('user')) {
			setIsSubmitted(true);
			navigate("/login");
		}
		else{
            setUserToken('')
			alert(login.error)
		}
	}

    const renderForm=(
        <div className='root'>
            <form onSubmit={handleSubmit} className="normalForm">
            <h1> Sign Up </h1>
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
                <button type="submit">Creer un compte</button>
				<Link to={`/login`}><button>Sign In</button></Link>
				<Link to={`/`}><button>Home</button></Link>
            </form>
        </div>
    )
    
    return (
		
		<div className='root'>
			
			{isSubmitted ? <Link to={`/login`}><h1>Se connecter</h1></Link> : renderForm}
	
		</div>
	);
}
 export default Register