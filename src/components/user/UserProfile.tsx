import { FC, useEffect, useState } from 'react'
import api from '../../api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faUserLarge } from '@fortawesome/free-solid-svg-icons';
import Notification from '../notification/Notification';


interface userProfileProps {
    visible: boolean;
    setVisible: (visible: boolean) => void;
}

const UserProfile: FC<userProfileProps> = ({ visible, setVisible }) => {

    const [data, setData] = useState<any>({});
    const [phone, setPhone] = useState<string>('');
    const [change, setChange] = useState<boolean>(false);

    const [noti, setNoti] = useState({
        message: '',
        type: 'success',
        show: false,
    });

    useEffect(() => {
        if (visible) {
            api.get('/user/me')
                .then((response: any) => { setData(response.data); setPhone(response.data.phone); })
                .catch((error: any) => console.error(error));
        }
    }, [visible])


    const onUpdateSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (change) {
            api.put('/user/update', { phone })
                .then(res => {
                    setPhone(res.data.phone);
                    setNoti({ ...noti, message: "Update successfully!", show: true, type: 'success' });
                    setChange(false);
                })
                .catch(err => {
                    console.log(err);
                    setNoti({ ...noti, message: "Something wrong! Please try again later.", show: true, type: 'error' });
                })
        }
        setVisible(false);
    }


    return (
        <>
            <Notification
                noti={noti}
                setNoti={setNoti}
            />
            {visible && <div
                onClick={e => { e.stopPropagation(); setVisible(false) }}
                className={`absolute top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-40`}>

                <form onClick={e => e.stopPropagation()} onSubmit={onUpdateSubmit}
                    // className="bg-white w-[30%] p-10 rounded-3xl animate-slideIn"
                    className="bg-white p-6 sm:p-8 md:p-10 lg:p-12 xl:p-14 rounded-3xl w-full sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4 mx-auto animate-slideIn"
                >
                    <div className='flex justify-end mr-3'>
                        <FontAwesomeIcon icon={faClose} className='text-red-700 font-bold text-2xl' onClick={() => setVisible(false)} />
                    </div>

                    <div className='flex flex-col justify-center items-center gap-3'>
                        <FontAwesomeIcon icon={faUserLarge} className='text-blue-500 text-7xl border-2 border-blue-500 rounded-full p-3' />
                        <h1 className='text-gray-700 text-2xl'>User Profile</h1>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username : </label>
                        <input
                            type='text'
                            id="username"
                            disabled
                            value={data?.username || ''}
                            readOnly
                            className="bg-white text-black mt-1 block w-full px-3 py-3 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">E-mail : </label>
                        <input
                            type='email'
                            disabled
                            id="email"
                            value={data?.email || ''}
                            readOnly
                            className="bg-white text-black mt-1 block w-full px-3 py-3 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone : </label>
                        <input
                            type='text'
                            id="phone"
                            onChange={e => { setPhone(e.target.value); setChange(true) }}
                            value={phone}
                            className="bg-white text-black mt-1 block w-full px-3 py-3 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="book" className="block text-sm font-medium text-gray-700">No. Of Book : </label>
                        <input
                            type='text'
                            id="book"
                            readOnly
                            disabled
                            value={data?.numberOfBook || ''}
                            className="bg-white text-black mt-1 block w-full px-3 py-3 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                    </div>

                    <button
                        type="submit"
                        className={`w-full ${change ? 'bg-blue-500' : 'bg-gray-400'} text-white px-4 py-3 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
                    >
                        Update
                    </button>
                </form>
            </div>}
        </>
    )
}

export default UserProfile