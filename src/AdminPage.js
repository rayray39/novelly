import { useEffect, useState } from "react";
import { useUser } from "./UserContext";
import { useNavigate } from "react-router-dom";

function UserCard({username, borrowedBooks, index}) {

    function formatDate(dateString) {
        const date = new Date(dateString);  // convert the string back into a date object.
        const dd = String(date.getDate()).padStart(2, '0'); // Add leading zero if needed
        const mm = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
        const yyyy = date.getFullYear();

        return `${dd}-${mm}-${yyyy}`;
    }

    const borrowedBookItems = borrowedBooks.map((book) => <li key={book.id}>{`Title: ${book.title}, Due Date: ${formatDate(book.dueDate)}`}</li>)

    return <div id="admin-card" key={index}>
        <p>{`Username: ${username}`}</p>
        <p>{'Borrowed books:'}</p>
        <ul id="users-borrowedBooks-list">
            {borrowedBookItems}
        </ul>
    </div>
}

function AdminPage() {
    const {currentUser, setCurrentUser} = useUser();
    const [allUsers, setAllUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchAllUsersData();  
        console.log(`all users: ${allUsers}`);

        if (!currentUser) {
            console.log('successfully logged out user');
            navigate("/")
        }
    }, [currentUser])

    const fetchAllUsersData = async () => {
        try {
            const response = await fetch(`http://localhost:5000/${currentUser.username}/admin-all`, {
                method: 'GET'
            })

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log(data.message);
            setAllUsers(data.users || []);
        } catch (error) {
            console.error('Error fetching all users data:', error);
        }
    }

    const userItems = allUsers.map((user, index) =>
        <UserCard index={index} username={user.username} borrowedBooks={user.borrowed_books}/>
    )

    const handleLogout = () => {
        console.log(`logging ${currentUser.username} out`);
        setCurrentUser(null);
    }

    return <>
        <div className="route-page" id="admin-page">
            <nav id="top-nav-bar">
                <ul>
                    <li><strong>NOVELLY</strong></li>
                </ul>
            </nav>
        </div>

        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <ul>{userItems}</ul>

            <button id='logout-button' className="pico-background-violet-650" onClick={handleLogout}>Log Out</button>
        </div>
    </>
}

export default AdminPage;