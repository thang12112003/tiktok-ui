import classNames from 'classnames/bind';
import styles from './FooterSide.module.scss';

const cx = classNames.bind(styles);

function FooterSide() {
    return (
        <div className={cx('footer-page')}>
            <div className={cx('details-page')}>
                <h4>Công ty</h4>
                <span>Giới thiệu</span>
                <span>Bảng tin</span>
                <span>Liên Hệ</span>
                <span>Sự nghiệp</span>
            </div>
            <div className={cx('details-page')}>
                <h4>Chương trình</h4>
                <span>TikTok for Good</span>
                <span>Quảng cáo</span>
                <span>TikTok LIVE Creator Networks</span>
                <span>Developes</span>
                <span>Minh bạch</span>
                <span>Phàn thưởng trên TikTok</span>
                <span>TikTok Embeds</span>
            </div>
            <div className={cx('details-page')}>
                <h4>Điều khoản và chính sách</h4>
                <span>Trợ giúp</span>
                <span>An toàn</span>
                <span>Điều khoản</span>
                <span>Chính sách Quyền riêng tư</span>
                <span>Trung tâm quyền riêng tư</span>
                <span>Creator Academy</span>
                <span>Hướng dẫn Cộng đồng</span>
            </div>
            <div className={cx('details-page')}>
                <span>Thêm</span>
            </div>
            <div className={cx('details-page')}>
                <span>© 2023 TikTok</span>
            </div>
        </div>
    );
}

export default FooterSide;
