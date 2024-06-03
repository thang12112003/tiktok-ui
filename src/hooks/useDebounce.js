import { useState, useEffect } from 'react';

function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);//useState(value) chỉ truyền vào đầu tiên k chuyền lần 2

    useEffect(() => {
        const handler = setTimeout(() => setDebouncedValue(value), delay);//mất 500 mms để setDebouncedValue

        return () => clearTimeout(handler);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);//value thay đổi sẽ chạy  useEffect, nếu gõ lên tục thì hàm này sẽ liên tục chạy và không làm gì trong 500mms mới setDebouncedValue(value)

    return debouncedValue;
}

export default useDebounce;
