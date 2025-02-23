import fs from "fs";
import path from "path";

const autoLoadRoutes = (app) => {
    const routesDirectory = path.resolve("src/routes");

    fs.readdirSync(routesDirectory).forEach((file) => {
        if (file.endsWith(".js")) {
            import(`../routes/${file}`)
                .then((route) => {
                    console.log(`✅ Loaded route: ${file}`);
                    app.use("/api", route.default);
                })
                .catch((err) => {
                    console.error(`❌ Failed to load route: ${file}`, err);
                });
        }
    });
};

export default autoLoadRoutes;
