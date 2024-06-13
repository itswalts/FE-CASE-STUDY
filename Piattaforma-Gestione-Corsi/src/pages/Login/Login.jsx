import { LoginForm } from "../../components/LoginForm/LoginForm";
import styleLogin from "./Login.module.css";

export function Login() {
    return (
        <>
        <div className={`${styleLogin.pageContainer}`}>
            <h1>Guarda chi si rivede!</h1>
            <LoginForm />
        </div>
        </>
    )
}