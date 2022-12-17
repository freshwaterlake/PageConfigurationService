const express = require('express');
const pageConfigRoute = require('./page-config.route');
const activityConfigRoute = require('./activity-config.route');
const docsRoute = require('./docs.route');
const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [{ path: '/pageConfig', route: pageConfigRoute }];

// routes available only in development mode
const devRoutes = [{ path: '/docs', route: docsRoute }];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

if (config.env === 'development') {
    devRoutes.forEach((route) => router.use(route.path, route.route));
}

module.exports = router;
