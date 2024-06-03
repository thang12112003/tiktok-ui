import { useState, forwardRef } from 'react';
import classNames from 'classnames';
import images from '~/assets/images';
import styles from './Image.module.scss';

//fallback: customFallback = images.noImage
// được sử dụng để thiết lập một giá trị mặc định cho thuộc tính nếu không có giá trị nào khác được truyền vào. Đây là một tính năng của ES6, cho phép bạn thiết lập các giá trị mặc định cho các tham số hàm hoặc thuộc tính của đối tượng.
const Image = forwardRef(({ src, alt, className, fallback: customFallback = images.noImage, ...props }, ref) => {
    const [fallback, setFallback] = useState('');

    const handleError = () => {
        setFallback(customFallback);
    };

    return (
        <img
            className={classNames(styles.wrapper, className)}
            ref={ref}
            src={fallback || src}
            alt={alt}
            {...props}
            onError={handleError}
        />
    );
});

export default Image;
