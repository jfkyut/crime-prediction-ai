import AuthLayout from "@/Layouts/Custom/AuthLayout";
import { Head } from "@inertiajs/react";

const Show = ({ auth }) => {
    return (
        <AuthLayout user={auth.user}>
            <Head title={"Knowledge"} />
            Show
        </AuthLayout>
    )
}

export default Show
