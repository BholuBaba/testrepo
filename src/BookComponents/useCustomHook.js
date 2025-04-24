import {useState, useCallback} from 'react';

function useCustomHook(){
    const [books, setBooks] = useState([]);

    useCallback(async () => {
        const response = await fetch("https://localhost:44374/api/Books/", { method: 'GET' });
        //const response = await axios.get("https://localhost:44374/api/Books/")//, { method: 'GET' });
        if (!response.ok) {
            throw new Error('Someting Went Worng');
        }
        else {
            const resData = await response.json();
            //console.log(resData);
            //return resData;
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

    return books;
}

export default useCustomHook;


