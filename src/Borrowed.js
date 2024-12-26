import { useState, useEffect } from "react"
import TopNavBar from "./TopNavBar"
import { useUser } from "./UserContext";

function Borrowed() {
    const [borrowedBooks, setBorrowedBooks] = useState([]);
    const {currentUser} = useUser();

    useEffect(() => {
        // the logic will run when the component mounts and everytime the currentUser changes.
        const fetchBorrowedBooks = async () => {
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
                setBorrowedBooks(data.borrowed_books || []);
            } catch (error) {
                console.error('Error fetching borrowed books:', error);
            }
        }

        if (currentUser) {
            fetchBorrowedBooks();
        }
    }, [currentUser])

    const handleReturnBook = async (bookId) => {
        try {
            const repsonse = await fetch(`http://localhost:5000/return-book/${currentUser.username}/${bookId}`, {
                method: 'DELETE',
            });
            
            // filter the books that do not have the bookId of the returning book.
            setBorrowedBooks((prevBooks) =>
                prevBooks.filter((book) => book.id !== bookId)
            );

            const data = await repsonse.json();
            console.log(data.message);
        } catch (error) {
            console.error(`Error in returning book: ${error}`)
        }
    }

    const getDueDate = () => {
        const today = new Date();
        const dueDate = new Date(today.getFullYear(), today.getMonth(), today.getDate()+21);
        console.log(dueDate);
        const date = dueDate.getDate();
        const month = dueDate.getMonth() + 1;
        const year = dueDate.getFullYear();
        return `${date}-${month}-${year}`;
    }
    const dueDate = getDueDate();

    const listItems = borrowedBooks.map((book) => <div className="books-card-display" key={book.id}>
        <p><img src={book.image} alt="cover page of book" /></p>
        <p>{book.title}</p>
        <p>{`Authors: ${book.authors}`}</p>
        <p>{`Published Date: ${book.publishedDate}`}</p>
        <details>
            <summary>See description</summary>
            <p>{book.description}</p>
        </details>

        <p style={{fontWeight:'bold'}}>Due date: {dueDate}</p>

        <button id="return-button" onClick={() => handleReturnBook(book.id)}>Return</button>
    </div>)

    return <div className="route-page" id="borrowed-page">
        <TopNavBar />

        <div className="borrowed-books-page">
            <ul>{listItems}</ul>
        </div>
    </div>
}

export default Borrowed