import React, { useState } from "react";
import { BiUserCircle } from 'react-icons/bi'
import { BsShieldLockFill } from 'react-icons/bs'
import { AiOutlineForm } from 'react-icons/ai';
export default function TabsRender() {
    const [openTab, setOpenTab] = useState(1);
    return (
        <>
            <div className="flex flex-wrap w-full max-w-xl p-4 md:p-0">
                <div className="w-full">
                    <ul className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row" role="tablist">
                        <li className="mr-2 last:mr-0 flex-auto text-center">
                            <div
                                className={
                                    'text-xs font-bold uppercase px-2 py-3 shadow-lg rounded-2xl block leading-normal ' +
                                    (openTab === 1
                                        ? "text-white bg-purple-500"
                                        : "text-purple-500 bg-white")
                                }
                                onClick={e => {
                                    e.preventDefault();
                                    setOpenTab(1);
                                }}
                                data-toggle="tab"

                                role="tablist"
                            >
                                <span className="bg-none md:inline-block align-middle mr-5">Update</span>
                                <AiOutlineForm className=" text-xl inline-block align-middle mr-1" />
                            </div>
                        </li>

                        <li className=" mr-2 last:mr-0 flex-auto text-center">
                            <div
                                className={
                                    'text-xs font-bold uppercase px-2 py-3 shadow-lg rounded-2xl block leading-normal ' +
                                    (openTab === 2
                                        ? "text-white bg-purple-500"
                                        : "text-purple-500 bg-white")
                                }
                                onClick={e => {
                                    e.preventDefault();
                                    setOpenTab(2);
                                }}
                                data-toggle="tab"
                                href="#link2"
                                role="tablist"
                            >
                                <span className="inline-block align-middle mr-5">Security</span>
                                <BsShieldLockFill className=" text-xl inline-block align-middle mr-1" />
                            </div>
                        </li>
                        <li className=" mr-2 last:mr-0 flex-auto text-center">
                            <div
                                className={
                                    'text-xs font-bold uppercase px-2 py-3 shadow-lg rounded-2xl block leading-normal ' +
                                    (openTab === 3
                                        ? "text-white bg-purple-500"
                                        : "text-purple-500 bg-white")
                                }
                                onClick={e => {
                                    e.preventDefault();
                                    setOpenTab(3);
                                }}
                                data-toggle="tab"
                                href="#link3"
                                role="tablist"
                            >
                                <span className="inline-block align-middle mr-5">Update</span>
                                <AiOutlineForm className=" text-xl inline-block align-middle mr-1" />
                            </div>
                        </li>
                    </ul>
                    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-2xl">
                        <div className="px-4 py-5 flex-auto">
                            <div className="tab-content tab-space">
                                <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                                    <p>
                                        Collaboratively administrate empowered markets via
                                        plug-and-play networks. Dynamically procrastinate B2C users
                                        after installed base benefits.
                                        <br />
                                        <br /> Dramatically visualize customer directed convergence
                                        without revolutionary ROI.
                                    </p>
                                </div>
                                <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                                    <p>
                                        Completely synergize resource taxing relationships via
                                        premier niche markets. Professionally cultivate one-to-one
                                        customer service with robust ideas.
                                        <br />
                                        <br />
                                        Dynamically innovate resource-leveling customer service for
                                        state of the art customer service.
                                    </p>
                                </div>
                                <div className={openTab === 3 ? "block" : "hidden"} id="link3">
                                    <p>
                                        Efficiently unleash cross-media information without
                                        cross-media value. Quickly maximize timely deliverables for
                                        real-time schemas.
                                        <br />
                                        <br /> Dramatically maintain clicks-and-mortar solutions
                                        without functional solutions.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}