import { createContext, useContext, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { HiEllipsisVertical } from "react-icons/hi2";
import styled from "styled-components";

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul`
  position: fixed;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

const MenusContext = createContext();

function Menus({ children }) {
  const [openID, setOpenID] = useState();
  const [position, setPosition] = useState({});
  const listEl = useRef();

  return (
    <MenusContext.Provider
      value={{ openID, setOpenID, setPosition, position, listEl }}
    >
      {children}
    </MenusContext.Provider>
  );
}

function Toggle({ id }) {
  const { setOpenID, openID, setPosition } = useContext(MenusContext);

  function handelClick(e) {
    const rect = e.target.closest("button").getBoundingClientRect();
    const x = (window.innerWidth - rect.width - rect.x) * 1.5;
    const y = rect.y - 8;

    setPosition({ x, y });

    if (openID === "" || openID !== id) setOpenID(id);
    else setOpenID("");
  }

  return (
    <StyledToggle onClick={handelClick}>
      <HiEllipsisVertical />
    </StyledToggle>
  );
}

function List({ children, id }) {
  const { openID, position, setOpenID, listEl } = useContext(MenusContext);

  useEffect(() => {
    function handelClick(e) {
      if (
        listEl.current &&
        !listEl.current.contains(e.target) &&
        e.target.tagName.toLowerCase() !== "svg"
      ) {
        setOpenID("");
      }
    }

    document.addEventListener("click", handelClick);
    return () => document.removeEventListener("click", handelClick);
  }, [listEl, setOpenID]);

  if (openID !== id) return null;

  return createPortal(
    <StyledList ref={listEl} position={position}>
      {children}
    </StyledList>,
    document.body
  );
}

function Button({ children, icon, onClick }) {
  const { setOpenID } = useContext(MenusContext);

  function handleClick() {
    onClick?.();
    setOpenID("");
  }

  return (
    <li>
      <StyledButton onClick={handleClick}>
        {icon}
        <span>{children}</span>
      </StyledButton>
    </li>
  );
}

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
