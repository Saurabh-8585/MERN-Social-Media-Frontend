import { useState } from 'react'
import { RiMapPin2Line, RiCloseLine } from 'react-icons/ri';
import toast from 'react-hot-toast';

const Location = ({ onClose, postLocation,  setPostLocation }) => {
    const [isOpen, setIsOpen] = useState(true);
    const closeModal = () => {
        setIsOpen(false);
        onClose();
    };

    const getLocation = () => {
        const loadingToastId = toast.loading('Fetching location...');
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10&addressdetails=1`;
                try {
                    const response = await fetch(url);
                    if (!response.ok) {
                        toast.error('Error fetching location');
                    }
                    const data = await response.json();
                    const location = `${data?.address?.['ISO3166-2-lvl4'].toUpperCase()} ,${data?.address?.state_district}`;
                    setPostLocation(location)
                    toast.success(`Location fetched successfully! `, { id: loadingToastId });
                } catch (error) {
                    toast.error('Error while fetching location', { id: loadingToastId });
                }
            },
            (error) => {
                toast.error('Error while getting geolocation', { id: loadingToastId });
            }
        );
    };

    return (
        <> {isOpen &&
            <div
                className={
                    isOpen
                        ? 'fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center  bg-black bg-opacity-50 z-20'
                        : 'hidden'
                }>
                <div className="relative w-[15rem] md:w-[25rem] p-6 bg-white shadow-lg rounded-xl mb-20">
                    <div
                        onClick={closeModal}
                        className="absolute -top-1 -right-1 hover:top-0 hover:right-0 p-1.5 rounded-lg bg-white shadow-lg cursor-pointer duration-200">
                        <RiCloseLine className="text-primary]" />
                    </div>
                    <div className="space-y-2 md:space-y-4">
                        <h3 className="text-sm md:text-base font-semibold text-center">
                            Add location
                        </h3>
                        <div className="relative flex items-center rounded-xl bg-gray-200 group">
                            <input
                                id="location"
                                className="outline-none flex flex-grow p-3 bg-transparent rounded-l-xl px-4 text-xs duration-300"
                                type="text"
                                placeholder="location"
                                value={postLocation}
                                onChange={(e) => setPostLocation(e.target.value)}
                            />
                            <div className="absolute top-0 right-0 duration-300 rounded-xl bg-transparent p-2 group-focus-within:-top-2 group-focus-within:-right-2 group-focus-within:bg-purple-500">
                                <RiMapPin2Line className="text-primary group-focus-within:text-white text-purple-500 text-lg" />
                            </div>
                        </div>


                        <div className="flex justify-around items-center gap-2">
                            {!postLocation && <button
                                className='w-full bg-purple-500 text-white hover:bg-white hover:text-purple-500 border border-purple-500 mt-5 font-bold py-2 px-5  rounded-full   shadow-md  ease-linear transition-all duration-150 flex items-center justify-center gap-2'
                                onClick={getLocation}
                            >
                                Get
                                <RiMapPin2Line className="text-md font-semibold" />
                            </button>}
                            <button
                                className='w-full bg-purple-500 text-white hover:bg-white hover:text-purple-500 border border-purple-500 mt-5 font-bold py-2 px-5  rounded-full  shadow-md  ease-linear transition-all duration-150' 
                                onClick={closeModal}
                                >
                                Add
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        }
        </>
    )
}

export default Location
// <span className="px-4 py-2 flex items-center text-base rounded-full text-white bg-indigo-500">
//     <RiMapPin2Line size={20} className="mr-2" />
//     Hello
//     <button className="bg-transparent hover">
//         <RiCloseLine size={12} className="ml-4" />
//     </button>
// </span>