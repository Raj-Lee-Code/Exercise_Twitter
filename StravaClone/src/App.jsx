import './App.css';
import { supabase } from './client';
import React, {Children, useEffect, useState} from 'react';
import { useRoutes } from 'react-router-dom'
import ReadPosts from './pages/ReadPosts'
import CreatePost from './pages/CreatePost'
import PostInfo from './pages/PostInfo'
import EditPost from './pages/EditPost'
import { Link } from 'react-router-dom'
import LoginPage from './pages/LoginPage';
import SignUp from './pages/SignUp';
import HomePage from './pages/Homepage';

const App = () => {

  const posts = []

  //grab session token
  const [token, setToken] = useState(false)
  if (token){
    localStorage.setItem('token', JSON.stringify(token))
  }


  //keep user authenticated
  useEffect(()=>{
    if(localStorage.getItem('token')){
      let data = JSON.parse(localStorage.getItem('token'))
      setToken(data)
    }
  }, [])



  // Sets up routes
  let element = useRoutes([
    {
      path: "/",
      element:<LoginPage setToken={setToken}/>
    },
    {
      path: "/SignUp",
      element:<SignUp/>
    },
    // checks if there is a session token, only then goes to homepage
    token?{
      path: "/HomePage", element:<HomePage token={token}/>
    }:"",
    {
      path:"edit/:id",
      element: <EditPost data={posts} />
    },
    {
      path:"info/:id",
      element: <PostInfo/>
    },
    {
      path: "/home",
      element:<ReadPosts/>
    },
,
    {
      path:"/new",
      element: <CreatePost token={token}/>
    },

  ]);

  return ( 

    <div className="App">
      {element}
    </div>

  );
}

export default App;