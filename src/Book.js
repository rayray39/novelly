// display all the fetch and processed books as an unordered list.

function Book(props) {
    const listItems = props.books.map(book => <div className="books-card-display">
        <p><img src={book.image} alt="image of book" /></p>
        <p>{book.title}</p>
        <p>{`Authors: ${book.authors}`}</p>
        <p>{`Published Date: ${book.publishedDate}`}</p>
        <details>
            <summary>See description</summary>
            <p>{book.description}</p>
        </details>

        <div style={{display:'flex', marginTop:'5px'}}>
            <button id="borrow-button" style={{marginTop:"10px", fontFamily: "Georgia, 'Times New Roman', Times, serif"}}>Borrow</button>
            <button id="wishlist-button" style={{marginTop:"10px", fontFamily: "Georgia, 'Times New Roman', Times, serif"}}>Add to Wishlist</button>
        </div>
    </div>)

    return <div className="books-page">
        <ul>{listItems}</ul>
    </div>
}

export default Book