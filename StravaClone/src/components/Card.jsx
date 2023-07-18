import React from 'react'
import { useState } from 'react'
import './Card.css'
import { Link, useLocation } from 'react-router-dom'
import more from './more.png'
import { supabase } from '../client'

const Card = (props) =>  {
  
  const [count, setCount] = useState(0)
  const updateCount = () => {
    setCount((count) => count + 1);
  }

  let id = props.id
  let author = props.author
  let title =props.title
  let description = props.description
  let age = props.age
  let time = props.time
  let upvotes = props.upvotes
  let dateformat = new Date(time)

  const handleUpvote = async (event) => {
    event.preventDefault();

    await supabase
    .from('Posts')
    .update({Upvotes: upvotes+1})
    .eq('id', id);
    
    window.location = "/";
}

  return (
      <div className="Card">
          <Link to={'edit/'+ props.id} state={{Age:age, Title:title, Author:author, Description:description}}>
            <img className="moreButton" alt="edit button" src={more} />
          </Link>
          <h2 className="title">{props.title}</h2>
          <p>{"Upvotes: "+ upvotes}</p>
          <p className="author">{"Created by " + props.author}</p>
          <p>{"Date created: "+dateformat}</p>
          <Link to={'info/'+ props.id} state={{Age:age, Title:title, Author:author, Description:description, Upvotes:upvotes}}>
            <button> View Post </button>
          </Link>
          <button onClick={handleUpvote}>Upvote</button>
      </div>
  );
};

export default Card