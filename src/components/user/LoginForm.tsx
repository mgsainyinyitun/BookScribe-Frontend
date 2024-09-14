import { FC, useState } from 'react'
import { useCtx } from '../../Ctx';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import Notification from '../notification/Notification';

interface loginFormProps {
    visible: boolean;
    setVisible: (cond: boolean) => void;
}

const LoginForm: FC<loginFormProps> = ({ visible, setVisible }) => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const { api, setUsername } = useCtx();

    const [noti, setNoti] = useState({
        message: '',
        type: 'success',
        show: false,
    });

    const onLoginSubmit = (e: any) => {
        e.preventDefault();

        axios.post(`${api}/auth/login`, { email, password })
            .then(response => {
                console.log(response.data);
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('username', JSON.stringify(response.data.username));
                setUsername(response.data.username);
                setNoti({ ...noti, message: "Login successfully!", show: true, type: 'success' });

            })
            .catch(error => {
                console.error(error);
                setNoti({ ...noti, message: "Something wrong! Please try again later.", show: true, type: 'error' });
            });
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

                <form onClick={e => e.stopPropagation()} onSubmit={onLoginSubmit} className="bg-white w-[30%] p-10 rounded-3xl animate-slideIn">

                    <div className='flex justify-end mr-3'>
                        <FontAwesomeIcon icon={faClose} className='text-red-700 font-bold text-2xl' onClick={() => setVisible(false)} />
                    </div>

                    <div className='flex flex-col justify-center items-center gap-3'>
                        <h1 className='text-gray-700 text-2xl'>Login</h1>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">E-mail : </label>
                        <input
                            type='email'
                            id="email"
                            value={email}
                            onChange={(e) => { e.stopPropagation(); setEmail(e.target.value) }}
                            required
                            className="bg-white text-black mt-1 block w-full px-3 py-3 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password : </label>
                        <input
                            type='password'
                            id="password"
                            value={password}
                            onChange={(e) => { e.stopPropagation(); setPassword(e.target.value) }}
                            required
                            className="bg-white text-black mt-1 block w-full px-3 py-3 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white px-4 py-3 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Login
                    </button>
                </form>
            </div>}
        </>
    )
}

export default LoginForm