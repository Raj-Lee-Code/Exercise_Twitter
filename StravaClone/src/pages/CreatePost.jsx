import React, { useState } from 'react';
import './CreatePost.css'
import { supabase } from '../client'

const CreatePost = () => {
    const [Posts, setPost] = useState({Title:"", Author:"", Descritption:"", Age:0})

    const handleChange = (event) => {
        const {name, value} = event.target;

        setPost((prev)=>{
            return{
                ...prev,
                [name]:value,
            }
        })
    }

    const createPost = async (event) => {
       event.preventDefault();
       await supabase
        .from('Posts')
        .insert({Title: Posts.Title, Author: Posts.Author, Description: Posts.Description, Age: Posts.Age})
        .select();
        window.location = "/";
    }

    return (
        <div>
            <form onSubmit={createPost}>
                <label for="title">Post Title</label> <br />
                <input type="text" id="title" name="Title" onChange={handleChange} /><br />
                <br/>

                <label for="author">Created By</label><br />
                <input type="text" id="author" name="Author" onChange={handleChange}/><br />
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