import classNames from 'classnames/bind';
import styles from './Auth.module.scss';

import { UserAuth } from '../Store';
import { Wrapper } from '../Popper';
import Button from '../Button';

const cx = classNames.bind(styles);

function DeleteForm() {
    const { setOpenFormDelete, dataForm } = UserAuth(); // Sử dụng hook,UserAuth để truy cập:
    // setOpenFormDelete: Một hàm để đóng modal xóa.
    // dataForm: Một object chứa thông tin về modal xóa, có thể bao gồm tiêu đề và hàm xử lý khi xóa.

    const handleCloseForm = () => {//Hàm này được gọi khi người dùng muốn đóng modal mà không thực hiện hành động xóa. Nó gọi setOpenFormDelete(false) để ẩn modal.
        setOpenFormDelete(false);
    };
    return (
        <div className={cx('form-wrapper')}>
            <section className={cx('section-content')}>
                <Wrapper className={cx('modal-form')}>
                    <h1 className={cx('title')}>{dataForm.title}</h1>
                    <div className={cx('container-btn')}>
                        <Button onClick={() => dataForm.handle()} className={cx('btn-form-delete')}>
                            Delete
                        </Button>
                        <Button onClick={handleCloseForm} className={cx('btn-form-delete')}>
                            Cancle
                        </Button>
                    </div>
                </Wrapper>
            </section>
        </div>
    );
}

export default DeleteForm;
