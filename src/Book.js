function Book(props) {
    const listItems = props.books.map(book => <ul key={book.id} className="books-card-display">
        <li><img src={book.image} alt="image of book" /></li>
        <li key={'title'}>{book.title}</li>
        <li key={'authors'}>{book.authors}</li>
        <li key={'publishedDate'}>{book.publishedDate}</li>
        <li key={'description'}>{book.description}</li>
    </ul>)

    return <div className="books-page">
        <ul>{listItems}</ul>
    </div>
}

export default Book