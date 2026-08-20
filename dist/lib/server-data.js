"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllGames = getAllGames;
exports.getGameById = getGameById;
exports.getGamesByCategory = getGamesByCategory;
const prisma_1 = require("./prisma");
const cache_1 = require("./cache");
async function getAllGames() {
    return (0, cache_1.fetchWithCache)('games:all', async () => {
        const games = await prisma_1.prisma.game.findMany({
            orderBy: { createdAt: 'desc' }
        });
        return games.map(g => {
            var _a;
            return (Object.assign(Object.assign({}, g), { createdAt: (_a = g.createdAt) === null || _a === void 0 ? void 0 : _a.toISOString() }));
        });
    }, 5); // Cache for 5 mins
}
async function getGameById(id) {
    return (0, cache_1.fetchWithCache)(`games:id:${id}`, async () => {
        var _a;
        const g = await prisma_1.prisma.game.findUnique({ where: { id } });
        if (!g)
            return undefined;
        return Object.assign(Object.assign({}, g), { createdAt: (_a = g.createdAt) === null || _a === void 0 ? void 0 : _a.toISOString() });
    }, 5);
}
async function getGamesByCategory(categoryId) {
    return (0, cache_1.fetchWithCache)(`games:cat:${categoryId}`, async () => {
        const games = await prisma_1.prisma.game.findMany({
            where: { category: categoryId },
            orderBy: { createdAt: 'desc' }
        });
        return games.map(g => {
            var _a;
            return (Object.assign(Object.assign({}, g), { createdAt: (_a = g.createdAt) === null || _a === void 0 ? void 0 : _a.toISOString() }));
        });
    }, 5);
}
