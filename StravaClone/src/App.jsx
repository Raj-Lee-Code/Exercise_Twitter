import './App.css';
import React from 'react';
import { useRoutes } from 'react-router-dom'
import ReadPosts from './pages/ReadPosts'
import CreatePost from './pages/CreatePost'
import PostInfo from './pages/PostInfo'
import EditPost from './pages/EditPost'
import { Link } from 'react-router-dom'


const App = () => {

  const posts = []

  // Sets up routes
  let element = useRoutes([
    {
      path: "/",
      element:<ReadPosts/>
    },
    {
      path:"/edit/:id",
      element: <EditPost data={posts} />
    },
    {
      path:"/new",
      element: <CreatePost />
    },
    {
      path:"/info/:id",
      element: <PostInfo/>
    }
  ]);

  return ( 

    <div className="App">

      <div className="header">
        <h1>Strava Clone!</h1>
        <Link to="/"><button className="headerBtn"> See all Posts  </button></Link>
        <Link to="/new"><button className="headerBtn"> Create a Post </button></Link>
      </div>
        {element}
    </div>

  );
}

export default App;