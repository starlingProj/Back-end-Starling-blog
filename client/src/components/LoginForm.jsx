import React, { useContext, useState } from "react";
import { Context } from "../main";
import {observer} from 'mobx-react-lite'

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { store } = useContext(Context);
    return (
        <div>
            <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="text"
                placeholder="Email"
            />
            <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                placeholder="Password"
            />
            <button onClick={() => {
                console.log(store)
                store.registration(email, password)}}>
                Registration
            </button>
            <button onClick={() => store.login(email, password)}>Login</button>
        </div>
    );
};

export default observer(LoginForm);
