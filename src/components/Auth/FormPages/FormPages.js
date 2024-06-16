import { Fragment, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './FormPages.module.scss';

import LoginWithDefault from './LoginWithDefault';
import LoginWithQr from './LoginWithQr';
import {
    AppleIcon,
    FacebookIcon,
    GoogleIcon,
    LineIcon,
    PerSonIcon,
    QrIcon,
    TalkIcon,
    TwitterIcon,
    BackIcon,
} from '~/components/Icons';

const cx = classNames.bind(styles);

const data = [
    //Một mảng chứa thông tin về các phương thức đăng nhập bằng mạng xã hội.
    {
        icon: <FacebookIcon />,
        title: 'Continue with Facebook',
        disabled: true,
    },
    {
        icon: <GoogleIcon />,
        title: 'Continue with Google',
        disabled: true,
    },
    {
        icon: <TwitterIcon />,
        title: 'Continue with Twitter',
        disabled: true,
    },
    {
        icon: <LineIcon />,
        title: 'Continue with LINE',
        disabled: true,
    },
    {
        icon: <TalkIcon />,
        title: 'Continue with KakaoTalk',
        disabled: true,
    },
];

const MENU_SIGNUP = {
    //form đăng ký
    titleHeader: 'Sign up for TikTok',
    data: [
        {
            icon: <PerSonIcon />,
            title: 'Use phone or email',
            disabled: true, //k cho nhấn vào
        },
        ...data,
    ],
    titleFooter: 'Already have an account?',
    toLink: 'Log in',
};

const MENU_LOGIN = {
    //form đăng nhập.
    titleHeader: 'Log in to TikTok',
    data: [
        {
            icon: <QrIcon />,
            title: 'Use QR code',
            disabled: true,
            children: {
                title: 'Log in',
                type: 'components',
                data: <LoginWithQr />,
            },
        },
        {
            icon: <PerSonIcon />,
            title: 'Phone number / Email / TikTok ID',
            children: {
                title: 'Log in',
                type: 'components',
                data: <LoginWithDefault />,
            },
        },
        ...data,
        {
            icon: <AppleIcon />,
            title: 'Continue with Apple',
            disabled: true,
        },
    ],
    policy: 'By continuing, you agree to TikTok’s Terms of Service and confirm that you have read TikTok’s Privacy Policy.',
    titleFooter: 'Don’t have an account?',
    toLink: 'Sign up',
};

function FormPages() {
    //form đăng nhập đăng ký
    const [isFormLogin, setIsFormLogin] = useState(true); //Boolean xác định hiện tại đang là form đăng nhập hay đăng ký.
    const [convertForm, setConvertForm] = useState(false); // Boolean quyết định hiển thị menu chính hay form con.
    const [form, setForm] = useState(null); //Lưu trữ thông tin về form con (ví dụ: LoginWithQr hoặc LoginWithDefault).

    const items = isFormLogin ? MENU_LOGIN : MENU_SIGNUP; //Lựa chọn cấu trúc dựa trên isFormLogin

    const onChangeForm = () => {
        // Hàm chuyển đổi giữa form đăng nhập và đăng ký.
        setIsFormLogin(!isFormLogin);
    };

    const handleNextForm = (value) => {
        //Khi người dùng chọn một phương thức đăng nhập:Nếu phương thức có children (ví dụ: LoginWithQr), cập nhật form và convertForm.
        if (value.children) {
            setForm(value.children);
            setConvertForm(true);
        }
    };

    const handleBackMenu = () => {
        //: Quay lại menu chính từ form con.
        setConvertForm(false);
    };

    return (
        <div className={cx('wrapper')}>
            {convertForm ? ( //Nếu convertForm là true, hiển thị nút quay lại và form con (LoginWithQr hoặc LoginWithDefault).
                <Fragment>
                    <div onClick={handleBackMenu} className={cx('back')}>
                        <BackIcon className={cx('back-btn')} />
                    </div>
                    {form.data}
                </Fragment>
            ) : (
                <Fragment>
                    {/*Nếu không, hiển thị menu chính */}
                    <div className={cx('body')}>
                        <h1 className={cx('title')}>{items.titleHeader}</h1>
                        <div className={cx('main-form')}>
                            {items.data.map(
                                (
                                    value, //Danh sách các phương thức đăng nhập/đăng ký.
                                ) => (
                                    <button
                                        onClick={() => handleNextForm(value)}
                                        className={cx('channel-item')}
                                        key={value.title}
                                        disabled={value.disabled}
                                    >
                                        <span className={cx('icon')}>{value.icon}</span>
                                        <p className={cx('text')}>{value.title}</p>
                                    </button>
                                ),
                            )}
                        </div>
                    </div>
                    <div className={cx('policy')}>
                        <p className={cx('text-policy')}>{items.policy}</p>
                    </div>
                </Fragment>
            )}
            <div className={cx('footer-form')}>
                {/* chuyển đổi giữa đăng nhập và đăng ký. */}
                <p className={cx('advice')}>
                    {items.titleFooter}
                    <span onClick={onChangeForm} className={cx('to')}>
                        {items.toLink}
                    </span>
                </p>
            </div>
        </div>
    );
}

export default FormPages;
