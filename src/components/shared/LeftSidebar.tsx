import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { useSignOutAccountMutation } from '@/lib/react-query/queryAndMutations';
import { useEffect } from 'react';
import { useUserContext } from '@/context/AuthContext';
import { sidebarLinks } from '@/constance';
import { INavLink } from '@/types';

const LeftSidebar = () => {
    const { pathname } = useLocation()
    const { mutate: signOutAccount, isSuccess } = useSignOutAccountMutation();
    const navigate = useNavigate();
    const user = useUserContext();

    useEffect(() => {
        if (isSuccess) {
            navigate(0);
        }
    }, [isSuccess]);

    return (
        <nav className='leftsidebar'>
            <div className='flex flex-col gap-11'>
                <Link to="/" className='flex gap-3 items-center'>
                    <img src='/assets/images/logo.svg' alt='logo' width={170} height={36} />
                </Link>

                <Link to={`/profile/${user.user.id}`} className='flex-center gap-3'>
                    <img src={user.user.imageUrl || '/assets/icons/profile-placeholder.svg'} alt='profile' className='h-14 w-14 rounded-full' />
                    <div className='flex flex-col'>
                        <p className='body-bold'>{user.user.name}</p>
                        <p className='small-regular text-light-3'>@{user.user.username}</p>
                    </div>
                </Link>

                <ul className='flex flex-col gap-6'>
                    {
                        sidebarLinks.map((link: INavLink) => {

                            const isActive = pathname === link.route;

                            return (
                                <li key={link.label} className={`leftsidebar-link group ${isActive && 'bg-primary-500'}`}>
                                    <NavLink
                                        to={link.route}
                                        className='flex gap-4 items-center p-4'
                                    >
                                        <img src={link.imgURL} alt={link.label} className={`group-hover:invert-white ${isActive && 'invert-white'}`} />
                                        {link.label}

                                    </NavLink>
                                </li>
                            )
                        })
                    }

                </ul>
            </div>
            <Button variant="ghost" className='shad-button_ghost' onClick={() => signOutAccount()}>
                <img src='/assets/icons/logout.svg' alt='logout' />
                <p className='small-medium lg:base-medium'>Logout</p>
            </Button>
        </nav>
    )
}

export default LeftSidebar;
