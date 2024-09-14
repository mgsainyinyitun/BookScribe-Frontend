import { faIdCard, faSignIn, faSignOut, faUserLarge, faUserPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FC, useEffect, useState } from 'react'
import LoginForm from './LoginForm';
import { useCtx } from '../../Ctx';
import UserProfile from './UserProfile';
import RegisterForm from './RegisterForm';
import Notification from '../notification/Notification';

const UserMgmt: FC = () => {
    const [menuVisible, setMenuVisible] = useState(false);
    const [loginVisibe, setLoginVisible] = useState(false);
    const [profileVisible, setProfileVisble] = useState(false);
    const [registerVisible, setRegisterVisible] = useState(false);

    const { username, setUsername } = useCtx();

    const [isLogin, setIsLogin] = useState(false);

    const [noti, setNoti] = useState({
        message: '',
        type: 'success',
        show: false,
    });

    const clickMenuVisible = () => {
        setMenuVisible(!menuVisible);
    }

    useEffect(() => {
        if (username.length !== 0) {
            setIsLogin(true);
        } else {
            setIsLogin(false);
        }
    }, [username])


    const logout = () => {
        if (isLogin) {
            localStorage.clear();
            setUsername('');
            setIsLogin(false);
            setNoti({ ...noti, message: "Logout successfully!", show: true, type: 'success' });
        }
    }

    return (
        <>
            <Notification
                noti={noti}
                setNoti={setNoti}
            />
            <div className='absolute top-0 left-0 w-[50%] flex justify-center items-start pl-5 pt-5 z-50 flex-col gap-2'>
                <div className='flex'>
                    <button
                        onClick={clickMenuVisible}
                        className={`w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-600 focus:outline-none'}`}>
                        {menuVisible ? <FontAwesomeIcon icon={faXmark} /> : <FontAwesomeIcon icon={faUserLarge} />}
                    </button>

                    {username.length !== 0 && !menuVisible &&
                        <button
                            onClick={() => { setMenuVisible(!menuVisible); setProfileVisble(!profileVisible) }}
                            className={`bg-blue-500 text-white rounded-full w-32 ml-1 ${!menuVisible ? 'animate-slideIn' : 'animate-slideOut opacity-0'}`}>
                            {username}
                        </button>}
                </div>

                {
                    menuVisible && (<>
                        <div className={` ${menuVisible ? 'animate-slideIn' : 'animate-slideOut opacity-0'} flex flex-col items-end gap-2`}>

                            <div className='flex'>
                                <button
                                    onClick={() => setProfileVisble(true && isLogin)}
                                    className={`w-12 h-12 ${!isLogin ? 'bg-gray-400' : 'bg-blue-800'}  text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-600'}`}>
                                    <FontAwesomeIcon icon={faIdCard} />
                                </button>
                                <button
                                    onClick={() => setProfileVisble(true && isLogin)}
                                    className={`${isLogin ? 'bg-blue-800' : 'bg-gray-400'} text-white rounded-full w-32 ml-1`}>
                                    Profile
                                </button>
                            </div>

                            <div className='flex'>
                                <button
                                    onClick={() => { setLoginVisible(true && !isLogin); setRegisterVisible(false) }}
                                    className={`w-12 h-12 ${!isLogin ? 'bg-blue-800' : 'bg-gray-400'} text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-600'}`}>
                                    <FontAwesomeIcon icon={faSignIn} />
                                </button>
                                <button
                                    onClick={() => { setLoginVisible(true && !isLogin); setRegisterVisible(false) }}
                                    className={`${!isLogin ? 'bg-blue-800' : 'bg-gray-400'} text-white rounded-full w-32 ml-1`}>
                                    Login
                                </button>
                            </div>

                            <div className='flex'>
                                <button
                                    onClick={() => { setRegisterVisible(true && !isLogin); setLoginVisible(false) }}
                                    className={`w-12 h-12  ${!isLogin ? 'bg-blue-800' : 'bg-gray-400'} text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-600'}`}>
                                    <FontAwesomeIcon icon={faUserPlus} />
                                </button>
                                <button
                                    onClick={() => { setRegisterVisible(true && !isLogin); setLoginVisible(false) }}
                                    className={`${!isLogin ? 'bg-blue-800' : 'bg-gray-400'} text-white rounded-full w-32 ml-1`}>
                                    Register
                                </button>
                            </div>

                            <div className='flex'>
                                <button
                                    onClick={logout}
                                    className={`w-12 h-12 ${isLogin ? 'bg-blue-800' : 'bg-gray-400'} text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-600'}`}>
                                    <FontAwesomeIcon icon={faSignOut} />
                                </button>
                                <button
                                    className={`${isLogin ? 'bg-blue-800' : 'bg-gray-400'} text-white rounded-full w-32 ml-1`}
                                    onClick={logout}>
                                    Logout
                                </button>
                            </div>
                        </div>
                    </>)
                }
            </div>
            <LoginForm
                visible={loginVisibe && menuVisible}
                setVisible={setLoginVisible}
            />
            <UserProfile
                visible={profileVisible && menuVisible}
                setVisible={setProfileVisble}
            />
            <RegisterForm
                visible={registerVisible && menuVisible}
                setVisible={setRegisterVisible}
            />
        </>
    )
}

export default UserMgmt;