// src/routes/RouteLoader.jsx
import { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import routes from "./index";
import NotFound from "../pages/NotFound";

const Loading = () => (
    <div className="loading">Loading...</div>
);

const RouteLoader = () => (
    <Router>
        <Suspense fallback={<Loading />}>
            <Routes>
                {routes.map(({ path, component: Component }) => (
                    <Route
                        key={path}
                        path={path}
                        element={<Component />}
                    />
                ))}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Suspense>
    </Router>
);

export default RouteLoader;

/*
    Example of file-based routing:
    pages/
    ├── index.jsx          -> /
    ├── about.jsx          -> /about
    ├── users/
    │   ├── index.jsx      -> /users
    │   ├── [id].jsx       -> /users/:id
    │   └── profile.jsx    -> /users/profile
    └── blog/
        ├── index.jsx      -> /blog
        └── [slug].jsx     -> /blog/:slug
*/