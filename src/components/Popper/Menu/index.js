import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';

import { Wrapper as PopperWrapper } from '~/components/Popper';
import MenuItem from './MenuItem';
import Header from './Header';
import styles from './Menu.module.scss';
import { useState } from 'react';

const cx = classNames.bind(styles);

const defaultFn = () => {};

function Menu({ children, items = [], hideOnClick = false, onChange = defaultFn }) {
    const [history, setHistory] = useState([{ data: items }]); //Khởi tạo trạng thái history như một mảng chứa một đối tượng ban đầu với dữ liệu là các mục của menu (items). Mỗi lần người dùng di chuyển vào một menu con, một đối tượng mới sẽ được thêm vào mảng này.
    const current = history[history.length - 1];

    const renderItems = () => {
        //Hàm renderItems được định nghĩa bên ngoài JSX để tách biệt logic tạo các phần tử danh sách với cấu trúc giao diện. Điều này giúp mã nguồn trở nên gọn gàng và dễ đọc hơn.
        return current.data.map((item, index) => {
            // truyền data cho MenuItem
            const isParent = !!item.children; //chuyển sang boolen

            return (
                <MenuItem
                    key={index}
                    data={item}
                    onClick={() => {
                        if (isParent) {
                            setHistory((prev) => [...prev, item.children]);
                        } else {
                            onChange(item);
                        }
                    }}
                />
            );
        });
    };

    return (
        <Tippy
            interactive
            delay={[0, 700]} // 0 là show luôn còn 700 mm giây sẽ ẩn đi
            offset={[12, 8]}
            hideOnClick={hideOnClick}
            placement="bottom-end"
            render={(attrs) => (
                <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
                    <PopperWrapper className={cx('menu-popper')}>
                        {history.length > 1 && ( //Nếu history.length > 1, nghĩa là người dùng đang trong một menu con (không phải menu gốc), nút quay lại sẽ được hiển thị. nếu là gốc sẽ không hiện header
                            <Header
                                title={current.title}
                                onBack={() => {
                                    setHistory((prev) => prev.slice(0, -1)); //prev.slice(0, -1) trả về một mảng mới chứa tất cả các phần tử của prev, ngoại trừ phần tử cuối cùng. Điều này có nghĩa là trạng thái history sẽ được cập nhật để loại bỏ menu con hiện tại và quay lại menu trước đó.
                                }}
                            />
                        )}
                        <div className={cx('menu-body')}>{renderItems()}</div>
                    </PopperWrapper>
                </div>
            )}
            onHide={() => setHistory((prev) => prev.slice(0, 1))}
        >
            {children}
        </Tippy>
    );
    //{renderItems()} trong JSX sẽ gọi hàm renderItems và chèn kết quả (một mảng các phần tử MenuItem) vào trong PopperWrapper. Điều này giúp các phần tử MenuItem được render chính xác bên trong thành phần Tippy.
}
Menu.propTypes = {
    children: PropTypes.node.isRequired,
    items: PropTypes.array,
    hideOnClick: PropTypes.bool,
    onChange: PropTypes.func,
};

export default Menu;
