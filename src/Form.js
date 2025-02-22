import { useState } from "react";
import { useNavigate } from "react-router-dom";
import users from './data/users.json';
import { useUser } from "./UserContext";

// main page when users log in. (after logged in, will be routed to catalogue)

function Form() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordIncorrect, setPasswordIncorrect] = useState(false);
    const navigate = useNavigate();
    const {currentUser, setCurrentUser} = useUser();

    const clearInputFields = () => {
        console.log(`username: ${username}`);
        console.log(`password: ${password}`);
        setUsername('');
        setPassword('');
    }

    const isEmptyFields = () => {
        return username.length === 0 || password.length === 0;
    }

    const handleClick = (e) => {
        e.preventDefault();
        // guard clauses for username and password validation.
        if (isEmptyFields()) {
            alert('Please fill in all the fields!');
            return;
        }

        const loggedInUser = users.find((user) =>
            user.username === username && user.password === password
        );
        if (loggedInUser) {
            if (loggedInUser.role === 'user') {
                // logged in as user
                navigate('/catalogue');
            }
            if (loggedInUser.role === 'admin') {
                // logged in as admin
                navigate('/admin-page');
            }
        } else {
            setPasswordIncorrect(true);
            return;
        }

        setCurrentUser(loggedInUser);
        clearInputFields();
    }

    const getUsername = (event) => {
        setUsername(event.target.value);
    }

    const getPassword = (event) => {
        setPassword(event.target.value);
    }

    const handleCreateAccount = () => {
        console.log('create account button pressed');
        navigate('/create-account');
    }

    return <div>
        <form action="" onSubmit={handleClick}>
            <fieldset>
                <label htmlFor="">Username</label>
                <input type="text" name="username" placeholder="Username" value={username} onChange={getUsername} autoFocus/>

                <label htmlFor="">Password</label>
                <input type="password" name="password" aria-describedby="invalid-helper" aria-invalid={passwordIncorrect ? true : null} placeholder="Password" value={password} onChange={getPassword}/>
                {passwordIncorrect ? <small id="invalid-helper">Your password is incorrect!</small> : null}
            </fieldset>
            <input
                type="submit"
                value="Sign In"
                className="pico-background-violet-650"
                style={{border:'none'}}
            />
        </form>

        <input type="button" style={{border:'none'}} className="pico-background-violet-650" value='create account' onClick={handleCreateAccount} />
    </div>
}

export default Form;