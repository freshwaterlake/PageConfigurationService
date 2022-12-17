const express = require('express');
const pageConfigRoute = require('./page-config.route');
const appConfigRoute = require('./app-config.route');
const dataLoaderRoute = require('./data-loader.route');
const docsRoute = require('./docs.route');
const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [
    { path: '/pageConfig', route: pageConfigRoute },
    { path: '/appConfig', route: appConfigRoute },
    { path: '/dataLoader', route: dataLoaderRoute },
];

// routes available only in development mode
const devRoutes = [{ path: '/docs', route: docsRoute }];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

if (config.env === 'development') {
    devRoutes.forEach((route) => router.use(route.path, route.route));
}

module.exports = router;
