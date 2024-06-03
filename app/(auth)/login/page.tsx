import React from 'react';
import AuthForm from "@/components/authentication/auth-form";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: "Authentication",
    description: "Authentication forms built using the components.",
}

function LoginPage() {
    return (
        <React.Fragment>
            <AuthForm isLoginPage />
        </React.Fragment>
    );
}

export default LoginPage;