import styles from './Header.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);
function Header() {
    return (
        <h2 className={cx('wrapper')}>
            <div className={cx('inner')}>
                {/* logo*/}
                {/* search*/}
            </div>
        </h2>
    );
}

export default Header;
