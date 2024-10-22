import React,{ useState } from "react";
import axios from 'axios';

function BookUpload() {

    const [name, setName] = useState();
    const [author, setAuthor] = useState()
    const [publisher, setPublisher] = useState()
    const [description, setDescription] = useState()
    const [book, setBook] = useState()

    const handleUpload = () => {
        const formData = new FormData();
        formData.append('name',name);
        formData.append('author',author);
        formData.append('publisher',publisher);
        formData.append('description',description);
        formData.append('book',book);
        axios.post('https://booknook-backend-2s18.onrender.com/uploadBook',formData)
        .then(res => console.log(res))
        .catch(err => console.log(err))
    }

    return(
        <div>
            <input type="text" placeholder="name" name="name" onChange={(e) => setName(e.target.value)} />
            <input type="text" placeholder="author" name="author" onChange={(e) => setAuthor(e.target.value)} />
            <input type="text" placeholder="publisher" name="publisher" onChange={(e) => setPublisher(e.target.value)} />
            <input type="text" placeholder="description" name="description" onChange={(e) => setDescription(e.target.value)} />
            <input type="file" name="book" onChange={(e) => setBook(e.target.files[0])} accept="application/pdf"/>
            <button onClick={handleUpload}>UPLOAD</button>
        </div>
    )
}

export default BookUpload;
