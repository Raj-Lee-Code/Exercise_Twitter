import React from 'react'
import {useState, useEffect} from 'react';
import './CardDesc.css'
import { supabase } from '../client'

const Card = (props) =>  {
    let id = props.id
    const [posts, setPosts] = useState(0);

    const fetchPosts = async () => {
        const {data} = await supabase
        .from('Posts')
        .select()
        .eq('id', id);
        // set state of posts
        setPosts(data[0])
      }

    useEffect(() => {
        fetchPosts()
    },[]);
  
  let author = props.author
  let title =props.title
  let description = props.description
  let upvotes = props.upvotes

  const handleUpvote = async (event) => {
    event.preventDefault();

    await supabase
    .from('Posts')
    .update({Upvotes: upvotes+1})
    .eq('id', id);
    window.location.reload();
}
  return (
      <div className="Card">
          <h2 className="title">{props.title}</h2>
          <p className='description'>{props.description}</p>
          <p className="author">{"Created by " + props.author}</p>
          <p>{"Upvotes: "+ posts.Upvotes}</p>
          <button onClick={handleUpvote}>Upvote</button>
      </div>
  );
};

export default Card