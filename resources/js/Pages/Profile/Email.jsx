import AuthLayout from "@/Layouts/Custom/AuthLayout"
import { Head } from "@inertiajs/react"
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

const Email = ({ auth, mustVerifyEmail, status }) => {
    return (
        <AuthLayout user={auth.user}>
            <Head title="Change password" />
            <div className="min-h-[70vh] flex justify-center">
                <UpdateProfileInformationForm
                    mustVerifyEmail={mustVerifyEmail}
                    status={status}
                    className="max-w-xl"
                />
            </div>
        </AuthLayout>
    )
}

export default Email
