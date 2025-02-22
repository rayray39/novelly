import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "./UserContext";

function CreateAccount() {
    const navigate = useNavigate();
    const {currentUser, setCurrentUser} = useUser();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');

    const [allExistingUsernames, setAllExistingUsernames] = useState([])
    const [usernameAlreadyTaken, setUsernameAlreadyTaken] = useState(false);
    const [passwordsDoNotMatch, setPasswordsDoNotMatch] = useState(false);

    useEffect(() => {
        // make a GET method call to fetch all existing usernames.
        const fetchAllUsernames = async () => {
            try {
                const response = await fetch('http://localhost:5000/all-existing-usernames', {
                    method: 'GET'
                })

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                setAllExistingUsernames(data.usernames);

            } catch (error) {
                console.error();
            }
        } 

        fetchAllUsernames();
    }, [])

    const anyEmptyFields = () => {
        return username === '' ||
            password === '' ||
            confirmPassword === '' ||
            email === '';
    }

    const handleClick = async (e) => {
        e.preventDefault();
        console.log('submitting form');

        if (allExistingUsernames.includes(username)) {
            // username already taken
            setUsernameAlreadyTaken(true);
            return;
        } else {
            setUsernameAlreadyTaken(false);
        }
        if (anyEmptyFields()) {
            alert('Please fill up all the fields!');
            return;
        }
        if (password !== confirmPassword) {
            setPasswordsDoNotMatch(true);
            return;
        } else {
            setPasswordsDoNotMatch(false);
        }

        // make a POST request to pass info, to create new user.
        try {
            const response = await fetch('http://localhost:5000/create-account/new-user', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: username, password: password, role: 'user', email: email }),
            })
    
            const data = await response.json();
            if (!response.ok) {
                const message = data.error;
                console.log(message);
                return;
            }
    
            console.log(data.message);
            setCurrentUser(data.newUser);
            navigate('/catalogue');
        } catch (error) {
            console.error(`Error in creating user account: ${error}`)
        }
    }

    const getUsername = (event) => {
        setUsername(event.target.value);
    }

    const getPassword = (event) => {
        setPassword(event.target.value);
    }

    const getConfirmPassword = (event) => {
        setConfirmPassword(event.target.value);
    }

    const getEmail = (event) => {
        setEmail(event.target.value);
    }

    return <div id="create-account-page">
        <form action="" onSubmit={handleClick}>
            <fieldset>
                <label htmlFor="">Username</label>
                <input type="text" name="username" placeholder="Username" aria-describedby="username-helper" aria-invalid={usernameAlreadyTaken ? true : null} value={username} onChange={getUsername} autoFocus/>
                {usernameAlreadyTaken ? <small id="username-helper">username is already taken!</small> : null}

                <label htmlFor="">Password</label>
                <input type="password" name="password" placeholder="Password" value={password} onChange={getPassword}/>

                <label htmlFor="">Confirm Password</label>
                <input type="password" name="confirmPassword" aria-describedby="password-helper" placeholder="Confirm Password" aria-invalid={passwordsDoNotMatch ? true : null} value={confirmPassword} onChange={getConfirmPassword} />
                {passwordsDoNotMatch ? <small id="password-helper">your passwords do not match!</small> : null}

                <label htmlFor="">Email</label>
                <input type="text" name="email" placeholder="Email" value={email} onChange={getEmail} />
            </fieldset>

            <input
                type="submit"
                value="Create Account"
                className="pico-background-violet-650"
                style={{border:'none'}}
            />
        </form>
    </div>
}

export default CreateAccount