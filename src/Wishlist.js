import { useState, useEffect } from "react"
import TopNavBar from "./TopNavBar"
import { useUser } from "./UserContext";

function Wishlist() {
    const [wishlistBooks, setWishlistBooks] = useState([]);
    const {currentUser} = useUser();

    useEffect(() => {
        // the logic will run when the component mounts and everytime the currentUser changes.
        const fetchWishlistBooks = async () => {
            // makes a GET request to the server, which returns all the books in the user's wishlist.
            try {
                const response = await fetch(`http://localhost:5000/wishlist/${currentUser.username}`, {
                    method: 'GET',
                })
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                console.log(`Wishlist books: ${data.wishlist}`);
                data.wishlist.forEach(book => {
                    console.log(book.title);
                });
                setWishlistBooks(data.wishlist || []);    // fetch the wishlist books and store in state variable.
            } catch (error) {
                console.error('Error fetching wishlist books:', error);
            }
        }

        if (currentUser) {
            fetchWishlistBooks();
        }
    }, [currentUser])

    const handleBorrow = (book) => {
        console.log(`ID of borrowed book: ${book.id}`);
        console.log(`title of borrowed book: ${book.title}`);
        console.log(`currently logged in user: ${currentUser.username}`)
        addBorrowedBook(book);      // add book to borrowed list.
        setWishlistBooks((prevBooks) =>
            prevBooks.filter((wishlistBook) => wishlistBook.id !== book.id)
        );
    }

    const addBorrowedBook = async (borrowedBook) => {
        // adds the borrowedBook into the borrowed_books list of currently logged in user.
        // makes a POST request to server.
        const currentBorrowedBooks = currentUser.borrowed_books;    // current list of borrowed books for logged in user.
        const alreadyBorrowed = (book) => book.id === borrowedBook.id;
        if (currentBorrowedBooks.some(alreadyBorrowed)) {
            alert(`book already borrowed: ${borrowedBook.title}`);
            console.log(`book already borrowed: ${borrowedBook.title}`)
            return;
        }
        try {
            const repsonse = await fetch('http://localhost:5000/borrow-book', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: currentUser.username, borrowedBook }),
            });

            const data = await repsonse.json();
            
            if (!repsonse.ok) {
                const message = data.error;
                alert(message);
                return;
            }

            alert(`successfully borrowed: ${borrowedBook.title}`);
        } catch (error) {
            console.error(`Error in borrowing book: ${error}`)
        }
    }

    const handleRemoveBook = async (bookId) => {
        // makes a DELETE request to the server to remove book from wishlist.
        try {
            const repsonse = await fetch(`http://localhost:5000/remove-from-wishlist/${currentUser.username}/${bookId}`, {
                method: 'DELETE',
            });
            
            // filter the books that do not have the bookId of the removing book.
            setWishlistBooks((prevBooks) =>
                prevBooks.filter((book) => book.id !== bookId)
            );

            const data = await repsonse.json();
            
            if (!repsonse.ok) {
                const message = data.error;
                alert(message);
                return;
            }

            alert(`successfully removed book!`)
        } catch (error) {
            console.error(`Error in removing book from wishlist: ${error}`)
        };
    }

    const listItems = wishlistBooks.map((book) => <div className="books-card-display" key={book.id}>
        <p><img src={book.image} alt="cover page of book" /></p>
        <p>{book.title}</p>
        <p>{`Authors: ${book.authors}`}</p>
        <p>{`Published Date: ${book.publishedDate}`}</p>
        <details>
            <summary>See description</summary>
            <p>{book.description}</p>
        </details>

        <div style={{display:'flex', marginTop:'5px'}}>
            <button id="borrow-button" onClick={() => handleBorrow(book)}>Borrow</button>
            <button id="remove-button" onClick={() => handleRemoveBook(book.id)}>Remove</button>
        </div>
    </div>)

    return <div className="route-page" id="wishlist-page">
        <TopNavBar />

        <h1 className="main-title-2">WISHLIST</h1>
        
        <div className="wishlist-books-page">
            <ul>{listItems}</ul>
        </div>
    </div>
}

export default Wishlist