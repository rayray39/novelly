import { useEffect, useState } from "react";

function CreateAccount() {
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
                console.log(data.message);
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

    const handleClick = (e) => {
        e.preventDefault();
        console.log('submitting form');

        if (allExistingUsernames.includes(username)) {
            // username already taken
            setUsernameAlreadyTaken(true);
        } else {
            setUsernameAlreadyTaken(false);
        }
        if (anyEmptyFields()) {
            alert('Please fill up all the fields!');
            return;
        }
        if (password !== confirmPassword) {
            setPasswordsDoNotMatch(true);
        } else {
            setPasswordsDoNotMatch(false);
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