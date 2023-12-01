import AuthLayout from "@/Layouts/Custom/AuthLayout";
import DeleteUserForm from "./Partials/DeleteUserForm";
import { Head } from "@inertiajs/react";

const Delete = ({ auth }) => {
    return (
        <AuthLayout user={auth.user}>
            <Head title="Delete account" />
            <div className="min-h-[70vh] flex justify-center">
                <DeleteUserForm className="max-w-xl" user={auth.user} />
            </div>
        </AuthLayout>
    )
}

export default Delete
