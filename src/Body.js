import Form from "./Form";

function Body() {
    let bodyText = "NOVELLY";

    return <div id="main-body">
        <h1 className="main-title">{bodyText}</h1>
        <Form />
    </div>
}

export default Body;