import { useNavigate } from "react-router-dom";
import { useSateContext } from "../context/Context";
import { useRef, useState } from "react";
import axiosClient from "../axiosClient";

export default function AddNewForm() {
    const { setUser, setToken } = useSateContext();
    const [errors, setErrors] = useState(false);
    const navigate = useNavigate();

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
            .post("/users", payload)
            .then(({ data }) => {
                console.log('data', data);
                navigate("/");
            })
            .catch((err) => {
                console.log('erros',err.response.data.message);
                setErrors(err.response.data.message);
            });
    };

    return (
        <div>
            <div className="forms">
                <form onSubmit={onSubmit}>
                    <h2>Add New User</h2>&nbsp;
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
                </form>
            </div>
        </div>
    );
}
