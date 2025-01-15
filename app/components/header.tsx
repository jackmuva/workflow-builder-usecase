"use client";
import React from "react";
import { signOut } from "next-auth/react";
import Image from "next/image";

interface ChildProps {
    toggleDown: boolean,
    toggle: () => void,
    email: string
}
const Header: React.FC<ChildProps> = (props) => {

    return (
        <div className={props.email ? "bg-stone-100 absolute top-0 left-0 w-screen z-20 py-2 md:px-40 items-center justify-between font-['Helvetica'] text-sm flex flex-row-reverse" :
            "absolute top-0 left-0 w-screen z-20 py-8 md:px-40 items-center justify-between font-['Helvetica'] text-sm flex flex-row-reverse"}>
            {!props.email &&
                <a
                    href="https://www.useparagon.com/"
                    target="_blank"
                    className="flex items-center justify-center font-nunito text-lg font-bold gap-2"
                >
                    <Image
                        className="rounded-xl"
                        src="/paragon-logo.png"
                        alt="Paragon Logo"
                        width={40}
                        height={40}
                        priority
                    />
                    <span>Built with Paragon</span>
                </a>
            }

            {!props.email &&
                <button onClick={props.toggle}
                    className={"flex justify-center " +
                        "dark:border-neutral-800 " +
                        "dark:bg-zinc-800/30 dark:from-inherit md:static w-1/4  rounded-xl " +
                        "bg-gray-200 p-4 dark:bg-zinc-800/30 " +
                        "border-4 border-green-300 font-bold text-base"}>
                    <div className={props.toggleDown ? "text-amber-800" : ""}>
                        {props.toggleDown ? "Close Login Panel" : "Login to Demo"}
                    </div>
                </button>}
            {props.email &&
                <div className={"flex flex-col space-y-1"}>
                    <div className={"font-semibold"}> Welcome {props.email.split("@")[0]}</div>
                    <button className={"border-2 border-gray-300 rounded-xl p-1 items-center justify-center " +
                        "font-semibold text-stone-600 hover:text-stone-900 hover:bg-gray-400 bg-gray-200"}
                        onClick={() => signOut()}>
                        Sign Out
                    </button>
                </div>}
        </div>
    );
}
export default Header;


