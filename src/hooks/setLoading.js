import { useDispatch } from "react-redux";
import { toggleLoading } from "../features/LoadingSlice";

export const useSetLoading = () => {
  const dispatch = useDispatch();
  return (status) => {
    dispatch(toggleLoading(status));
  };
};
