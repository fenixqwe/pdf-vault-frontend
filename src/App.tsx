import {BrowserRouter as Router} from "react-router-dom";

import {useEffect, useState} from "react";
import {useActionCreators} from "@/hooks/redux.ts";
import {userActions} from "@/store/user/slice.ts";

import AppRouter from "@/components/AppRouter.tsx";
import {Toaster} from "@/components/ui/sonner.tsx";

function App() {
    const [ready, setReady] = useState(false);

    const userAction = useActionCreators(userActions);

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
        <Toaster />
    </div>
  )
}

export default App
