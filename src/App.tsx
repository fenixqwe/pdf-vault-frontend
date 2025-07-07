import {BrowserRouter as Router} from "react-router-dom";
import AppRouter from "@/components/AppRouter.tsx";
import {useEffect, useState} from "react";
import {useActionCreators} from "@/hooks/redux.ts";
import {userActions} from "@/store/user/slice.ts";

function App() {
    const userAction = useActionCreators(userActions);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        const auth = localStorage.getItem("auth");
        const user = localStorage.getItem("user");

        if (auth !== null) {
            userAction.changeIsAuth(auth === "true");
        }
        if (user !== null) {
            userAction.changeUser(JSON.parse(user));
        }

        setReady(true);

    }, []);

  return ready && (
    <div className="App">
      <Router>
          <AppRouter />
      </Router>
    </div>
  )
}

export default App
