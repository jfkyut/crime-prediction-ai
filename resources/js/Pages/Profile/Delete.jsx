import AuthLayout from "@/Layouts/Custom/AuthLayout";
import DeleteUserForm from "./Partials/DeleteUserForm";
import { Head } from "@inertiajs/react";

const Delete = ({ auth }) => {
    return (
        <AuthLayout user={auth.user}>
            <Head title="Delete account" />
            <div className="min-h-[70vh] flex items-center justify-center">
                <DeleteUserForm className="max-w-xl" />
            </div>
        </AuthLayout>
    )
}

export default Delete
