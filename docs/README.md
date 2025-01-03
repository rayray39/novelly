# NOVELLY User Guide
NOVELLY is a website for managing your library resources, such as borrowing and returning books, browsing through one of the largest catalogues (Google Books API), and keep track of your account information. It is super easy to use and most importantly, it is FREE!

![Novelly main page](./main%20page.png)

## Quick Start
[This section will be implemented soon!]

## Overview of Features
1. create a new account.
2. browsing the catalogue.
3. borrowing a book / returning a book.
4. adding a book to wishlist / removing a book from wishlist.
5. add notes to a wishlist book.
6. update account details.
7. logging out.

## Create New Account
Creates a new account for you.  
- On the main page, click on the `create account` button to be taken to the create account form.  
- Upon successful creation of an account, you will be logged into your account.

<![Novelly create account form](./create_acc_form.png)

## Browsing the Catalogue
Browse through the catalogue of books (available through the Google Books API).  
- In the search bar, type in the title of the book you wish to search for.  
- Note that the search results will also include books that contain the keywords entered into the search bar.  
- For example, searching for `Batman` will return all titles that have `Batman` in the title (`Batman: The Dark Knight` and `A Killing Joke, Batman` are valid results that could be returned).  
- For each book, click the `See Description` tab to view the description of the book.
- The catalogue pages are also paginated, i.e., you can navigate to the `Previous` and `Next` pages if any.

## Borrowing a Book
Borrow a book and add the book into the `BORROWED BOOKS` page.  
- For each book returned in the catalogue, click on the `Borrow` button to borrow the book. You will be alerted to a success message to inform you that you have successfully borrowed the book.  
- Clicking on the `Borrow` button for a book that has already been borrowed, will trigger an alert to indicate that the book has already been borrowed.
- All borrowed books will appear in the `BORROWED BOOKS` page. Navigate to this page by clicking on `borrow` in the navigation bar.  
- Each borrowed book automatically comes with a due date attached to it, the standard borrow duration is 3 weeks (21 days not including the date of borrowing).
- The book can be returned by clicking on the `Return` button. You will be alerted to a success message to inform you that you have successfully returned the book.
- A book that has been returned will be removed from the `BORROWED BOOKS` page.

![Novelly borrowed books page](./borrowed_books.png)

## Adding a Book to Wishlist
Add a book to the wishlist.  
- For each book returned in the catalogue, click on the `Add to Wishlist` button to add the book to your wishlist. You will be alerted to a success message to inform you that you have successfully added the book to your wishlist.  
- Clicking on the `Add to Wishlist` button for a book that has already been added, will trigger an alert to indicate that the book has already been added to your wishlist.  
- All books added to the wishlist will appear in the `WISHLIST` page. Navigate to this page by clicking on `wishlist` in the navigation bar. 
- If a book has already been borrowed, that book cannot be added to the wishlist.
- You may borrow a book that was added to the wishlist, from the `WISHLIST` page, by clicking on the `borrow` button. But, doing so will remove the book from the wishlist.  
- A book can be removed from the wishlist by clicking on the `Remove` button. You will be alerted to a success message to inform you that you have successfully removed the book.  
- A book that has been removed from the wishlist will be removed from the `WISHLIST` page.

![Novelly wishlist page](./wishlist.png)

## Add Notes to a Wishlist Book
Add a note to a book inside your wishlist.
- Use this feature to add a note (eg. 'recommended by Joe', 'borrow in a week's time') to a book inside your wishlist.
- Inside your wishlist, click on the `Add Notes` button to open a text area where you can enter your notes.  
- Click on the `Post` button to update the notes for that book. 
- If a book already has an existing note, clicking on the `Add Notes` button followed by clicking on the `Close Notes` will remove that existing note.
- To successfully save your note for that book, always remember to click on `Post`.

## Update Account Details
View your existing account details or update them.
- View your existing account details by clicking on `account` in the navigation bar.
- Your username is fixed and cannot be changed (i.e., it is read-only).
- Update your email by entering a new email into the email field. Click on the `save` button to save your changes.

![Novelly account page](./account.png)  

## Logging Out
Log out of your account.
- To log out of your account, you need to be in the `account` page. Navigate to the `account` page by clicking on `account` in the navigation bar.
- Click on the `Log Out` button to be taken back to the main page of NOVELLY.

![Novelly account page with logout](./logout.png)  

## Additional Notes
NOVELLY was started as a side project to learn more about using React and Express to build dynamic and interactive webpages. It is by no means a commercial product and should not be used for any commercial purposes (if you do make money however, rmb to buy me a cup of coffee!). 