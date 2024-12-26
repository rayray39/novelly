import { Link } from "react-router-dom";
import { useUser } from "./UserContext";

function TopNavBar() {
    const {currentUser} = useUser();

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

    return <>
        <nav id="top-nav-bar">
            <ul>
                <li><strong>NOVELLY</strong></li>
            </ul>
            <ul>
                <li><Link to='/catalogue' className="contrast">catalogue</Link></li>
                <li><Link to='/borrowed' className="contrast" onClick={getBorrowedBooks}>borrowed</Link></li>
                <li><Link to='/wishlist' className="contrast">wish list</Link></li>
                <li><Link to='/account' className="contrast">account</Link></li>
            </ul>
        </nav>
    </>
}

export default TopNavBar