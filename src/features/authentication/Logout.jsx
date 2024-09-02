import { HiArrowLeftEndOnRectangle } from "react-icons/hi2";
import ButtonIcon from "../../ui/ButtonIcon";
import SpinnerMini from "../../ui/SpinnerMini";
import { useLogout } from "./useLogout";
function Logout() {
  const { logout, isLoading } = useLogout();

  function handelLogout() {
    logout();
  }

  return (
    <ButtonIcon disabled={isLoading} onClick={handelLogout}>
      {isLoading ? <SpinnerMini /> : <HiArrowLeftEndOnRectangle />}
    </ButtonIcon>
  );
}

export default Logout;
