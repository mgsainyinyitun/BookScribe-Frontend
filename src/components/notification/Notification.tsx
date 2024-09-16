import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FC, useEffect } from 'react';

interface notiProps {
    noti: any
    setNoti: (noti: any) => void;
}

const Notification: FC<notiProps> = ({ noti, setNoti }) => {
    const { message, type, show } = noti;
    const onClose = () => {
        setNoti({ ...noti, show: false });
    }
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 5000);

        return () => clearTimeout(timer); // Cleanup the timer on unmount
    }, [noti]);

    const typeClasses: any = {
        success: 'bg-green-100 border-green-400 text-green-700',
        error: 'bg-red-100 border-red-400 text-red-700',
        info: 'bg-blue-100 border-blue-400 text-blue-700',
    };

    return (
        <div className='fixed top-5 w-full flex justify-center items-cente min-w-60'>
            <div
                className={`${show ? 'block animate-slideIn' : 'hidden animate-slideOut opacity-0'} group z-50 bg-white border rounded-lg shadow-lg  ${typeClasses[type]} border ${typeClasses[type].split(' ')[1]}`}
            >
                <div className='flex justify-end pr-1 pt-1'>
                    <button onClick={() => setNoti({ ...noti, show: false })} className=" text-gray-600 hover:text-gray-800">
                        <FontAwesomeIcon icon={faClose} />
                    </button>
                </div>

                <div className="flex items-start mx-4 mb-4">
                    <svg
                        className={`w-6 h-6 ${type === 'success' ? 'text-green-500' : type === 'error' ? 'text-red-500' : 'text-blue-500'} mr-3`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        {type === 'success' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />}
                        {type === 'error' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />}
                        {type === 'info' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M5.5 5.5l13 13" />}
                    </svg>
                    <div>
                        <p className="font-semibold text-gray-800">{type.charAt(0).toUpperCase() + type.slice(1)}!</p>
                        <p className="text-gray-600">{message}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Notification;
