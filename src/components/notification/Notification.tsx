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
        }, 10000);

        return () => clearTimeout(timer); // Cleanup the timer on unmount
    }, [noti]);

    const typeClasses: any = {
        success: 'bg-green-100 border-green-400 text-green-700',
        error: 'bg-red-100 border-red-400 text-red-700',
        info: 'bg-blue-100 border-blue-400 text-blue-700',
    };

    return (

        <div
            className={`${show ? 'block animate-slideIn' : 'hidden animate-slideOut opacity-0'} z-50  fixed top-5 right-1/2 max-w-xs bg-white border rounded-lg shadow-lg p-4 ${typeClasses[type]} border ${typeClasses[type].split(' ')[1]}`}
        >
            <div className="flex items-start">
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
            <button onClick={onClose} className="absolute top-2 right-2 text-gray-600 hover:text-gray-800">
                <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
    );
};
export default Notification;
