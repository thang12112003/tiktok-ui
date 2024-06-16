import styles from './Header.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import { UserAuth } from '~/components/Store/AuthContext';
import config from '~/config';
import Button from '~/components/Button';
import classNames from 'classnames/bind';
import images from '~/assets/images';
import Menu from '~/components/Popper/Menu';
import {
    InboxIcon,
    MessageIcon,
    AddIcon,
    ElipseVerticalIcon,
    CoinIcon,
    GearIcon,
    KeyboardIcon,
    LanguageIcon,
    LogoutIcon,
    PerSonIcon,
    QuestionIcon,
} from '~/components/Icons';
import Image from '~/components/Image';
import Search from '../Search';

const cx = classNames.bind(styles);

function Header() {
    const navigate = useNavigate(); //useNavigate là một hook cung cấp cho bạn một chức năng điều hướng, cho phép bạn điều hướng đến các tuyến đường khác trong ứng dụng của bạn thông qua mã JavaScript.
    //useNavigate() giống link

    const { userAuth, tokenStr, setOpenFormLogin } = UserAuth();

    const MENU_ITEMS = [
        {
            icon: <LanguageIcon />,
            title: 'English',
            children: {
                title: 'Language',
                data: [
                    {
                        type: 'language',
                        code: 'en',
                        title: 'English',
                    },
                    {
                        type: 'language',
                        code: 'العربية',
                        title: 'العربية',
                    },
                    {
                        type: 'language',
                        code: 'বাঙ্গালি (ভারত)',
                        title: 'বাঙ্গালি (ভারত)',
                    },
                    {
                        type: 'language',
                        code: 'Cebuano (Pilipinas)',
                        title: 'Cebuano (Pilipinas)',
                    },
                    {
                        type: 'language',
                        code: 'Čeština (Česká republika)',
                        title: 'Čeština',
                    },
                    {
                        type: 'language',
                        code: 'Deutsch',
                        title: 'Deutsch',
                    },
                    {
                        type: 'language',
                        code: 'Ελληνικά (Ελλάδα)',
                        title: 'Ελληνικά (Ελλάδα)',
                    },
                    {
                        type: 'language',
                        code: 'Español',
                        title: 'Español',
                    },
                    {
                        type: 'language',
                        code: 'Suomi (Suomi)',
                        title: 'Suomi (Suomi)',
                    },
                    {
                        type: 'language',
                        code: 'Filipino (Pilipinas)',
                        title: 'Filipino (Pilipinas)',
                    },
                    {
                        type: 'language',
                        code: 'Français',
                        title: 'Français',
                    },
                    {
                        type: 'language',
                        code: 'עברית (ישראל)',
                        title: 'עברית (ישראל)',
                    },
                    {
                        type: 'language',
                        code: 'हिंदी',
                        title: 'हिंदी',
                    },
                    {
                        type: 'language',
                        code: 'Magyar (Magyarország)',
                        title: 'Magyar (Magyarország)',
                    },
                    {
                        type: 'language',
                        code: '简体中文',
                        title: '简体中文',
                    },
                    {
                        type: 'language',
                        code: 'Italiano (Italia)',
                        title: 'Italiano (Italia)',
                    },
                    {
                        type: 'language',
                        code: '日本語（日本）',
                        title: '日本語（日本）',
                    },
                    {
                        type: 'language',
                        code: 'vi',
                        title: 'Tiếng Việt',
                    },
                ],
            },
        },
        {
            icon: <QuestionIcon />,
            title: 'Feedback and help',
            to: '/feedback',
        },
        {
            icon: <KeyboardIcon />,
            title: 'Keyboard shortcuts',
        },
    ];

    const USER_MENU = [
        {
            icon: <PerSonIcon />,
            title: 'View profile',
            to: `/@${userAuth.nickname}`,
        },
        {
            icon: <CoinIcon />,
            title: 'Get coins',
            to: '/coin',
        },
        {
            icon: <GearIcon />,
            title: 'Settings',
            to: '/settings',
        },
        ...MENU_ITEMS,
        {
            icon: <LogoutIcon />,
            title: 'Log out',
            separate: true,
            component: true,
        },
    ];

    const handleFormLogin = () => {
        tokenStr && userAuth ? navigate('/upload') : setOpenFormLogin(true);
    };

    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Link to={config.routes.home} className={cx('logo-link')}>
                    <div className={cx('logo')}>
                        <img src={images.logo} alt="Tiktok" />
                    </div>
                </Link>

                <Search />

                <div className={cx('actions')}>
                    <Tippy delay={[0, 50]} content="Upload video" placement="bottom">
                        <Button onClick={handleFormLogin} className={cx('btn-upload')} outline medium>
                            <AddIcon className={cx('add-icon')} />
                            Tải lên
                        </Button>
                    </Tippy>
                    {userAuth && tokenStr ? (
                        <>
                            <Tippy delay={[0, 50]} content="Message" placement="bottom">
                                <button className={cx('action-btn')}>
                                    <MessageIcon />
                                    <span className={cx('badge-message')}>4</span>
                                </button>
                            </Tippy>
                            <Tippy delay={[0, 50]} content="Inbox" placement="bottom">
                                <button className={cx('action-btn')}>
                                    <InboxIcon />
                                    <span className={cx('badge-inbox')}>12</span>
                                </button>
                            </Tippy>
                        </>
                    ) : (
                        <>
                            <Button onClick={handleFormLogin} text>
                                Upload
                            </Button>
                            <Button onClick={handleFormLogin} primary>
                                Log in
                            </Button>
                        </>
                    )}
                    <Menu items={userAuth && tokenStr ? USER_MENU : MENU_ITEMS}>
                        {userAuth && tokenStr ? (
                            <div className={cx('btn-wrapper')}>
                                <Link to={`/@${userAuth.nickname}`} className={cx('avatar-user')}>
                                    <Image
                                        className={cx('avatar')}
                                        src={userAuth.avatar}
                                        alt={userAuth.first_name + ' ' + userAuth.last_name}
                                    />
                                </Link>
                            </div>
                        ) : (
                            <button className={cx('more-btn')}>
                                <ElipseVerticalIcon />
                            </button>
                        )}
                    </Menu>
                </div>
            </div>
        </header>
    );
}

export default Header;
