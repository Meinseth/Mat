import { useContext, useState, type ReactNode } from "react";
import { DropdownContext } from "./dropdownContext";
import styles from "../../styles/styles.module.css";

interface DropdownComponent extends React.FC<{ children: ReactNode }> {
  Button: React.FC<{ children: ReactNode }>;
}

export const Dropdown: DropdownComponent = ({ children }) => {
  const [open, setOpen] = useState(false);
  return (
    <DropdownContext.Provider value={{ open, setOpen }}>
      <div className="relative">{children}</div>
    </DropdownContext.Provider>
  );
};

Dropdown.Button = function DropdownButton({
  children,
}: {
  children: React.ReactNode;
}) {
  const { open, setOpen } = useContext(DropdownContext);

  function toggleOpen() {
    setOpen(!open);
  }

  return (
    <button onClick={toggleOpen} className={styles.button}>
      {children}
    </button>
  );
};
