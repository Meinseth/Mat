import { useRef, useEffect } from 'react';
import styles from '../styles/styles.module.css';
interface props {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    [key: string]: unknown;
}

export default function AutoResizeTextarea({
    value,
    onChange,
    ...rest
}: props) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        const currentRef = textareaRef.current;
        if (!currentRef) return;
        currentRef.style.height = 'auto';
        currentRef.style.height = `${currentRef.scrollHeight}px`;
    }, [value]);

    return (
        <textarea
            ref={textareaRef}
            value={value}
            onChange={onChange}
            className={styles.autoRefreshTextarea}
            {...rest}
        />
    );
}
