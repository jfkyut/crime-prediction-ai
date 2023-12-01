import AuthLayout from "@/Layouts/Custom/AuthLayout"
import { Head } from "@inertiajs/react"
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

const Email = ({ auth, mustVerifyEmail, status }) => {
    return (
        <AuthLayout user={auth.user}>
            <Head title="Change password" />
            <div className="min-h-[70vh] flex justify-center">
                <div className="w-full md:w-[80%] lg:w-[60%] xl:w-[55%] 2xl:w-[50%]">
                    <UpdateProfileInformationForm
                        mustVerifyEmail={mustVerifyEmail}
                        status={status}
                        className="w-full"
                    />
                </div>
            </div>
        </AuthLayout>
    )
}

export default Email
