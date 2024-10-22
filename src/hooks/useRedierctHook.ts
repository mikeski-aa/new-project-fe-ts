import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function useRedirectHook() {
  const navigate = useNavigate();
  useEffect(() => {
    return () => {};
  }, []);
}
