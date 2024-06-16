import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import styles from './FormPages.module.scss';

import { HidePassIcon, ShowPassIcon } from '~/components/Icons';
import { UserNotify } from '~/components/Store';
import Button from '~/components/Button';
import config from '~/services';

const cx = classNames.bind(styles);

function LoginWithDefault() {
    const [disabledSubmitted, setDisabledSubmited] = useState(false); //Kiểm soát việc có thể submit form hay không.
    const [valueAccount, setValueAccount] = useState(''); // Lưu trữ giá trị nhập vào.
    const [valuePassword, setValuePassword] = useState('');
    const [showPass, setShowPass] = useState(false); //Kiểm soát việc hiển thị/ẩn mật khẩu.
    const [isLoading, setIsLoading] = useState(false); // Hiển thị trạng thái đang xử lý khi đăng nhập.

    const { setInfoNotify } = UserNotify(); // Sử dụng context để quản lý thông báo.

    const handleChangeValueAccount = (e) => {
        //Cập nhật state khi nhập liệu, ngăn chặn khoảng trắng ở đầu.
        if (e.target.value.startsWith(' ')) {
            return;
        }

        setValueAccount(e.target.value);
    };

    const handleChangeValuePassword = (e) => {
        if (e.target.value.startsWith(' ')) {
            return;
        }

        setValuePassword(e.target.value);
    };

    const handleShowPass = () => {
        //Chuyển đổi hiển thị/ẩn mật khẩu.
        setShowPass(!showPass);
    };

    const handleLogin = async (e) => {
        //Xử lý đăng nhập
        e.preventDefault();
        setIsLoading(true);

        const data = await config.login(valueAccount, valuePassword); //lấy api

        if (data.errCode) {
            //nếu sai
            setInfoNotify({
                content: 'Login failed. Try again later',
                delay: 1500,
                isNotify: true,
            });

            setTimeout(() => {
                setIsLoading(false);
            }, [300]);
        } else {
            //Hiển thị thông báo thành công.
            setInfoNotify({
                content: 'Login successfull',
                delay: 1500,
                isNotify: true,
            });

            localStorage.setItem('user-id', JSON.stringify(data.data)); // Lưu ID người dùng và token vào localStorage.
            localStorage.setItem('token', JSON.stringify(`Bearer ${data.meta.token}`));

            setTimeout(() => {
                //tải lại wed
                setIsLoading(false);
                window.location.reload();
            }, [300]);
        }
    };

    useEffect(() => {
        //Kiểm tra xem nhập gì chưa, chưa thì Disabled Submit
        if (valueAccount.length === 0 || valuePassword.length === 0) {
            setDisabledSubmited(true);
        } else {
            setDisabledSubmited(false);
        }
    }, [valueAccount, valuePassword]);

    return (
        <form action="" method="POST" className={cx('login-inner')}>
            <h1 className={cx('title')}>Log in</h1>
            <div className={cx('form')}>
                <div className={cx('des-form')}>
                    <p className={cx('type')}>Điện thoại</p>
                    <span className={cx('link')}>Đăng nhập bằng email hoặc TikTok ID</span>
                </div>
                <div className={cx('container-form')}>
                    <div className={cx('form-input')}>
                        <input
                            value={valueAccount}
                            onChange={handleChangeValueAccount}
                            type="text"
                            placeholder="Phone Number"
                        />
                    </div>
                </div>
                <div className={cx('container-form')}>
                    <div className={cx('form-input')}>
                        <input
                            value={valuePassword}
                            onChange={handleChangeValuePassword}
                            type={showPass ? 'text' : 'password'} //showPass
                            placeholder="Password"
                            autoComplete="on"
                        />
                        <div className={cx('control-pass')} onClick={handleShowPass}>
                            {showPass ? <ShowPassIcon /> : <HidePassIcon />}
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx('forgot')}>
                <span>Forgot password?</span>
            </div>
            <Button
                className={cx('btn-submit')}
                onClick={handleLogin}
                disabled={disabledSubmitted ? true : false}
                type="submit"
                primary
                large
            >
                {isLoading ? <FontAwesomeIcon className={cx('loading')} icon={faSpinner} /> : <span>Log in</span>}
            </Button>
        </form>
    );
}

export default LoginWithDefault;
