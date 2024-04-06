import { useContext, useEffect, useState } from "react";
import LoginForm from "./components/LoginForm";
import { Context } from "./main";
import { observer } from "mobx-react-lite";
import UserService from "./services/UserService";

const App = () => {
    const { store } = useContext(Context);
    const [users, setUsers] = useState([]);
    useEffect(() => {
        if (localStorage.getItem("token")) {
            store.checkAuth();
        }
    }, []);

    async function getUsers() {
        try {
            const response = await UserService.fetchUsers();
            console.log(response.data);
            setUsers(response.data);
            console.log(users);
        } catch (error) {
            console.log(error);
        }
    }

    if (store.isLoading) {
        return <div>Завантаження</div>;
    }
    if (!store.isAuth) {
        return (
            <>
                <LoginForm />
                <div>
                    <button onClick={getUsers}>
                        Отримати всіх користувачів
                    </button>
                </div>

                {users.map((user) => (
                    <div key={user.email}>{user.email}</div>
                ))}
            </>
        );
    }
    return (
        <div>
            <h1>
                {store.isAuth
                    ? `Користувач авторизований ${store.user.email}`
                    : "Авторизуйтсь!"}
            </h1>
            <h1>
                {store.user.isActivated
                    ? "Акаунт підтверджений"
                    : "Підтвердіть акаунт"}
            </h1>
            <button onClick={() => store.logout()}>Вийти</button>
            <div>
                <button onClick={getUsers}>Отримати всіх користувачів</button>
            </div>

            {users.map((user) => (
                <div key={user.email}>{user.email}</div>
            ))}
        </div>
    );
};

export default observer(App);
