import { useState } from 'react';
import { login, signup } from '../../../firebase';
import { toast } from 'react-toastify';
import logo from '../../assets/logo.png';
import loadingSpinner from '../../assets/netflix_spinner.gif';
import './Login.css';

function Login() {

    const [signState, setSignState] = useState('Sign In');
    const [isLoading, setLoading] = useState(false);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function formChange() {
        if (signState === 'Sign In') {
            setSignState('Sign Up');
        } else {
            setSignState('Sign In');
        }
    }

    function addName(e) {
        setName(e.target.value);
    }

    function addEmail(e) {
        setEmail(e.target.value);
    }

    function addPassword(e) {
        setPassword(e.target.value);
    }

    async function checkAuth(e) {
        setLoading(true);
        e.preventDefault();
        if (!email.trim() || !password.trim()) {
            toast.error('fields are required!');
            return (setLoading(false));
        };

        if (signState === 'Sign Up') {
            if (password.length <= 8) {
                toast.error('password must be 8 characters or more');
                return (setLoading(false));
            }

            if (!name.trim('')) {
                toast.error('name is required!');
                return (setLoading(false));
            }

            await signup(name, email, password);
        } else {
            await login(email, password);
        }

        setLoading(false);
    }

    return (
        isLoading ? 
        <div className='loading-spinner'>
            <img src={loadingSpinner} alt="" />
        </div>
        : <div className="login">
            <img src={logo} alt="" className='login-logo' />
            <div className="login-form">
                <h1>{signState}</h1>
                <form>
                    {signState === 'Sign Up' &&
                        <input
                            type="text"
                            placeholder='Your Name'
                            onChange={addName}
                        />}

                    <input
                        type="email"
                        placeholder='Email'
                        onChange={addEmail}
                    />

                    <input
                        type="password"
                        placeholder='Password'
                        onChange={addPassword}
                    />

                    <button type="submit" onClick={checkAuth}>{signState}</button>
                    <div className="form-help">
                        <div className="remember">
                            <input type="checkbox" name="" id="" />
                            <label htmlFor="">Remember Me</label>
                        </div>
                        <p>Need Help?</p>
                    </div>
                </form>
                <div className="form-switch">
                    {signState === 'Sign In' ? <p>New to Netflix? <span onClick={formChange}>Sign Up Now</span></p>
                        : <p>Already have an Account? <span onClick={formChange}>Sign In Now</span></p>}
                </div>
            </div>
        </div>
    )
}

export default Login;