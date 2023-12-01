import AuthLayout from "@/Layouts/Custom/AuthLayout";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import { Head } from "@inertiajs/react";

const Password = ({ auth }) => {
    return (
        <AuthLayout user={auth.user}>
            <Head title="Change password" />
            <div className="min-h-[70vh] flex justify-center">
                <div className="w-full md:w-[80%] lg:w-[60%] xl:w-[55%] 2xl:w-[50%]">
                    <UpdatePasswordForm className="max-w-xl" />
                </div>
            </div>
        </AuthLayout>
    )
}

export default Password
