function Input(props) {
    let inputType = "text";

    if (props.placeholder === "password") {
        inputType = "password";
    }

    var inputId = "input-" + props.placeholder;

    return <div>
        <input type={inputType} className={props.className} id={inputId} value={props.value} onChange={props.onChange}/>
    </div>
}

export default Input;