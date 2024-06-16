import classNames from 'classnames/bind';

import { UserAuth } from '~/components/Store/AuthContext';
import styles from './Sidebar.module.scss';
import Menu, { MenuItem } from './Menu';
import Image from '~/components/Image';
import {
    HomeIcon,
    HomeActiveIcon,
    UserGroupIcon,
    UserGroupActiveIcon,
    DiscoverIcon,
    DiscoverActiveIcon,
    LiveIcon,
    LiveActiveIcon,
} from '~/components/Icons';
import SuggestedAccounts from '~/components/SuggestedAccounts';
import config from '~/config';
import FooterSide from './FooterSide';

const cx = classNames.bind(styles);

function Sidebar() {
    const { userAuth, tokenStr } = UserAuth();

    //gọi api
    // Gọi API khi page thay đổi
    return (
        <aside className={cx('wrapper')}>
            <Menu>
                <MenuItem
                    title="Dành cho bạn"
                    to={config.routes.home}
                    icon={<HomeIcon />}
                    activeIcon={<HomeActiveIcon />}
                />
                <MenuItem
                    title="Đang Follow"
                    to={config.routes.friend}
                    icon={<UserGroupIcon />}
                    activeIcon={<UserGroupActiveIcon />}
                />
                <MenuItem
                    title="Khám phá"
                    to={config.routes.discover}
                    icon={<DiscoverIcon />}
                    activeIcon={<DiscoverActiveIcon />}
                />

                <MenuItem title="LIVE" to={config.routes.live} icon={<LiveIcon />} activeIcon={<LiveActiveIcon />} />
                <MenuItem
                    title="Hồ sơ"
                    to={config.routes.live}
                    icon={<Image className={cx('avatar-profile')} src={userAuth.avatar} />}
                    activeIcon={<LiveActiveIcon />}
                />
            </Menu>

            {userAuth && tokenStr ? <SuggestedAccounts label="Các tài khoản đang follow" /> : <h1>đăng nhập</h1>}
            <FooterSide />
        </aside>
    );
}

export default Sidebar;
