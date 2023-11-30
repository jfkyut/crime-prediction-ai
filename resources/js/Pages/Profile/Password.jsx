import AuthLayout from "@/Layouts/Custom/AuthLayout";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import { Head } from "@inertiajs/react";

const Password = ({ auth }) => {
    return (
        <AuthLayout user={auth.user}>
            <Head title="Change password" />
            <div className="min-h-[70vh] flex items-center justify-center">
                <UpdatePasswordForm className="max-w-xl" />
            </div>
        </AuthLayout>
    )
}

export default Password
