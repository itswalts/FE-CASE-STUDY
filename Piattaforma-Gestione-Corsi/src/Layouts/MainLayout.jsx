import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useOutlet } from "react-router-dom";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { Navbar } from "../components/Navbar/Navbar";
import { getUser } from "../services/firebase-services";
import { login } from "../state/user/authSlice";

export function MainLayout() {
    const outlet = useOutlet();
    const dispatch = useDispatch();

    useEffect(() => {
        async function fetchUser() {
            const token = Cookies.get('token');
            if (token) {
                const decodedToken = jwtDecode(token);
                const email = decodedToken.email;
                console.log(email);
                const user = await getUser(email);
                if (user) {
                    dispatch(login({
                        user: {
                            nome: user.name,
                            cognome: user.lastName,
                            email: user.email,
                        },
                        role: user.role,
                    }));
                }
            }
        }
        fetchUser();
    }, [dispatch]);

    return (
        <>
            <Navbar />
            {outlet}
        </>
    );
}