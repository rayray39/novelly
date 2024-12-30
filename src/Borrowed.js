import { useState, useEffect } from "react"
import TopNavBar from "./TopNavBar"
import { useUser } from "./UserContext";

function Borrowed() {
    const [borrowedBooks, setBorrowedBooks] = useState([]);
    const {currentUser} = useUser();

    useEffect(() => {
        // the logic will run when the component mounts and everytime the currentUser changes.
        const fetchBorrowedBooks = async () => {
            // makes a GET request to the server, which returns all the borrowed books in the user's list.
            try {
                const response = await fetch(`http://localhost:5000/borrowed-books/${currentUser.username}`, {
                    method: 'GET',
                })
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                console.log(`Borrowed books: ${data.borrowed_books}`);
                data.borrowed_books.forEach(book => {
                    console.log(book.title);
                });
                setBorrowedBooks(data.borrowed_books || []);    // fetch the borrowed books and store in state variable.
            } catch (error) {
                console.error('Error fetching borrowed books:', error);
            }
        }

        if (currentUser) {
            fetchBorrowedBooks();
        }
    }, [currentUser])

    const handleReturnBook = async (bookId) => {
        // makes a DELETE request to the server to remove borrowed book from list of borrowed books.
        try {
            const response = await fetch(`http://localhost:5000/return-book/${currentUser.username}/${bookId}`, {
                method: 'DELETE',
            });
            
            // filter the books that do not have the bookId of the returning book.
            setBorrowedBooks((prevBooks) =>
                prevBooks.filter((book) => book.id !== bookId)
            );

            const data = await response.json();
            if (!response.ok) {
                const message = data.error;
                alert(message);
                return;
            }

            alert(`successfully returned book!`);
        } catch (error) {
            console.error(`Error in returning book: ${error}`)
        }
    }

    function formatDate(dateString) {
        const date = new Date(dateString);  // convert the string back into a date object.
        const dd = String(date.getDate()).padStart(2, '0'); // Add leading zero if needed
        const mm = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
        const yyyy = date.getFullYear();

        return `${dd}-${mm}-${yyyy}`;
    }

    const listItems = borrowedBooks.map((book) => <div className="books-card-display" key={book.id}>
        <p><img src={book.image} alt="cover page of book" /></p>
        <p>{book.title}</p>
        <p>{`Authors: ${book.authors}`}</p>
        <p>{`Published Date: ${book.publishedDate}`}</p>
        <details>
            <summary>See description</summary>
            <p>{book.description}</p>
        </details>

        <p style={{fontWeight:'bold'}}>Due date: {formatDate(book.dueDate)}</p>

        <button id="return-button" onClick={() => handleReturnBook(book.id)}>Return</button>
    </div>)

    return <div className="route-page" id="borrowed-page">
        <TopNavBar />

        <h1 className="main-title-2">BORROWED BOOKS</h1>

        <div className="borrowed-books-page">
            <ul>{listItems}</ul>
        </div>
    </div>
}

export default Borrowed