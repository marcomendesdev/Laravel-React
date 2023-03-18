import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../axiosClient";

export default function UpdateForm() {
    let { id } = useParams();
    const navigate = useNavigate();
    const [error, setError] = useState(false);

    const [user, setUser] = useState({
        id: null,
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const [loading, setLoading] = useState(false);

    if (id) {
        useEffect(() => {
            setLoading(true);
            axiosClient
                .get(`/users/${id}`)
                .then((response) => {
                    setUser(response.data);
                    console.log("hello", response.data);
                    setLoading(false);
                })
                .catch((error) => {
                    console.log(error);
                });
        }, []);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        if (user.id) {
            axiosClient.put(`/users/${user.id}`, user).then((response) => {
                console.log(response);
                navigate("/users");
            }).catch((error) => {
                console.log('errr',error.response.data.message);
                if(error.response.data.message){
                    setError(error.response.data.message);
                }
            });
        }
    };

    return (
        <div>
            <div className="forms">
                <form onSubmit={onSubmit}>
                    {loading ? (
                        <>
                            <h3>Loading...</h3>
                            <br />
                            <br />
                        </>
                    ) : (
                        <h1 className="title">{user.name}</h1>
                    )}


                    
                    {error && <p className="error">{error}</p>}
                    &nbsp;
                    <input
                        onChange={(e) =>
                            setUser({ ...user, name: e.target.value })
                        }
                        value={user.name}
                        type="text"
                        placeholder="Full Name"
                    />
                    <input
                        onChange={(e) =>
                            setUser({ ...user, email: e.target.value })
                        }
                        value={user.email}
                        type="email"
                        placeholder="Email Address"
                    />
                    <input
                        onChange={(e) =>
                            setUser({ ...user, password: e.target.value })
                        }
                        type="password"
                        placeholder="Password"
                    />
                    <input
                        onChange={(e) =>
                            setUser({
                                ...user,
                                password_confirmation: e.target.value,
                            })
                        }
                        type="password"
                        placeholder="Confirm Password"
                    />
                    <button>Submit</button>
                </form>
            </div>
        </div>
    );
}
