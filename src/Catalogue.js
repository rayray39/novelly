import { useRef, useState } from "react";

function Catalogue() {
    const url = 'https://www.googleapis.com/books/v1/volumes?';
    
    const inputRef = useRef(null);
    const [data, setData] = useState(null);
    const [books, setBooks] = useState(null);

    const handleClick = async () => {
        // get search query
        const searchTerm = inputRef.current.value;
        console.log(`user is searching for: ${searchTerm}`);

        // make get request to api
        const fetchUrl = url + `q=${searchTerm}&key=${myApiKey}`;
        await fetch(fetchUrl)
        .then(response => {
            console.log(`response status: ${response.status}`);
            return response.json();
        })
        .then(result => setData(result));
    }

    const processBooks = () => {
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
            console.log('processing books: success');
        } else {
            setBooks([]);
            console.log('processing books: error');
        }
    }

    const displayBooks = () => {
        books.forEach(book => {
            console.log(`title of book: ${book.title}`);
            console.log(`author(s) of book: ${book.authors}`);
            console.log(`published date of book: ${book.publishedDate}`);
            console.log('\n');
        });
    }

    return <div id="catalogue-page">
        <h1 className="main-title-2">CATALOGUE</h1>

        <input id="searchbar" type="text" className="form-control" placeholder="search for a book" ref={inputRef}/>
        <button id="search-button" className="btn btn-success btn-block" onClick={handleClick}>search</button>
    </div>
}

export default Catalogue;