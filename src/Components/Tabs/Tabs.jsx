import { useState } from 'react';

const Tabs = ({ children }) => {
    const [activeTab, setActiveTab] = useState(children[0].props.label);

    const handleClick = (e, newActiveTab) => {
        e.preventDefault();
        setActiveTab(newActiveTab);
    };

    return (
        <div className=" w-full max-w-3xl md:px-24 px-4 mt-5">
            <div className="flex border-b border-gray-300 dark:border-gray-500">
                {children.map(child => (
                    <button
                        key={child.props.label}
                        className={`${activeTab === child.props.label ? 'border-b-2 border-purple-600' : ''
                            } flex-1 text-gray-600 font-medium py-2 flex justify-center gap-2 items-center dark:text-gray-50`}
                        onClick={e => handleClick(e, child.props.label)}
                    >
                        <span
                            className={` text-md inline-block align-middle mr-1 ${activeTab === child.props.label ? 'text-purple-500' : ''}`}> {child.props.label}
                        </span>
                        <span c
                            lassName={` text-xl inline-block align-middle mr-1 ${activeTab === child.props.label ? 'text-purple-500' : ''}`}>{child.props.icon}
                        </span>

                    </button>
                ))}
            </div>
            <div className="py-4 shadow-lg  my-5 rounded-xl w-full dark:bg-gray-800 mb-24">
                {children.map(child => {
                    if (child.props.label === activeTab) {
                        return <div key={child.props.label}>{child.props.children}</div>;
                    }
                    return null;
                })
                }
            </div>
        </div>
    );
};

const Tab = ({ label, children, icon }) => {
    return (
        <div label={label} className="hidden">
            {children}
        </div>
    );
};
export { Tabs, Tab };