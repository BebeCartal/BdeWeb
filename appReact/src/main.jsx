import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Article from './component/Article';
import Categorie from './component/Categorie';
import Login from './component/Login';
import Register from './component/Register';
import User from './component/User';
import AddArt from './component/AddArticle';
import './index.css';

import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom';

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
	},
	{
		path:'/login',
		element: <Login />,
	},
	{
		path:'/register',
		element: <Register />,
	},
	{
		path:'/users/:id',
		element: <User />
	},
	{
		path: '/articles/:id',
		element: <Article />,
	},
	{
		path: '/articles/add',
		element: <AddArt />,
	},
	{
		path: '/categorie/:id',
		element: <Categorie />,
	},
	
]);

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
