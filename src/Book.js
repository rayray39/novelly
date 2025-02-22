import { useUser } from "./UserContext";

// display all the fetch and processed books as an unordered list.

function Book(props) {
    const { currentUser } = useUser(); // Access currently logged in user.

    const handleBorrow = (book) => {
        console.log(`ID of borrowed book: ${book.id}`);
        console.log(`title of borrowed book: ${book.title}`);
        console.log(`currently logged in user: ${currentUser.username}`)
        addBorrowedBook(book);
    }

    const addBorrowedBook = async (borrowedBook) => {
        // adds the borrowedBook into the borrowed_books list of currently logged in user from catalogue.
        // makes a POST request to server.
        const currentBorrowedBooks = currentUser.borrowed_books;    // current list of borrowed books for logged in user.
        const alreadyBorrowed = (book) => book.id === borrowedBook.id;
        if (Array.isArray(currentBorrowedBooks)) {
            if (currentBorrowedBooks.some(alreadyBorrowed)) {
                alert(`book already borrowed: ${borrowedBook.title}`);
                console.log(`book already borrowed: ${borrowedBook.title}`)
                return;
            }
        }
        try {
            const response = await fetch('http://localhost:5000/borrow-book', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: currentUser.username, borrowedBook }),
            });

            const data = await response.json();
            if (!response.ok) {
                const message = data.error;
                alert(message);
                return;
            }
            alert(`successfully borrowed: ${borrowedBook.title}`);
        } catch (error) {
            console.error(`Error in borrowing book: ${error}`)
        }
    }

    const addToWishlist = async (wishlistBook) => {
        // adds the wishlistBook into the wishlist list of currently logged in user.
        // makes a POST request to server.
        const currentWishlistBooks = currentUser.wishlist;    // current list of wishlist books for logged in user.
        const alreadyInWishlist = (book) => book.id === wishlistBook.id;
        if (Array.isArray(currentWishlistBooks) && currentWishlistBooks.some(alreadyInWishlist)) {
            alert(`book already added to wishlist: ${wishlistBook.title}`);
            console.log(`book already added to wishlist: ${wishlistBook.title}`)
            return;
        }
        try {
            const response = await fetch('http://localhost:5000/add-to-wishlist', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: currentUser.username, wishlistBook }),
            });

            const data = await response.json();

            if (!response.ok) {
                const message = data.error;
                alert(message);
                return;
            }
            
            alert(`successfully added to wishlist: ${wishlistBook.title}`);
        } catch (error) {
            console.error(`Error in adding to wishlist: ${error}`)
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
            <button id="borrow-button" onClick={() => handleBorrow(book)}>Borrow</button>
            <button id="wishlist-button" onClick={() => addToWishlist(book)}>Add to Wishlist</button>
        </div>
    </div>)

    return <div className="books-page">
        <ul>{listItems}</ul>
    </div>
}

export default Book