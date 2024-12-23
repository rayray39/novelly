function Book(props) {
    const listItems = props.books.map(book => <ul key={book.id} className="books-card-display">
        <li><img src={book.image} alt="image of book" /></li>
        <li key={'title'} style={{fontSize:'20px', fontWeight:'bold'}}>{book.title}</li>
        <li key={'authors'}>{`Authors: ${book.authors}`}</li>
        <li key={'publishedDate'}>{`Published Date: ${book.publishedDate}`}</li>
        {/* <li key={'description'}>{`Description: ${book.description}`}</li> */}
        <details>
            <summary>See description</summary>
            <p>{book.description}</p>
        </details>

        <button className="btn btn-dark" style={{marginTop:"10px", fontFamily: "Georgia, 'Times New Roman', Times, serif"}}>Borrow</button>
    </ul>)

    return <div className="books-page">
        <ul>{listItems}</ul>
    </div>
}

export default Book