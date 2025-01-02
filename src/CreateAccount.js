import { useState } from "react";

function CreateAccount() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');

    const handleClick = (e) => {
        e.preventDefault();
        console.log('submitting form');
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
                <input type="text" name="username" placeholder="Username" value={username} onChange={getUsername} autoFocus/>

                <label htmlFor="">Password</label>
                <input type="password" name="password" aria-describedby="invalid-helper" placeholder="Password" value={password} onChange={getPassword}/>

                <label htmlFor="">Confirm Password</label>
                <input type="text" name="confirmPassword" placeholder="Confirm Password" value={confirmPassword} onChange={getConfirmPassword} />

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