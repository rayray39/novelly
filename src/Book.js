function Book(props) {
    const listItems = props.books.map(book => <ul key={book.id} style={{border: "1px solid black"}}>
        <li key={'title'}>{book.title}</li>
        <li key={'authors'}>{book.authors}</li>
        <li key={'publishedDate'}>{book.publishedDate}</li>
        <li key={'description'}>{book.description}</li>
    </ul>)

    return <div className="books-display">
        <ul>{listItems}</ul>
    </div>
}

export default Book