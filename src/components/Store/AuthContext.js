import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';

const AuthContext = React.createContext();

export function UserAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [isFollowed, setIsFollowed] = useState(false);
    const [openFormLogin, setOpenFormLogin] = useState(false);
    const [openFormLogout, setOpenFormLogout] = useState(false);
    const [openFormEdit, setOpenFormEdit] = useState(false);
    const [openFullVideo, setOpenFullVideo] = useState(false);
    const [openFormDelete, setOpenFormDelete] = useState(false);
    const [openFormDiscard, setOpenFormDiscard] = useState(false);
    const [dataForm, setDataForm] = useState({});

    const tokenStr = JSON.parse(localStorage.getItem('token')) ?? '';//Token xác thực, lấy từ localStorage.
    const userAuth = JSON.parse(localStorage.getItem('user-id')) ?? '';// ID của người dùng đã đăng nhập, cũng lấy từ localStorage.

    const value = {// Một object chứa tất cả các state và setter functions, sẽ được cung cấp cho AuthContext
        isFollowed,
        setIsFollowed,
        openFormLogin,
        setOpenFormLogin,
        openFormLogout,
        setOpenFormLogout,
        openFormEdit,
        setOpenFormEdit,
        openFullVideo,
        setOpenFullVideo,
        openFormDelete,
        setOpenFormDelete,
        tokenStr,
        userAuth,
        dataForm,
        setDataForm,
        openFormDiscard,
        setOpenFormDiscard,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;// Cung cấp giá trị value cho AuthContext. Bất kỳ component nào được bao bọc bởi AuthProvider đều có thể truy cập các giá trị này.
}

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
