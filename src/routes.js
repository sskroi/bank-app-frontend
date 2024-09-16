import Auth from "./pages/Auth"
import Home from "./pages/Home"
import { HOME_ROUTE, LOGIN_ROUTE, REGISTER_ROUTE } from "./utils/consts"


export const authRotes = [

]

export const publicRoutes = [
    {
        path: HOME_ROUTE,
        Component: Home
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTER_ROUTE,
        Component: Auth
    },
]
