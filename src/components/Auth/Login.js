import classNames from 'classnames/bind';
import styles from './Auth.module.scss';

import { Wrapper } from '../Popper';
import FormPages from './FormPages/FormPages';
import { CloseTabs } from '../Control';
import { UserAuth } from '../Store/AuthContext';


const cx = classNames.bind(styles);

function Login() {
    const { setOpenFormLogin } = UserAuth(); // một hàm để thay đổi trạng thái mở/đóng của form đăng nhập.

    const handleCloseForm = () => {
        //Hàm để đóng form đăng nhập khi người dùng click vào nút đóng.
        setOpenFormLogin(false);
    };

    return (
        <div className={cx('form-wrapper')}>
            <Wrapper className={cx('form')}>
                <div className={cx('tab-control')}>
                    <CloseTabs className={cx('close-btn')} onClick={handleCloseForm} />
                </div>
                <FormPages />
            </Wrapper>
        </div>
    );
}

export default Login;
