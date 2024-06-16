import { useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import { UserAuth } from '../../components/Store/AuthContext';
import Header from '~/layouts/components/Header';
import Sidebar from '../components/Sidebar';
import styles from './DefaultLayout.module.scss';
import LogOut from '../../components/Auth/LogOut';
import Login from '../../components/Auth/Login';
import AuthForm from '../../components/Auth';

const cx = classNames.bind(styles);
function DefaultLayout({ children }) {
    const { openFormLogin, openFormLogout } = UserAuth();

    useEffect(() => {
        //Dùng useEffect để điều chỉnh thuộc tính CSS overflow-y của document.body dựa trên trạng thái của các form. Nếu bất kỳ form nào mở, cuộn dọc bị vô hiệu hóa để tránh người dùng cuộn khi form đang hiển thị.
        document.body.style = openFormLogin || openFormLogout ? 'overflow-y: hidden' : 'overflow-y: overlay';
    }, [openFormLogin, openFormLogout]);

    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('container')}>
                <Sidebar />
                <div className={cx('content')}>{children}</div>
            </div>
            {(openFormLogin || openFormLogout) && ( // được hiển thị có điều kiện dựa trên trạng thái của UserAuth.
                <AuthForm>
                    {openFormLogin && <Login />}
                    {openFormLogout && <LogOut />}
                    {/* {openFormEdit && <FormUpdate />}
                    {openFormDelete && <DeleteForm />}
                    {openFormDiscard && <DiscardForm />} */}
                </AuthForm>
            )}
            {/* {openFullVideo && <FullScreen />} */}
            {/* <Notify /> */}
        </div>
    );
}
DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default DefaultLayout;
