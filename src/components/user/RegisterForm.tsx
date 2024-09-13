import { faClose, faUserLarge } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FC, useState } from 'react'
import Notification from '../notification/Notification';
import api from '../../api';
import { useCtx } from '../../Ctx';

interface registerFormProps {
    visible: boolean;
    setVisible: (cond: boolean) => void;
}

const RegisterForm: FC<registerFormProps> = ({ visible, setVisible }) => {
    const { setUsername } = useCtx();
    const [noti, setNoti] = useState({
        message: '',
        type: 'success',
        show: false,
    });

    const [data, setData] = useState({
        username: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
    })

    const onRegisterSubmit = (e: any) => {
        e.preventDefault();
        if (data.confirmPassword !== data.password) {
            setNoti({ ...noti, message: "Passwords do not match", show: true, type: 'error' });
            return;
        }

        const { confirmPassword, ...reqData } = data;
        api.post('/auth/signup', reqData)
            .then(res => {
                setUsername(res.data.username);
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('username', JSON.stringify(res.data.username));
                setNoti({ ...noti, message: "Register successfully!", show: true, type: 'success' });
                setVisible(false);
            })
            .catch(err => {
                console.log(err);
                setNoti({ ...noti, message: "Something wrong! Please try again later.", show: true, type: 'error' });
                setVisible(false);
            });

        setData({
            username: '',
            email: '',
            phone: '',
            password: '',
            confirmPassword: '',
        });
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

                <form onClick={e => e.stopPropagation()} onSubmit={onRegisterSubmit}
                    className="bg-white p-5 sm:p-8 md:p-10 lg:p-12 xl:p-14 rounded-3xl w-full sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4 mx-auto animate-slideIn"
                >
                    <div className='flex justify-end mr-3'>
                        <FontAwesomeIcon icon={faClose} className='text-red-700 font-bold text-2xl' onClick={() => setVisible(false)} />
                    </div>

                    <div className='flex flex-col justify-center items-center gap-3'>
                        <h1 className='text-gray-700 text-2xl'>Register Account</h1>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username : </label>
                        <input
                            onChange={e => setData({ ...data, username: e.target.value })}
                            required
                            autoComplete='off'
                            type='text'
                            id="username"
                            name='username'
                            value={data?.username}
                            className="bg-white text-black mt-1 block w-full px-3 py-3 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">E-mail : </label>
                        <input
                            onChange={e => setData({ ...data, email: e.target.value })}
                            autoComplete='off'
                            required
                            name='email'
                            type='email'
                            id="email"
                            value={data?.email}
                            className="bg-white text-black mt-1 block w-full px-3 py-3 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone : </label>
                        <input
                            onChange={e => setData({ ...data, phone: e.target.value })}
                            autoComplete='off'
                            required
                            name='phone'
                            type='text'
                            id="phone"
                            value={data?.phone}
                            className="bg-white text-black mt-1 block w-full px-3 py-3 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password : </label>
                        <input
                            onChange={e => setData({ ...data, password: e.target.value })}
                            autoComplete='off'
                            name='password'
                            required
                            type='password'
                            id="password"
                            value={data?.password}
                            className="bg-white text-black mt-1 block w-full px-3 py-3 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password : </label>
                        <input
                            onChange={e => setData({ ...data, confirmPassword: e.target.value })}
                            autoComplete='off'
                            name='confirmPassword'
                            required
                            type='password'
                            id="confirmPassword"
                            value={data?.confirmPassword}
                            className="bg-white text-black mt-1 block w-full px-3 py-3 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white px-4 py-3 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Register
                    </button>
                </form>
            </div>}
        </>
    )
}

export default RegisterForm