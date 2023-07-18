import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useLocation} from 'react-router-dom'
import './EditPost.css'
import { supabase } from '../client'


const EditPost = ({data}) => {
    
    const location = useLocation();
    const {id} = useParams();
    const [Posts, setPosts] = useState(data.filter(item => item.id == id)[0]);

    const handleChange = (event) => {
        const {name, value} = event.target;
        setPosts( (prev) => {
            return{
            ...prev,
            [name]:value,
            }
        })
    }
    const updatePost = async (event) => {
        event.preventDefault();

        await supabase
        .from('Posts')
        .update({Title: Posts.Title, Author: Posts.Author, Description: Posts.Description})
        .eq('id', id);
        
        window.location = "/";
    }
    const deletePost = async(event) =>{
        event.preventDefault();

        await supabase
        .from('Posts')
        .delete()
        .eq('id',id);

        window.location="/"
    }

    return (
        <div>
            <form onSubmit={updatePost}>
                <label for="title">Title</label> <br />
                <input type="text" id="title" name="Title" defaultValue={location.state.Title} onChange={handleChange} />
                <br />
                <br/>
                <label for="author">Author</label><br />
                <input type="text" id="author" name="Author" defaultValue={location.state.Author} onChange={handleChange}/>
                <br />
                <br/>
                <label for="description">Description</label><br />
                <textarea rows="5" cols="50" id="Description" name='Description' defaultValue={location.state.Description} onChange={handleChange} >
                </textarea>
                <br/>
                <br/>
                <input type="submit" value="Submit" />
                <button className="deleteButton" onClick={deletePost}>Delete</button>
            </form>
        </div>
    )
}

export default EditPost