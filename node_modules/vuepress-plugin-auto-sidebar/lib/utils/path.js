"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.padWithSlash = (path) => `${path.startsWith('/') ? '' : '/'}${path}${path.endsWith('/') ? '' : '/'}`;
exports.getMenuPath = (path) => exports.padWithSlash(path.split('/').slice(0, -1).join('/'));
exports.filterRootMarkdowns = (page) => page.menuPath !== '//';
