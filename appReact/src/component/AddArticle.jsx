import { useState, useEffect } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';

function AddArt() {

	async function handleSubmit(event) {
		event.preventDefault()
		const title = event.target.elements.titleInput.value
		const content = event.target.elements.contentInput.value

		const addArticle = await fetch('http://localhost:3000/articles/', {
			method :"POST",
			headers: {
				'Content-Type': 'application/json',
				'authorization' : 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZFUiOjEsIm1haWwiOiJtaWxvQGhvdG1haWwuZnIiLCJyb2xlIjoxLCJpYXQiOjE2NzA1MzEyMzUsImV4cCI6MTcwMjA4ODgzNX0.hFsjpS_joetTIXp-c1RU9N9MH6-JXNxRtFYf6YQ8EqU'
			  },
			body: JSON.stringify({
				titre: title,
				texte: content
			})
			
		}).then(response => response.text())
        alert(addArticle);
	}
    
    return (
		
		<div className='root'>
            
            <form onSubmit={handleSubmit}>
            
            <h1> Add Article </h1>
                <div className='cote'>
                    <div className='test'>
                        <label>Title:</label>
                        <label>Content: </label>
                        
                    </div>
                
                    <div className='test'>
                        <input type="text" name="title" id="titleInput" required />
                        <textarea type="text" name="content" id="contentInput" required />
                    </div>
                </div>
                <button type="submit">Add</button>
                <Link to={`/`}><button>Home</button></Link>
            </form>
            
        </div>
	);
}
export default AddArt