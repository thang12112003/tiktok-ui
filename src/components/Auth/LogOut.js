import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Auth.module.scss';

import { UserAuth } from '../Store/AuthContext';
import Button from '../Button';
import { Wrapper } from '../Popper';
import config from '~/services';
import { UserNotify } from '~/components/Store';

const cx = classNames.bind(styles);

function LogOut() {
    const navigate = useNavigate(); //để điều hướng khi người dùng đăng xuất.

    const { tokenStr, setOpenFormLogout } = UserAuth(); //để lấy token hiện tại và trạng thái mở form đăng xuất.
    const { setInfoNotify } = UserNotify(); //để thiết lập thông báo cho người dùng.

    const handleCloseForm = () => {
        // Đóng form đăng xuất khi người dùng nhấn nút "Hủy".
        setOpenFormLogout(false);
    };

    const handleLogout = async () => {
        const data = await config.logout(tokenStr); //Gọi hàm logout từ config để đăng xuất người dùng, sau đó kiểm tra kết quả:

        if (data.errorCode) {
            setInfoNotify({
                content: 'Logout failed. Try again later!',
                delay: 1500,
                isNotify: true,
            });
            setOpenFormLogout(false);
        } else {
            setInfoNotify({
                //Nếu thành công, thông báo thành công và sau một khoảng thời gian ngắn,
                content: 'Logout successfully!',
                delay: 1500,
                isNotify: true,
            });

            setTimeout(() => {
                //xóa dữ liệu người dùng khỏi localStorage, điều hướng về trang chủ và tải lại trang.
                localStorage.removeItem('user-id');
                localStorage.removeItem('token');

                navigate('/');
                window.location.reload();
            }, [300]);
        }
    };

    return (
        <div className={cx('form-container')}>
            <Wrapper className={cx('form-logout')}>
                <div className={cx('logout-content')}>
                    <h1 className={cx('title-logout')}>Bạn có chắc chắn muốn đăng xuất?</h1>
                    <div className={cx('btn-primary')}>
                        <Button onClick={handleCloseForm} className={cx('btn-form-logout')} large outline>
                            Hủy
                        </Button>
                        <Button
                            onClick={handleLogout}
                            className={cx('btn-form-logout', {
                                'logout-btn': true,
                            })}
                            large
                            outline
                        >
                            Đăng xuất
                        </Button>
                    </div>
                </div>
            </Wrapper>
        </div>
    );
}

export default LogOut;
