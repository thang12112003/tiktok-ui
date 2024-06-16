import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';

const VideoContext = React.createContext();//Context là một cách để truyền dữ liệu từ một component cha xuống các component con mà không cần phải truyền props qua nhiều cấp. Đây là một kỹ thuật rất hữu ích trong việc quản lý state trong ứng dụng React.

export function UserVideo() {//Đây là một hook được tạo ra để truy cập giá trị của VideoContext. Bất kỳ component nào cần truy cập dữ liệu từ VideoContext đều có thể sử dụng hook UserVideo().
    return useContext(VideoContext);
}

export function VideoProvider({ children }) {//VideoProvider là một component React, nó sẽ cung cấp dữ liệu cho các component con bên trong nó thông qua VideoContext.
    const [idVideo, setIdVideo] = useState();
    const [listVideos, setListVideos] = useState([]);
    const [listVideoHome, setListVideoHome] = useState([]);
    const [profileUser, setProfileUser] = useState({});
    const [positionVideo, setPositionVideo] = useState(null);
    const [valueVolume, setValueVolume] = useState(0);
    const [mutedVideo, setMutedVideo] = useState(true);
    const [likeVideo, setLikeVideo] = useState(false);
    const [likesCount, setLikesCount] = useState(false);
    const [followUser, setFollowUser] = useState(false);

    const value = {
        listVideos,
        setListVideos,
        listVideoHome,
        setListVideoHome,
        positionVideo,
        setPositionVideo,
        idVideo,
        setIdVideo,
        mutedVideo,
        setMutedVideo,
        valueVolume,
        setValueVolume,
        likeVideo,
        setLikeVideo,
        likesCount,
        setLikesCount,
        followUser,
        setFollowUser,
        profileUser,
        setProfileUser,
    };

    return <VideoContext.Provider value={value}>{children}</VideoContext.Provider>;
}

VideoProvider.propTypes = {
    children: PropTypes.node.isRequired,
};