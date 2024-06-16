import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';

const NotifyContext = React.createContext();

export function UserNotify() {
    return useContext(NotifyContext);//Một hook tùy chỉnh để truy cập giá trị của NotifyContext từ bất kỳ component nào cần nó. Component con có thể sử dụng hook này để lấy và cập nhật thông tin thông báo.
}

export function NotifyProvider({ children }) {
    const [infoNotify, setInfoNotify] = useState({
        content: '',
        delay: 3000,
        isNotify: false,
    });

    const values = { infoNotify, setInfoNotify };

    return <NotifyContext.Provider value={values}>{children}</NotifyContext.Provider>;
}

NotifyProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
