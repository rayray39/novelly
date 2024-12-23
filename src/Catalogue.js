import { useRef, useState, useEffect } from "react";
import Book from "./Book";

function Catalogue() {
    const url = 'https://www.googleapis.com/books/v1/volumes?';
    

    const inputRef = useRef(null);                      // references the text input
    const [books, setBooks] = useState(null);           // holds the processed books (title, authors, publishedDate, description, image)
    const [startIndex, setStartIndex] = useState(0)     // holds the start index for pagination
    const maxResults = 10;

    useEffect(() => {
        if (startIndex >= 0) {
            handleSearch();
        }
    }, [startIndex])

    const handleSearch = async () => {
        // get search query
        const searchTerm = inputRef.current.value;
        if (searchTerm === '') {
            console.error('search term is empty');
            return;
        }
        console.log(`user is searching for: ${searchTerm}`);

        try {
             // make get request to api
            const fetchUrl = url + `q=${searchTerm}&startIndex=${startIndex}&maxResults=${maxResults}&key=${myApiKey}`;
            const response = await fetch(fetchUrl);
            console.log(`status response from fetching Google API: ${response.status}`);
            if (!response.ok) {
                console.log('status response from fetching Google API: error')
                throw new Error('Error in fetching data form Google API');
            }

            const result = await response.json();

            // process the books information.
            if (result.items) {
                console.log(`total no. of items found: ${result.totalItems}`);
                const processedBooks = result.items.map((item) => {
                    const volumeInfo = item.volumeInfo;

                    return {
                        id: volumeInfo.id,
                        title: volumeInfo.title || "No Title Available",
                        authors: volumeInfo.authors || ["Unknown Author"],
                        publishedDate: volumeInfo.publishedDate || "Unknown Date",
                        image: volumeInfo.imageLinks?.thumbnail || "https://via.placeholder.com/128x194?text=No+Image",
                        description: volumeInfo.description || "No Description Available",
                    };
                });

                setBooks(processedBooks);
                console.log('processing books: success');

                // display the books information.
                processedBooks.forEach(book => {
                    console.log(`title of book: ${book.title}`);
                    console.log(`author(s) of book: ${book.authors}`);
                    console.log(`published date of book: ${book.publishedDate}`);
                    console.log('\n');
                });
            } else {
                setBooks([]);
                console.log('processing books: error');
                throw new Error('Error in handle search');
            }
        } catch (error) {
            console.error(error);
        }
    }

    const handleNextPage = () => {
        setStartIndex((prevIndex) => prevIndex + maxResults);
    }

    const handlePrevPage = () => {
        setStartIndex((prevIndex) => Math.max(prevIndex - maxResults, 0));
    }

    return <div id="catalogue-page">
        <h1 className="main-title-2">CATALOGUE</h1>

        <input id="searchbar" type="text" className="form-control" placeholder="search for a book" ref={inputRef}/>
        <button id="search-button" className="btn btn-success btn-block" onClick={handleSearch}>search</button>

        {books ? <Book books={books}/> : null}

        <div className="pagination-buttons">
            <button onClick={handlePrevPage}>Previous</button>
            <button onClick={handleNextPage}>Next</button>
        </div>
    </div>
}

export default Catalogue;