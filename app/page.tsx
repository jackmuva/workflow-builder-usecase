"use client";
import Header from "@/app/components/header";
import React, { useEffect, useState } from "react";
import Integrations from "@/app/components/ui/integration/integrations";
import { AuthenticatedConnectUser } from "@useparagon/connect";
import { getSession } from "@/app/components/ui/integration/auth-action";
import useParagon from "@/app/hooks/useParagon";
import { Footer } from "@/app/components/Footer";
import { ToastContainer } from "react-toastify";
import ReactflowPlayground from "./components/ui/reactflow/reactflow-playground";

export default function Home() {
    const [intgDropdown, setIntgDropdown] = useState<boolean>(false);
    const [user, setUser] = useState<{ allowed: boolean, email: string }>({ allowed: false, email: "" });

    useEffect(() => {
        const handleSession = () => {
            getSession().then((loggedInUser) => {
                if (!loggedInUser) {
                    console.log("not logged in");
                    sessionStorage.setItem("jwt", "");
                    setUser({ allowed: false, email: "" });
                } else if (sessionStorage.getItem("jwt") && loggedInUser) {
                    console.log("setting user");
                    if (loggedInUser?.user?.email?.split("@")[1] === (process.env.NEXT_PUBLIC_AUTHORIZED_DOMAIN ?? "useparagon.com")) {
                        setUser({ allowed: true, email: loggedInUser.user.email });
                    } else {
                        setUser({ allowed: false, email: loggedInUser?.user?.email ?? "" });
                    }
                } else {
                    console.log("grabbing jwt");
                    if (loggedInUser?.user?.email) {
                        fetch(process.env.NEXT_PUBLIC_AUTH_BACKEND ?? "", {
                            method: 'POST',
                            body: JSON.stringify({ email: loggedInUser.user.email }),
                            headers: {
                                'content-type': 'application/json'
                            }
                        }).then((res) => {
                            res.json().then((body) => {
                                sessionStorage.setItem("jwt", body.jwt);
                                console.log("jwt set");
                                if (loggedInUser?.user?.email?.split("@")[1] === (process.env.NEXT_PUBLIC_AUTHORIZED_DOMAIN ?? "useparagon.com")) {
                                    setUser({
                                        allowed: true,
                                        email: loggedInUser?.user?.email ?? ""
                                    });
                                } else {
                                    setUser({
                                        allowed: false,
                                        email: loggedInUser?.user?.email ?? ""
                                    });
                                }
                            })
                        })
                    }
                }
            });
        }
        handleSession();
    }, []);

    function toggleDropdown() {
        setIntgDropdown(!intgDropdown);
    }
    console.log(user);
    return (
        <main className="pt-5 flex justify-center items-center background-gradient">
            <div className="flex-col space-y-2 lg:space-y-10 w-[90%] lg:w-[60rem]">
                <Header toggleDown={intgDropdown} toggle={toggleDropdown} email={user.email} />
                {intgDropdown && <Integrations user={user} />}
                {user.allowed && user.email &&
                    <ReactflowPlayground />
                }
                {user.email && !user.allowed &&
                    <div className="h-[65vh] flex flex-col justify-center items-center space-y-4">
                        <div className={"font-bold font-['Helvetica'] text-3xl"}>Sorry, you currently don't have access to this
                            page
                        </div>
                        <div className={"font-semibold font-['Helvetica'] text-xl text-neutral-600 flex space-x-2"}>
                            <div>To get access,</div>
                            <a className={"text-indigo-600 hover:-translate-y-0.5 hover:text-indigo-300"}
                                target={"_blank"} href={"https://www.useparagon.com/book-demo"}>
                                reach out to us at Paragon to book a demo!
                            </a>
                        </div>
                    </div>
                }
                {!user.email &&
                    <div className="h-[65vh] flex flex-col justify-center items-center space-y-4">
                        <div className={"font-bold font-['Helvetica'] text-4xl"}>Welcome to the Parato Demo</div>
                        <div className={"font-semibold font-['Helvetica'] text-xl text-neutral-600 flex space-x-2"}>
                            <button className={"text-indigo-600 hover:-translate-y-0.5 hover:text-indigo-300"}
                                onClick={toggleDropdown}>
                                Configure integrations
                            </button>
                            <div>to begin</div>
                        </div>
                    </div>
                }
            </div>
        </main>
    );
}
