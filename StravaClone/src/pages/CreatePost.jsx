import React, { useState } from 'react';
import './CreatePost.css'
import { supabase } from '../client'
import { Link } from 'react-router-dom'

let url = 'https://vmufy6xes4.execute-api.us-east-1.amazonaws.com/default/Lambda_SES_Microservice';

const CreatePost = ({token}) => {
    const [Posts, setPost] = useState({Title:"", Author:token.user.user_metadata.user_name, Descritption:"", Age:0, email:token.user.email})
    const [friends, setFriends] = useState([]);

    const handleChange = (event) => {
        const {name, value} = event.target;

        setPost((prev)=>{
            return{
                ...prev,
                [name]:value,
            }
        })
    }

    async function getFriendss(){
        const {data} = await supabase
        .from('Friends')
        .select('email')
        .or(`user.eq.${token.user.id}`)
        setFriends(data)
    }

    async function emailer(){
         
        let senders_data = [];
         for await (const friend of friends){
             senders_data.push(friend.email)
         }
         
         let email_data = {
             "title": "Your friend just made a workout post!",
             "recipients": senders_data,
             "message": `Your friend,${token.user.user_metadata.user_name} , just posted a workout, go give them an upvote!`
         }
          
          let sending = JSON.stringify(email_data)
          const res = await fetch("https://vmufy6xes4.execute-api.us-east-1.amazonaws.com/default/Lambda_SES_Microservice", {
            body: sending,
            headers: {
                'Access-Control-Allow-Origin': '*',
                "Content-Type": "application/json",
                "X-Api-Key": import.meta.env.VITE_APP_API_KEY
            },
            method: "POST"
        });
    }
    
    async function getPosts(){
        await supabase
        .from('Posts')
        .insert({Title: Posts.Title, Author: Posts.Author, Description: Posts.Description, email:Posts.email})
        .select();
        window.location = "/HomePage";
    }

    const createPost = async (event) => {
        event.preventDefault();
        await getFriendss()
        await emailer()
        await getPosts()
    }

    return (
        <div>
            <Link to="/HomePage"><button className='headerBtn'>Go back home</button></Link>
            <form onSubmit={createPost}>
                <label for="title">Post Title</label> <br />
                <input type="text" id="title" name="Title" onChange={handleChange} /><br />
                <br/>

                <label for="description">Post content</label><br />
                <textarea rows="5" cols="50" id="description" name='Description' onChange={handleChange}>
                </textarea>
                <br/>
                <input type="submit" value="Submit" />

            </form>
        </div>
    )
}

export default CreatePost