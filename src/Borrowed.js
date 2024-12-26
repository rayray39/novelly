import { useState, useEffect } from "react"
import TopNavBar from "./TopNavBar"
import { useUser } from "./UserContext";

function Borrowed() {
    const [borrowedBooks, setBorrowedBooks] = useState([]);
    const {currentUser} = useUser();

    useEffect(() => {
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

    return <div className="route-page" id="borrowed-page">
        <TopNavBar />
        <h1>This is the borrowed books page</h1> 

        <div>
            {borrowedBooks.map((book) => <li key={book.id}>{book.title}</li>)}
        </div>
    </div>
}

export default Borrowed