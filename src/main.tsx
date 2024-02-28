import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { QueryProvider } from "./lib/react-query/QueryProvider";
import AuthProvider from "./context/AuthContext";


ReactDOM.createRoot(document.getElementById("root")!).render(
    <BrowserRouter >
        <AuthProvider>
            <QueryProvider>
                <App />
            </QueryProvider>
        </AuthProvider>


    </BrowserRouter>
)
