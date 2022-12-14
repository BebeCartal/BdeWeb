import { useState, useEffect } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { useUserStore } from '../store/userStore';

function Login() {
    const { userToken, userConnect, role, setUserToken, setConnect, setRole } = useUserStore();
    const [isSubmitted, setIsSubmitted] = useState(false);
	const navigate = useNavigate();

	async function handleSubmit(event) {
		event.preventDefault()
		const username = event.target.elements.usernameInput.value
		const password = event.target.elements.passwordInput.value

		const login = await fetch('http://localhost:3000/users/login/', {
			method :"POST",
			headers: {
				'Content-Type': 'application/json',
				
			  },
			body: JSON.stringify({
				mail: username,
				mdp: password
			})
			
		}).then(response => response.json())

			setUserToken(login.accessToken);
			setConnect(login.user.idU);
			setRole(login.user.role)


		if (login.hasOwnProperty('accessToken')) {
			navigate("/");
		}
		else{
            setUserToken('')
			setConnect('')
			alert(login.error)
		}
	}

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
				<Link to={`/`}><button>Home</button></Link>
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