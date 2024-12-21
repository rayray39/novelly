import Form from "./Form";
import { Route, Link, Routes, useNavigate } from 'react-router-dom';
import Library from "./Library";

function Body() {
    let bodyText = "I'm NOVELLY";

    return <div id="main-body">
        <h1 className="main-title">{bodyText}</h1>
        <Form />
    </div>
}

export default Body;