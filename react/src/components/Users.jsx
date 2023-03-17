import { useEffect, useState } from "react";
import axiosClient from "../axiosClient";
import { Link } from "react-router-dom";

export default function Users() {
    const [users, setUsers] = useState([]);
    const [erros, setErros] = useState(false);

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = () => {
        setErros(true);
        axiosClient.get("/users").then(({ data }) => {
            console.log("data", data);
            setUsers(data.data);
            setErros(false);
        });
    };

    const onDelete = (user) => {
        axiosClient.delete(`/users/${user.id}`).then(({ data }) => {
            console.log("data", data);
            getUsers();
        });
    };

    return (
        <div>
            <div className="usersHeader">
                <h1>Users</h1>
                <button className="edits"><Link to='/users/new' id="edit">Add New</Link></button>
            </div>
            &nbsp;
            <div>
                <table>
                    <thead>
                        {erros && (
                            <tr>
                                <td colSpan="5">Loading...</td>
                            </tr>
                        )}
                        {!erros && (
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Created at</th>
                                <th className="th-btn">Action</th>
                            </tr>
                        )}
                    </thead>
                    <tbody>
                        {users.map((u) => (
                            <tr key={u.id}>
                                <td>{u.id}</td>
                                <td>{u.name}</td>
                                <td>{u.email}</td>
                                <td>{u.created_at}</td>
                                <td className="td-btn">
                                    <button className="edit">
                                        <Link to={`/users/${u.id}`} id="edit">
                                            Edit
                                        </Link>
                                    </button>
                                    <button
                                        className="delete"
                                        onClick={(ev) => onDelete(u)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
