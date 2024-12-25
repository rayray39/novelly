import { useState } from "react";
import { useUser } from "./UserContext";
import usersData from './data/users.json';

// display all the fetch and processed books as an unordered list.

function Book(props) {
    const { currentUser } = useUser(); // Access currently logged in user.
    const [users, setUsers] = useState(usersData);

    const handleBorrow = (book) => {
        console.log(`ID of borrowed book: ${book.id}`);
        console.log(`title of borrowed book: ${book.title}`);
        console.log(`currently logged in user: ${currentUser.username}`)
        addBorrowedBook(book);
    }

    const addBorrowedBook = (borrowedBook) => {
        // adds the borrowedBook into the borrowed_books list of currently logged in user.
        setUsers((prevUsers) => {
            return prevUsers.map((user) => {
                if (user.username === currentUser.username) {
                    // Add the borrowed_books field if it doesn't exist
                    const updatedBorrowedBooks = [...(user.borrowed_books || []), borrowedBook];
                    console.log(`Successfully borrowed: ${borrowedBook.title}`);
                    return { ...user, borrowed_books: updatedBorrowedBooks };
                }
                return user;
            })
        })
    }

    const getBorrowedBooks = () => {
        // test function to get borrowed books of currently logged in user.
        const user = users.find((user) => user.username === currentUser.username);
        user.borrowed_books.forEach(borrowedBook => {
            console.log(borrowedBook.title);
        });
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