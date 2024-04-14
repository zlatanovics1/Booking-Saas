import { useDarkMode } from "../context/DarkModeProvider";
import ButtonIcon from "./ButtonIcon";
import { HiOutlineMoon } from "react-icons/hi2";
import { HiOutlineSun } from "react-icons/hi2";

function DarkModeToggle() {
  const { isDarkMode, handleToggleDarkMode } = useDarkMode();
  return (
    <ButtonIcon onClick={handleToggleDarkMode}>
      {isDarkMode ? <HiOutlineMoon /> : <HiOutlineSun />}
    </ButtonIcon>
  );
}

export default DarkModeToggle;
