import { useState, useEffect } from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import {useUserStore} from './store/userStore';

const { userToken, setUserToken } = useUserStore();