// display all the fetch and processed books as an unordered list.

function Book(props) {
    const handleBorrow = (bookId) => {
        console.log(`this book has been borrowed: ${bookId}`);
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
            <button id="borrow-button" onClick={() => handleBorrow(book.id)} style={{marginTop:"10px", fontFamily: "Georgia, 'Times New Roman', Times, serif"}}>Borrow</button>
            <button id="wishlist-button" style={{marginTop:"10px", fontFamily: "Georgia, 'Times New Roman', Times, serif"}}>Add to Wishlist</button>
        </div>
    </div>)

    return <div className="books-page">
        <ul>{listItems}</ul>
    </div>
}

export default Book