import AuthLayout from "@/Layouts/Custom/AuthLayout";
import DeleteUserForm from "./Partials/DeleteUserForm";
import { Head } from "@inertiajs/react";

const Delete = ({ auth }) => {
    return (
        <AuthLayout user={auth.user}>
            <Head title="Delete account" />
            <div className="min-h-[70vh] flex justify-center">
                <div className="w-full md:w-[80%] lg:w-[60%] xl:w-[55%] 2xl:w-[50%]">
                    <DeleteUserForm className="max-w-xl" user={auth.user} />
                </div>
            </div>
        </AuthLayout>
    )
}

export default Delete
