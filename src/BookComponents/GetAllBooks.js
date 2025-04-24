//import axios from "axios";
import { useState, useEffect, useCallback } from "react";
//import useCustomHook from './useCustomHook';

const GetAllBooks = () => {
    const [books, setBooks] = useState([]);

    const GetAllBooks = useCallback(async () => {
        const response = await fetch("https://localhost:44374/api/Books/", { method: 'GET' });
        //const response = await axios.get("https://localhost:44374/api/Books/")//, { method: 'GET' });
        if (!response.ok) {
            throw new Error('Someting Went Worng');
        }
        else {
            const resData = await response.json();

            const loadedBooks = [];
            for (const key in resData) {
                loadedBooks.push({
                    id: resData[key].id,
                    title: resData[key].title,
                    description: resData[key].description
                });
            }
            setBooks(loadedBooks);
        }
    }, []);

    const fetchBookHandler = () =>{
        GetAllBooks();
    }
    return (
        <div>
            <div>
                <h1>Get all the books list</h1>
                <button onClick={fetchBookHandler}>Fetch Books</button>
            </div>
            <div>
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Title</th>
                            <th scope="col">Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            books.map((book) => (
                                <tr key={book.id}>
                                    <td>{book.id}</td>
                                    <td>{book.title}</td>
                                    <td>{book.description}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default GetAllBooks;

