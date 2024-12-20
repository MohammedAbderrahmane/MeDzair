import { createStore } from "solid-js/store";
import { createContext } from "solid-js";

const UserContext = createContext();

const UserProvider = (params) => {
  const [user, setUser] = createStore(null);
  return (
    <UserContext.Provider value={[user, setUser]}>
      {params.children}
    </UserContext.Provider>
  );
};



export { UserProvider };
export default UserContext;
