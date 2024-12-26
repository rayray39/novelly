import { useState } from "react";
import { useUser } from "./UserContext";
import usersData from './data/users.json';

// display all the fetch and processed books as an unordered list.

function Book(props) {
    const { currentUser } = useUser(); // Access currently logged in user.
    const [users] = useState(usersData);

    const handleBorrow = (book) => {
        console.log(`ID of borrowed book: ${book.id}`);
        console.log(`title of borrowed book: ${book.title}`);
        console.log(`currently logged in user: ${currentUser.username}`)
        addBorrowedBook(book);
    }

    const addBorrowedBook = async (borrowedBook) => {
        // adds the borrowedBook into the borrowed_books list of currently logged in user.
        // makes a POST request to server.
        try {
            const repsonse = await fetch('http://localhost:5000/borrow-book', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: currentUser.username, borrowedBook }),
            });

            const data = await repsonse.json();
            console.log(data.message);
        } catch (error) {
            console.error(`Error in borrowing book: ${error}`)
        }
    }

    const getBorrowedBooks = async () => {
        // test function to get borrowed books of currently logged in user.
        // makes a GET request to server.
        console.log(`getting borrowed books of: ${currentUser.username}`)
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
        } catch (error) {
            console.error('Error fetching borrowed books:', error);
        }
    }

    const listItems = props.books.map(book => <div className="books-card-display" key={book.id}>
        <p><img src={book.image} alt="cover page of book" /></p>
        <p>{book.title}</p>
        <p>{`Authors: ${book.authors}`}</p>
        <p>{`Published Date: ${book.publishedDate}`}</p>
        <details>
            <summary>See description</summary>
            <p>{book.description}</p>
        </details>

        <div style={{display:'flex', marginTop:'5px'}}>
            <button id="borrow-button" onClick={() => handleBorrow(book)} style={{marginTop:"10px", fontFamily: "Georgia, 'Times New Roman', Times, serif"}}>Borrow</button>
            <button id="wishlist-button" style={{marginTop:"10px", fontFamily: "Georgia, 'Times New Roman', Times, serif"}}>Add to Wishlist</button>
            <button onClick={getBorrowedBooks}>get borrowed books</button>
        </div>
    </div>)

    return <div className="books-page">
        <ul>{listItems}</ul>
    </div>
}

export default Book