import { useRef, useState } from "react";

function Catalogue() {
    const url = 'https://www.googleapis.com/books/v1/volumes?';
    
    const inputRef = useRef(null);
    const [data, setData] = useState(null);
    const [books, setBooks] = useState(null);

    const handleClick = () => {
        // get search query
        const searchTerm = inputRef.current.value;
        console.log(`user is searching for: ${searchTerm}`);

        // make get request to api
        const fetchUrl = url + `q=${searchTerm}&key=${myApiKey}`;
        fetch(fetchUrl)
        .then(response => {
            console.log(`response status: ${response.status}`);
            return response.json();
        })
        .then(result => setData(result));
    }

    const displayBooks = () => {
        // process the data returned from api
        if (data.items) {
            console.log(`total no. of items found: ${data.totalItems}`);
            const processedBooks = data.items.map((item) => {
                const volumeInfo = item.volumeInfo;

                return {
                    title: volumeInfo.title || "No Title Available",
                    authors: volumeInfo.authors || ["Unknown Author"],
                    publishedDate: volumeInfo.publishedDate || "Unknown Date",
                    image: volumeInfo.imageLinks?.thumbnail || "https://via.placeholder.com/128x194?text=No+Image",
                    description: volumeInfo.description || "No Description Available",
                };
            });
            setBooks(processedBooks);
        } else {
            setBooks([])
        }

        books.forEach(book => {
            // console.log(`title of book: ${book.title}`);
            // console.log(`author(s) of book: ${book.authors}`);
            // console.log(`published date of book: ${book.publishedDate}`);
            // console.log('\n');
            console.log(book);
        });
    }

    return <div>
        <h1 className="main-title">Browse through the catalogue</h1>

        <input type="text" className="form-control" placeholder="search for a book" ref={inputRef}/>
        <button onClick={handleClick}>search</button>
        <button onClick={displayBooks}>display books</button>
    </div>
}

export default Catalogue;