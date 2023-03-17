import { Link } from "react-router-dom";
import axiosClient from "../axiosClient";
import { useRef, useState } from "react";
import { useSateContext } from "../context/Context";

export default function Login() {
  const { setUser, setToken } = useSateContext();
    const emailRef = useRef();
    const passwordRef = useRef();
    const [errors, setErrors] = useState(false);

    const onSubmit = (e) => {
        e.preventDefault();
        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };

        axiosClient.post("/login", payload).then(({ data }) => {
            console.log(data);
            setToken(data.token);
            setUser(data.user);
        }).catch((err) => {
            const response = err.response;
            if (err && err.response.status === 422) {
                setErrors(err.response.data.message);
                console.log(err.response.data.message);
            }
        });
    };

    return (
        <div className="formContainer">
            <div className="form">
                <form onSubmit={onSubmit}>
                    <h1>Login</h1>
                    {errors && (
                        <div className="error">
                            <p>{errors}</p>
                        </div>
                    )}
                    <input ref={emailRef} type="email" placeholder="Email Address" />
                    <input ref={passwordRef} type="password" placeholder="Password" />
                    <button>Submit</button>
                    <p id="formP">
                        Not registered? &nbsp;
                        <Link to="/signup" className="link">
                            Register
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
}
