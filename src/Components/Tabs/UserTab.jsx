import React, { useState } from "react";
import { BsShieldLockFill } from 'react-icons/bs'
import { AiOutlineForm, AiOutlineUserDelete } from 'react-icons/ai';
import UpdateInfo from "./Forms/UpdateInfo";
import ResetPassword from "./Forms/ResetPassword";
import DeleteAccount from "./Forms/DeleteAccount";
export default function TabsRender() {
    const [openTab, setOpenTab] = useState(1);

    return (
        <>
            <div className="flex flex-wrap w-full max-w-xl mb-10 p-4 md:p-0">
                <div className="w-full">
                    <ul className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row" role="tablist">
                        <li className="mr-2 last:mr-0 flex-auto text-center cursor-pointer  ">
                            <div
                                className={
                                    'text-xs font-bold uppercase px-2 py-3 shadow-lg rounded-2xl block leading-normal ' +
                                    (openTab === 1
                                        ? "text-white bg-purple-500"
                                        : "text-purple-500 bg-white border border-purple-500")
                                }
                                onClick={e => {
                                    e.preventDefault();
                                    setOpenTab(1);
                                }}
                                data-toggle="tab"

                                role="tablist"
                            >
                                <span className="hidden md:inline-block align-middle mr-5">Update</span>
                                <AiOutlineForm className=" text-xl inline-block align-middle mr-1" />
                            </div>
                        </li>
                        <li className=" mr-2 last:mr-0 flex-auto text-center cursor-pointer ">
                            <div
                                className={
                                    'text-xs font-bold uppercase px-2 py-3 shadow-lg rounded-2xl block leading-normal ' +
                                    (openTab === 2
                                        ? "text-white bg-purple-500"
                                        : "text-purple-500 bg-white border border-purple-500")
                                }
                                onClick={e => {
                                    e.preventDefault();
                                    setOpenTab(2);
                                }}
                                data-toggle="tab"
                                href="#link2"
                                role="tablist"
                            >
                                <span className="hidden md:inline-block align-middle mr-5">Security</span>
                                <BsShieldLockFill className=" text-xl inline-block align-middle mr-1" />
                            </div>
                        </li>
                        <li className=" mr-2 last:mr-0 flex-auto text-center cursor-pointer ">
                            <div
                                className={
                                    'text-xs font-bold uppercase px-2 py-3 shadow-lg rounded-2xl block leading-normal ' +
                                    (openTab === 3
                                        ? "text-white bg-purple-500"
                                        : "text-purple-500 bg-white border border-purple-500")
                                }
                                onClick={e => {
                                    e.preventDefault();
                                    setOpenTab(3);
                                }}
                                data-toggle="tab"
                                href="#link3"
                                role="tablist"
                            >
                                <span className="hidden md:inline-block align-middle mr-5">Delete</span>
                                <AiOutlineUserDelete className=" text-xl inline-block align-middle mr-1" />
                            </div>
                        </li>
                    </ul>
                    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-2xl dark:bg-gray-800 h-auto mt-5">
                        <div className="px-4 py-5 flex-auto border rounded-xl">
                            <div className="tab-content tab-space dark:bg-gray-800 ">
                                <div className={openTab === 1 ? "block" : "hidden" }  id="link1">
                                    <UpdateInfo />
                                </div>
                                <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                                    <ResetPassword />
                                </div>
                                <div className={openTab === 3 ? "block" : "hidden"} id="link3">
                                    <DeleteAccount />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}