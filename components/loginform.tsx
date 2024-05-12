/* eslint-disable react/no-unescaped-entities */
import Link from "next/link";

export default function LoginForm() {
    return (
        <div className="grid place-items-center h-screen">
            <div className="shadow-lg p-5 rounded-lg border-t-4 border-main-color">
                <h1 className="text-xl font-bold my-4">Login</h1>

                <form className="flex flex-col gap-3">
                    <input className="w-96 border border-gray-200 py-2 px-6" type="text" placeholder="Email" />
                    <input className="w-96 border border-gray-200 py-2 px-6" type="password" placeholder="Password" />
                    <button className="bg-main-color text-bg-color font-bold cursor-pointer px-6 py-6">Login</button>

                    <div className="bg-red-500 text-bg-color text-sm py-1 px-3 rounded-md mt-2">Error message</div>
                    <Link className="text-sm mt-3 text-right" href={'/register'}>Don't have an account?
                    <span className="underline">Register</span>
                    </Link>
                </form>
            </div>
        </div>
    );
}