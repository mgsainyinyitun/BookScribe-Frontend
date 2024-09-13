import { faIdCard, faSignIn, faSignOut, faUserLarge, faUserPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FC, useState } from 'react'
import LoginForm from './LoginForm';
import { useCtx } from '../../Ctx';
import UserProfile from './UserProfile';

const UserMgmt: FC = () => {
    const [menuVisible, setMenuVisible] = useState(false);
    const [loginVisibe, setLoginVisible] = useState(false);
    const [profileVisible, setProfileVisble] = useState(false);
    const { username, setUsername } = useCtx();

    return (
        <>
            <div className='absolute top-0 left-0 w-[50%] flex justify-center items-start pl-5 pt-5 z-50 flex-col gap-2'>
                <div className='flex'>
                    <button
                        onClick={() => setMenuVisible(!menuVisible)}
                        className={`w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-600 focus:outline-none'}`}>
                        {menuVisible ? <FontAwesomeIcon icon={faXmark} /> : <FontAwesomeIcon icon={faUserLarge} />}
                    </button>

                    {username.length !== 0 && <button className='bg-blue-500 text-white rounded-full w-32 ml-1'>
                        {username}
                    </button>}
                </div>

                {
                    menuVisible && (<>
                        <div className={` ${menuVisible ? 'animate-slideIn' : 'animate-slideOut opacity-0'} flex flex-col items-end gap-2`}>


                            <div className='flex'>
                                <button
                                    onClick={() => setProfileVisble(true)}
                                    className={`w-12 h-12 bg-blue-800 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-600'}`}>
                                    <FontAwesomeIcon icon={faIdCard} />
                                </button>
                                <button
                                    onClick={() => setProfileVisble(true)}
                                    className='bg-blue-800 text-white rounded-full w-32 ml-1'>
                                    Profile
                                </button>
                            </div>

                            <div className='flex'>
                                <button
                                    onClick={() => setLoginVisible(true)}
                                    className={`w-12 h-12 bg-blue-800 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-600'}`}>
                                    <FontAwesomeIcon icon={faSignIn} />
                                </button>
                                <button
                                    onClick={() => setLoginVisible(true)}
                                    className='bg-blue-800 text-white rounded-full w-32 ml-1'>
                                    Login
                                </button>
                            </div>

                            <div className='flex'>
                                <button
                                    // onClick={() => setNewBookVisible(true)}
                                    className={`w-12 h-12 bg-blue-800 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-600'}`}>
                                    <FontAwesomeIcon icon={faUserPlus} />
                                </button>
                                <button className='bg-blue-800 text-white rounded-full w-32 ml-1'>
                                    Register
                                </button>
                            </div>

                            <div className='flex'>
                                <button
                                    onClick={() => { localStorage.clear(); setUsername('') }}
                                    className={`w-12 h-12 bg-blue-800 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-600'}`}>
                                    <FontAwesomeIcon icon={faSignOut} />
                                </button>
                                <button className='bg-blue-800 text-white rounded-full w-32 ml-1' onClick={() => { localStorage.clear(); setUsername('') }}>
                                    Logout
                                </button>
                            </div>
                        </div>
                    </>)
                }
            </div>
            <LoginForm
                visible={loginVisibe}
                setVisible={setLoginVisible}
            />
            <UserProfile
                visible={profileVisible}
                setVisible={setProfileVisble}
            />
        </>
    )
}

export default UserMgmt;