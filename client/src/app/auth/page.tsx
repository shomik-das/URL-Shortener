import Signin from "@/components/auth/login";
import Signup from "@/components/auth/signup";
import { Account } from "@/components/ui/account";
const Page = () => {
    const defaultTab = 0;
    return (
        <>
        <div className="mb-6">
            <Account
            defaultTab={defaultTab}
            firstTab={<Signin/>}
            secondTab={<Signup />}
            />
        </div>
        </>
    )
}

export default Page;
