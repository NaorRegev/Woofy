import { Helmet } from 'react-helmet-async';
import SignInComponent from "../Sections/LoginAndRegister/LoginView";



// ----------------------------------------------------------------------

export default function LoginPage() {
    return (
        <>
            <Helmet>
                <title> Login | Woofy </title>
            </Helmet>

            <SignInComponent />
        </>
    );
}
