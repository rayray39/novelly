import { useState, useEffect, useRef } from "react"
import TopNavBar from "./TopNavBar"
import { useUser } from "./UserContext";

function Wishlist() {
    const [wishlistBooks, setWishlistBooks] = useState([]);     // books inside the user's wishlist.
    const {currentUser} = useUser();                            // represents the currently logged in user.
    const [openNotes, setOpenNotes] = useState(false);          // toggles between true/false, to open the notes textarea.
    const textareaRef = useRef({});

    const [bookNotesContent, setBookNotesContent] = useState({});           // holds the content of the notes for every book.
    const [renderDisplayedNotes, setRenderDisplayedNotes] = useState({});   // toggles between true/false, to display posted notes.

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

                    if (book.notes) {
                        // if this book already has notes, display the readonly post, save the notes into the bookNotesContent.
                        setRenderDisplayedNotes((prev) => ({...prev, [book.id]: true}));
                        setBookNotesContent((prev) => ({...prev, [book.id]: book.notes}));
                    }

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

    const handleRemoveBook = async (bookId) => {
        // makes a DELETE request to the server to remove book from wishlist.
        try {
            const response = await fetch(`http://localhost:5000/remove-from-wishlist/${currentUser.username}/${bookId}`, {
                method: 'DELETE',
            });
            
            // filter the books that do not have the bookId of the removing book.
            setWishlistBooks((prevBooks) =>
                prevBooks.filter((book) => book.id !== bookId)
            );

            const data = await response.json();
            
            if (!response.ok) {
                const message = data.error;
                alert(message);
                return;
            }

            alert(`successfully removed book!`)
        } catch (error) {
            console.error(`Error in removing book from wishlist: ${error}`)
        };
    }

    const AddNotes = (props) => {
        // displays the textarea for adding notes to a book inside the wishlist.
        return <div style={{marginTop: "15px", display: 'flex', alignItems: 'start'}}>
            <textarea
                name="notes"
                placeholder="Write a note..."
                aria-label="Notes for a book"
                cols='40'
                autoFocus={true}
                onChange={(e) => {noteChange(e, props.bookId)}}
                ref={(el) => (textareaRef.current[props.bookId] = el?.value)}
                >
            </textarea>

            <button id="post-notes-button" onClick={() => handlePost(props.bookId)}>Post</button>
        </div>
    }

    const noteChange = (e, bookId) => {
        // dynamically updates the notes for specific book with bookId.
        textareaRef.current[bookId] = e.target.value;
    }

    const handlePost = async (idOfBook) => {
        // post button
        const notes = textareaRef.current[idOfBook];
        console.log(`notes: ${notes}`);

        setBookNotesContent((prev) => ({    // assign content of notes to book.
            ...prev,
            [idOfBook]: notes
        }))

        setOpenNotes((prev) => ({   // closes the write access textarea.
            ...prev,
            [idOfBook]: false
        }))

        setRenderDisplayedNotes((prev) => ({    // displays the posted notes.
            ...prev,
            [idOfBook]: true
        }))

        try {
            const response = await fetch('http://localhost:5000/wishlist/post-notes', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: currentUser.username, bookId: idOfBook, notes: notes }),
            });

            const data = await response.json();
            if (!response.ok) {
                const message = data.error;
                alert(message);
                return;
            }
            alert(`${data.message}`);
        } catch (error) {
            console.error(`Error in adding notes to book: ${error}`)
        }
    }

    const handleNotes = (bookId) => {
        // Add Notes button
        // open or close notes textarea for specific book.
        setOpenNotes((prev) => ({
            ...prev,
            [bookId]: !prev[bookId]     // toggle specific book's state.
        }))

        setRenderDisplayedNotes((prev) => ({
            ...prev,
            [bookId]: false     // hides the posted notes.
        }))
    }

    const viewAllNotes = async () => {
        // view all the notes for wishlist books that have them. mainly for debugging.
        try {
            const response = await fetch(`http://localhost:5000/wishlist/all-notes/${currentUser.username}`, {
                method: 'GET',
            });

            const data = await response.json();
            if (!response.ok) {
                const message = data.error;
                alert(message);
                return;
            }
            data.notes.forEach(note => {
                console.log(`note: ${note}`);
            });
        } catch (error) {
            console.error(`Error in adding notes to book: ${error}`)
        }
    }

    const DisplayedNotes = (props) => {
        // component to display posted notes (readonly textarea)
        const contentOfNotes = bookNotesContent[props.bookId];
        return <div style={{marginTop: '15px'}}>
            <textarea name="displayed-notes" readOnly cols={40} value={contentOfNotes}></textarea>
        </div>
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
            <button id="add-notes-button" onClick={() => handleNotes(book.id)}>{openNotes[book.id] ? 'Close' : 'Add'} notes</button>

            {/* <button onClick={viewAllNotes}>view all notes</button> */}
        </div>

        {openNotes[book.id] ? <AddNotes bookId={book.id} /> : null}
        {renderDisplayedNotes[book.id] ? <DisplayedNotes bookId={book.id} /> : null}
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