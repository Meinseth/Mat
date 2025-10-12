import { useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import { DropdownContext } from './dropdownContext';
import styles from '../../styles/styles.module.css';

interface DropdownComponent extends React.FC<{ children: ReactNode }> {
    Button: React.FC<{ children: ReactNode }>;
    Menu: React.FC<{ children: ReactNode }>;
}

export const Dropdown: DropdownComponent = ({ children }) => {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!open) return;

        const handleOutsideClick = (event: MouseEvent) => {
            if (
                dropdownRef?.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setOpen(false);
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);
        return () =>
            document.removeEventListener('mousedown', handleOutsideClick);
    }, [open]);

    return (
        <DropdownContext.Provider value={{ open, setOpen, dropdownRef }}>
            <div ref={dropdownRef} className="relative">
                {children}
            </div>
        </DropdownContext.Provider>
    );
};

Dropdown.Button = function DropdownButton({
    children,
}: {
    children: React.ReactNode;
}) {
    const { setOpen } = useContext(DropdownContext);

    return (
        <button
            onClick={() => setOpen((prev) => !prev)}
            className={styles.button}
        >
            {children}
        </button>
    );
};

Dropdown.Menu = function DropdownMenu({ children }: { children: ReactNode }) {
    const { open } = useContext(DropdownContext);

    if (!open) return null;

    return <div className={styles.dropdownMenu}>{children}</div>;
};
