import { useEffect, useState, useRef } from 'react';
import { faCircleXmark, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import HeadlessTippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import search from '~/services/searchService';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import AccountItem from '~/components/AccountItem';
import { SearchIcon } from '~/components/Icons';
import { useDebounce } from '~/hooks';
import styles from './Search.module.scss';

const cx = classNames.bind(styles);

function Search() {
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);

    const debouncedValue = useDebounce(searchValue, 500);
    //lần 1 debouncedValue là chuỗi rỗng nên sẽ lọt vào trường hợp đầu tiên

    const inputRef = useRef();

    useEffect(() => {
        if (!debouncedValue.trim()) {
            setSearchResult([]); //xóa kết quả tìm kiếm
            return;
        }

        const fetchApi = async () => {
            setLoading(true);

            const result = await search.search(debouncedValue);

            setSearchResult(result);
            setLoading(false);
        }; // trước khi gọi api set là true

        fetchApi();
    }, [debouncedValue]);

    const handleClear = () => {
        setSearchValue('');
        setSearchResult([]);
        inputRef.current.focus();
    };

    const handleHideResult = () => {
        setShowResult(false);
    };

    const handleChange = (e) => {
        // hàm này để không được viết dấu cách đầu tiên trong ô tìm kiếm
        const searchValue = e.target.value;
        if (!searchValue.startsWith(' ')) {
            setSearchValue(searchValue);
        }
    };

    return (
        // Using a wrapper <div> tag around the reference element solves
        // this by creating a new parentNode context.
        <div className={cx('search-block')}>
            <HeadlessTippy
                interactive
                visible={showResult && searchResult.length > 0} //đúng 2 điều kiện mới hiện tìm kiếm
                render={(attrs) => (
                    <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                        <PopperWrapper>
                            <h4 className={cx('search-title')}>Accounts</h4>
                            {searchResult.map((result) => (
                                <AccountItem key={result.id} data={result} />
                            ))}
                        </PopperWrapper>
                    </div>
                )}
                onClickOutside={handleHideResult} //bấm ra ngoài tippy, ẩn tìm kiếm đi
            >
                <div className={cx('search')}>
                    <input
                        ref={inputRef}
                        value={searchValue}
                        placeholder="Tìm kiếm"
                        spellCheck={false}
                        onChange={handleChange}
                        onFocus={() => setShowResult(true)} // hiện tìm kiếm ra
                    />
                    {!!searchValue && //chuyển searchValue về boolen nếu có searchValue thì hiện x
                        !loading && ( // phải không có loading thì mới hiển thị
                            <button className={cx('clear')} onClick={handleClear}>
                                <FontAwesomeIcon icon={faCircleXmark} />
                            </button>
                        )}
                    {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}

                    <button className={cx('search-btn')} onMouseDown={(e) => e.preventDefault()}>
                        <SearchIcon />
                    </button>
                </div>
            </HeadlessTippy>
        </div>
    );
}

export default Search;
