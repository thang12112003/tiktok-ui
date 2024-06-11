import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';

import styles from './Sidebar.module.scss';
import Menu, { MenuItem } from './Menu';
import {
    HomeIcon,
    HomeActiveIcon,
    UserFollowIcon,
    UserFollowActiveIcon,
    UserGroupIcon,
    UserGroupActiveIcon,
    DiscoverIcon,
    DiscoverActiveIcon,
    LiveIcon,
    LiveActiveIcon,
} from '~/components/Icons';
import SuggestedAccounts from '~/components/SuggestedAccounts';
import * as userService from '~/services/userService';
import config from '~/config';

const cx = classNames.bind(styles);

const INIT_PAGE = 1;
const PER_PAGE = 5;

function Sidebar() {
    const [page, setPage] = useState(INIT_PAGE);
    const [perPage, setPerPage] = useState(PER_PAGE);
    const [suggestedUsers, setSuggestedUsers] = useState([]);

    //gọi api
    // Gọi API khi page thay đổi
    useEffect(() => {
        const fetchSuggestedUsers = async () => {
            try {
                const data = await userService.getsuggested(page, perPage);
                if (data) {
                    setSuggestedUsers((prevUsers) => [...prevUsers, ...data]);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchSuggestedUsers();
    }, [page, perPage]);

    const handleSeeAll = () => {
        setPage(page + 1);
        setPerPage(10);
    };

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
                    to={config.routes.following}
                    icon={<UserFollowIcon />}
                    activeIcon={<UserFollowActiveIcon />}
                />
                <MenuItem
                    title="Bạn bè"
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
            </Menu>

            <SuggestedAccounts label="Suggested accounts" data={suggestedUsers} onSeeAll={handleSeeAll} />
            <SuggestedAccounts label="Following accounts" />
        </aside>
    );
}

export default Sidebar;
