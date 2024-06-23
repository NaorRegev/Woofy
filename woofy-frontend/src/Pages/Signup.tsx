import { Helmet } from 'react-helmet-async';
import SignUpModal from "../Sections/LoginAndRegister/SignUpView";

export default function SignupPage() {
    return (
        <>
            <Helmet>
                <title> Signup </title>
            </Helmet>

            <SignUpModal />
        </>
    );
}