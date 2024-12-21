import { useState } from "react";

function Form() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordTooShort, setPasswordTooShort] = useState(false);

    const clearInputFields = () => {
        console.log(`username: ${username}`);
        console.log(`password: ${password}`);
        setUsername('');
        setPassword('');
    }

    const isEmptyFields = () => {
        return username.length === 0 || password.length === 0;
    }

    const isPasswordTooShort = () => {
        return password.length > 0 && password.length <= 6;
    }

    const PasswordError = () => {
        const errorStyle = {fontSize: "12px", textAlign: "center", color: 'red'};
        return <p style={errorStyle}>Your password should contain more than 6 characters!</p>
    }

    const handleClick = (e) => {
        e.preventDefault();
        if (isEmptyFields()) {
            alert('Please fill in all the fields!');
            return;
        }
        if (isPasswordTooShort()) {
            setPasswordTooShort(true);
            return;
        } else {
            setPasswordTooShort(false);
        }
        clearInputFields();
    }

    const getUsername = (event) => {
        setUsername(event.target.value);
    }

    const getPassword = (event) => {
        setPassword(event.target.value);
    }

    return <div>
        <form className="form" onSubmit={handleClick}>
            <div className="form-group">
                <label htmlFor="input-username" className="form-label">Username</label>
                <input type="text" className="form-control" id="input-username" value={username} onChange={getUsername}/>
            </div>
            <div className="form-group">
                <label htmlFor="" className="form-label">Password</label>
                <input type="password" className="form-control" id="input-password" value={password} onChange={getPassword}/>
                {passwordTooShort ? <PasswordError /> : null}
            </div>
            <button id='sign-in-button' className="btn btn-success btn-block">Sign In</button>
        </form>
    </div>
}

export default Form;