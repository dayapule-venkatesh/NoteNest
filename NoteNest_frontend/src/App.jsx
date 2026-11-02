import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { useDispatch } from "react-redux";
import Routes from "./Routes/Routes";
import { fetchUserData } from "./Features/UserDetails";
import { fetchUserNotes } from "./Features/UserNotes";
import Toaster from "./Components/Toaster";
import ScrollProgress from "./Components/ScrollProgress";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserData());
    dispatch(fetchUserNotes());
  }, [dispatch]);

  return (
    <>
      <ScrollProgress />
      <RouterProvider router={Routes} />
      <Toaster />
    </>
  );
};

export default App;
