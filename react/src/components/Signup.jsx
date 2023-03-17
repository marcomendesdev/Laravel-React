import { Link } from "react-router-dom";
import { useSateContext } from "../context/Context";
import { useRef, useState } from "react";
import axiosClient from "../axiosClient";

export default function Signup() {
    const { setUser, setToken } = useSateContext();
    const [errors, setErrors] = useState(null);

    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();

    const onSubmit = (e) => {
        e.preventDefault();
        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            confirm_password: confirmPasswordRef.current.value,
        };

        axiosClient
            .post("/signup", payload)
            .then(({ data }) => {
                console.log(data);
                setUser(data.user);
                setToken(data.token);
            })
            .catch((err) => {
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
                    <h1>Sign Up</h1>
                    {errors && (
                        <div className="error">
                            <p>{errors}</p>
                        </div>
                    )}
                    <input ref={nameRef} type="text" placeholder="Full Name" />
                    <input
                        ref={emailRef}
                        type="email"
                        placeholder="Email Address"
                    />
                    <input
                        ref={passwordRef}
                        type="password"
                        placeholder="Password"
                    />
                    <input
                        ref={confirmPasswordRef}
                        type="password"
                        placeholder="Confirm Password"
                    />
                    <button>Submit</button>
                    <p id="formP">
                        Already registered? &nbsp;
                        <Link to="/login" className="link">
                            Login
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
}
