import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './Button.module.scss';

const cx = classNames.bind(styles);

function Button({
    to,
    href,
    primary = false, //Gán giá trị mặc định là false cho mỗi prop giúp đảm bảo rằng nếu một prop không được truyền vào, nó sẽ không kích hoạt bất kỳ kiểu nào liên quan đến prop đó.
    outline = false, //các prop khác được gán giá trị mặc định là false để đảm bảo rằng các prop này sẽ có giá trị boolean hợp lệ ngay cả khi không được truyền vào. Điều này giúp component hoạt động đúng đắn và dễ hiểu hơn.
    text = false,
    rounded = false,
    disabled = false,
    small = false,
    large = false,
    children,
    className,
    leftIcon,
    rightIcon,
    onClick,
    ...passProps //nhận các Props thừa k lường trước đc (đa dạng các props)
}) {
    let Comp = 'button';
    const props = {
        onClick,
        ...passProps,
    };

    // Loại bỏ event listener khi button bị disabled
    if (disabled) {
        Object.keys(props).forEach((key) => {
            if (key.startsWith('on') && typeof props[key] === 'function') {
                delete props[key];
            }
        });
    }

     // Xác định component được sử dụng dựa trên prop `to` hoặc `href`
    if (to) {
        props.to = to;
        Comp = Link;
    } else if (href) {
        props.href = href;
        Comp = 'a';
    }

     // Tạo className bằng cách kết hợp các class điều kiện
    const classes = cx('wrapper', {
        [className]: className,
        primary,
        outline,
        text,
        disabled,
        rounded,
        small,
        large,
    });

    return (
        <Comp className={classes} {...props}>
            {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
            <span className={cx('title')}>{children}</span>
            {rightIcon && <span className={cx('icon')}>{rightIcon}</span>}
        </Comp>
    );
}

export default Button;
