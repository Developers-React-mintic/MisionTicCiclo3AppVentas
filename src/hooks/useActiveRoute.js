import { useState, useEffect } from "react";
import { useLocation } from "react-router";

const useActiveRoute = ({ ruta }) => {
  const location = useLocation();
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (location.pathname.includes(ruta)) {
      setIsActive(true);
      console.log(location, ruta);
    } else {
      setIsActive(false);
      console.log(location, ruta);
      console.log("no sirve");
    }
  }, [location, ruta]);

  return isActive;
};

export default useActiveRoute;
