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
        return;
    }

    const handleRemoveBook = () => {
        return;
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
            <button id="remove-button" onClick={() => handleRemoveBook()}>Remove</button>
        </div>
    </div>)

    return <div className="route-page" id="wishlist-page">
        <TopNavBar />
        
        <div className="wishlist-books-page">
            <ul>{listItems}</ul>
        </div>
    </div>
}

export default Wishlist