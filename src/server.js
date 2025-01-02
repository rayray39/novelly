// express server

const express = require('express')              // create server and use for defining the routes.
const fs = require('fs');                       // for file reading and writing (json files).
const bodyParser = require('body-parser');      // middleware to parse json requests.
const path = require('path');                   // to work with file and directories.
const cors = require('cors');

const app = express();
const PORT = 5000;

// middleware for CORS (cross origin resource sharing)
app.use(cors());

// middleware to handle incoming http requests with JSON data.
app.use(bodyParser.json());

const usersFilePath = path.join(__dirname, 'data', 'users.json');

// read data from json file.
const readUsers = () => {
    const data = fs.readFileSync(usersFilePath, 'utf-8');
    return JSON.parse(data);
};

// write data back to the json file.
const writeUsers = (data) => {
    fs.writeFileSync(usersFilePath, JSON.stringify(data, null, 2), 'utf-8');
};

// BORROW FEATURE START
// borrow book endpoint (POST method)
app.post('/borrow-book', (req, res) => {
    const { username, borrowedBook } = req.body;    // req is data from the frontend to backend.
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 21);    // due date is 3 weeks (21 days) from date of borrow.

    if (!username || !borrowedBook) {
        return res.status(400).json({ error: 'Username and borrowedBook are required.' });
    }

    const users = readUsers();
    const user = users.find((user) => user.username === username);
    if (!user) {
        return res.status(404).json({ error: 'User not found.' });
    }
    if (Array.isArray(user.borrowed_books)) {   // check first if the borrowed_books array is present.
        if (user.borrowed_books.some((book) => book.id === borrowedBook.id)) {
            // book already borrowed.
            return res.status(400).json({ error: `borrowedBook: [${borrowedBook.title}] already borrowed.` });
        }
    }
    if (Array.isArray(user.wishlist)) {     // check first if the wishlist array is present.
        if (user.wishlist.some((book) => book.id === borrowedBook.id)) {
            // book was inside wishlist, remove it from wishlist when borrowed.
            const bookIndex = user.wishlist.findIndex((book) => book.id === borrowedBook.id);
            const [removeWishlistBook] = user.wishlist.splice(bookIndex, 1);
        }
    }

    const borrowedBookWithDueDate = {...borrowedBook, dueDate: dueDate.toISOString()};   // add due date to borrowed book.
    // add the borrowed book to this user's borrowed_books list.
    user.borrowed_books = [...(user.borrowed_books || []), borrowedBookWithDueDate];
    writeUsers(users);
    return res.status(200).json({ message: `Successfully borrowed: ${borrowedBook.title}`, user }); // res is info sent from server (backend) back to client (frontend)
});

// get borrowed books endpoint (GET method)
app.get('/borrowed-books/:username', (req, res) => {
    const username = req.params.username;
    const users = readUsers();
    const user = users.find((user) => user.username === username);

    if (!user) {
        return res.status(404).json({ error: 'User not found.' });
    }
    if (!user.borrowed_books) {
        return res.status(404).json({ error: 'Borrowed books list not found.' });
    }

    // get the books inside this user's borrowed_books list.
    return res.status(200).json({ borrowed_books: user.borrowed_books || [] });
})

// return a borrowed book endpoint (DELETE method)
app.delete('/return-book/:username/:bookId', (req, res) => {
    const username = req.params.username;
    const bookId = req.params.bookId;

    const users = readUsers();
    const user = users.find((user) => user.username === username);
    if (!user) {
        return res.status(404).json({ error: 'User not found.' });
    }

    const returnBook = user.borrowed_books.find((book) => book.id === bookId);
    if (!returnBook) {
        return res.status(404).json({ error: 'Book title not found.' });
    }

    // remove the book from the list of borrowed_books
    const bookIndex = user.wishlist.findIndex((book) => book.id === bookId);
    const [removeReturnBook] = user.borrowed_books.splice(bookIndex, 1);

    writeUsers(users);  // update the users.json file.

    return res.status(200).json({ message: `Successfully returned: ${removeReturnBook.title}`, user });
})
// BORROW FEATURE END

// WISHLIST FEATURE START
// get the books in this user's wishlist (GET method)
app.get('/wishlist/:username', (req, res) => {
    const username = req.params.username;
    const users = readUsers();
    const user = users.find((user) => user.username === username);

    if (!user) {
        return res.status(404).json({ error: 'User not found.' });
    }
    if (!user.wishlist) {
        return res.status(404).json({ error: 'Wish list not found.' });
    }

    // get the books inside this user's wishlist.
    return res.status(200).json({ wishlist: user.wishlist || [] });
})

// add the book to this user's wishlist (POST method)
app.post('/add-to-wishlist', (req, res) => {
    const { username, wishlistBook } = req.body;
    const users = readUsers();
    const user = users.find((user) => user.username === username);

    if (!username || !wishlistBook) {
        return res.status(404).json({ error: 'Username and wishlistBook are required.' });
    }
    if (!user) {
        return res.status(404).json({ error: 'User not found.' });
    }
    if (Array.isArray(user.wishlist)) {
        if (user.wishlist.some((book) => book.id === wishlistBook.id)) {
            // book already inside wishlist.
            return res.status(400).json({ error: `wishlistBook: [${wishlistBook.title}] already added to wishlist.` });
        }
    }
    if (Array.isArray(user.borrowed_books)) {
        if (user.borrowed_books.some((book) => book.id === wishlistBook.id)) {
            // book already borrowed cannot be added into wishlist.
            return res.status(400).json({ error: `borrowedBook: [${wishlistBook.title}] already borrowed.` });
        }   
    }

    // add the book to this user's wishlist.
    user.wishlist = [...(user.wishlist || []), wishlistBook];
    writeUsers(users);
    return res.status(200).json({ message: `Successfully added to wishlist: ${wishlistBook.title}`, user })
})

// remove a book from wishlist endpoint (DELETE method)
app.delete('/remove-from-wishlist/:username/:bookId', (req, res) => {
    const username = req.params.username;
    const bookId = req.params.bookId;

    const users = readUsers();
    const user = users.find((user) => user.username === username);
    if (!user) {
        return res.status(404).json({ error: 'User not found.' });
    }

    const removeBook = user.wishlist.find((book) => book.id === bookId);
    if (!removeBook) {
        return res.status(404).json({ error: 'Book title not found.' });
    }

    // remove the book from the wishlist
    const bookIndex = user.wishlist.findIndex((book) => book.id === bookId);
    const [removeWishlistBook] = user.wishlist.splice(bookIndex, 1);

    writeUsers(users);  // update the users.json file.
    return res.status(200).json({ message: `Successfully removed: ${removeWishlistBook.title}`, user });
})

// adds notes to book inside the wishlist of this user.
app.post('/wishlist/post-notes', (req, res) => {
    const {username, bookId, notes} = req.body;

    const users = readUsers();
    const user = users.find((user) => user.username === username);
    if (!user) {
        return res.status(404).json({ error: 'User not found.' });
    }

    const addNotesToBook = user.wishlist.find((book) => book.id === bookId);
    if (!addNotesToBook) {
        return res.status(404).json({ error: 'Book title not found.' });
    }

    const bookIndex = user.wishlist.findIndex((book) => book.id === bookId);
    user.wishlist[bookIndex] = { ...user.wishlist[bookIndex], notes: notes };
    writeUsers(users);
    return res.status(200).json({ message: `Successfully added notes to: ${addNotesToBook.title}`, user});
})

// get all the notes, for every book, for currently logged in user. (mainly for debugging)
app.get('/wishlist/all-notes/:username', (req, res) => {
    const username = req.params.username;
    const users = readUsers();
    const user = users.find((user) => user.username === username);
    if (!user) {
        return res.status(404).json({ error: 'User not found.' });
    }

    if (!user.wishlist) {
        return res.status(404).json({ error: 'Wish list not found.' });
    }

    const allNotes = user.wishlist
        .filter((book) => book.notes) // Only include books with notes
        .map((book) => book.notes);  // Extract notes

    // get the books inside this user's wishlist.
    return res.status(200).json({ notes: allNotes });
})
// WISHLIST FEATURE END

// ACCOUNT FEATURE START
// update the user's info
app.post('/account-update', (req, res) => {
    const { username, heading, updatedInfo } = req.body;    // heading is the property, updateInfo is the new content.

    const users = readUsers();
    const user = users.find((user) => user.username === username);
    if (!user) {
        return res.status(404).json({ error: 'User not found.' });
    }
    if (!heading) {
        return res.status(404).json({ error: `${heading} is required` });
    }

    user[heading] = updatedInfo;

    writeUsers(users);
    return res.status(200).json({ message: `Successfully updated info: ${heading}`, user});
})

// get the user's info if any (email)
app.get('/account/:username', (req, res) => {
    const username = req.params.username;
    const users = readUsers();
    const user = users.find((user) => user.username === username);
    if (!user) {
        return res.status(404).json({ error: 'User not found.' });
    }

    // Return updated info and placeholders
    return res.status(200).json({
        message: `Successfully updated info`,
        email: user['Email'] || 'no email'
    });
})
// ACCOUNT FEATURE END

// ADMIN ACCOUNT START
app.get('/:username/admin-all', (req, res) => {
    const username = req.params.username;
    const users = readUsers();
    const user = users.find((user) => user.username === username);
    if (!user) {
        return res.status(404).json({ error: 'User not found.' });
    }
    if (user.role !== 'admin') {
        return res.status(404).json({ error: 'No admin permissions.' });
    }

    const allNonAdminUsers = users
        .filter((user) => user.role === 'user') // Only include users who are non-admin
        .map((user) => ({
            username: user.username,
            borrowed_books: user.borrowed_books || []
        }));

    return res.status(200).json({ users: allNonAdminUsers, message: 'Successfully fetched all non-admin users.'})
})
// ADMIN ACCOUNT END

// CREATE ACCOUNT START
app.get('/all-existing-usernames', (req, res) => {
    const users = readUsers();

    const allExistingUsernames = users.map((user) => user.username);
    return res.status(200).json({ usernames: allExistingUsernames, message: 'Successfully fetched all existing usernames.'})
})

app.post('/create-account/new-user', (req, res) => {
    const {username, password, role} = req.body;

    if (!username) {
        return res.status(400).json({ error: 'Username is required.' });
    }
    if (!password) {
        return res.status(400).json({ error: 'Password is required.' });
    }
    if (role !== 'user') {
        return res.status(400).json({ error: 'Admin permissions not granted.' });
    }

    const users = readUsers();
    const existingUser = users.find((user) => user.username === username);
    if (existingUser) {
        return res.status(400).json({ error: 'Username already exists.' });
    }

    const newUser = {
        'username': username,
        'password': password,
        'role': role
    }
    users.push(newUser);
    writeUsers(users);

    return res.status(200).json({ message: 'Successfully created user account.'})
})

// CREATE ACCOUNT END

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
