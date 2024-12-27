"use client";
import React from "react";
import {signOut} from "next-auth/react";
import Image from "next/image";

interface ChildProps {
    toggleDown: boolean,
    toggle: () => void,
    email: string
}
const Header: React.FC<ChildProps> = (props) => {

    return (
        <div className="z-10 max-w-5xl w-full items-center justify-between font-['Helvetica'] text-sm flex">
            <button onClick={props.toggle}
                    className={"flex justify-center " +
                        "dark:border-neutral-800 " +
                        "dark:bg-zinc-800/30 dark:from-inherit md:static w-1/4  rounded-xl " +
                        "bg-gray-200 p-4 dark:bg-zinc-800/30 " +
                        "border-4 border-green-300 font-bold text-base"}>
                <div className={props.toggleDown ? "text-amber-800" : ""}>
                    {props.toggleDown ? "Close Integrations Page" : "Configure Integrations"}
                </div>
            </button>
            {props.email &&
                <div className={"flex flex-col space-y-2"}>
                    <div className={"text-lg font-semibold"}> Welcome {props.email.split("@")[0]}</div>
                    <button className={"flex space-x-2 border-2 border-gray-300 rounded-xl px-4 py-2 items-center justify-center " +
                            "font-bold text-indigo-600 hover:text-indigo-300 hover:bg-gray-700 bg-gray-200"}
                        onClick={() => signOut()}>
                        Sign Out
                    </button>
                </div>}
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
                    <span>Built with Paragon & LlamaIndex</span>
                    <Image
                        className="rounded-xl"
                        src="/llama.png"
                        alt="Llama Logo"
                        width={40}
                        height={40}
                        priority
                    />
                </a>
            }
        </div>
    );
}
export default Header;


