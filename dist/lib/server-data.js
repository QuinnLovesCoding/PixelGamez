"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllGames = getAllGames;
exports.getGameById = getGameById;
exports.getGamesByCategory = getGamesByCategory;
const prisma_1 = require("./prisma");
async function getAllGames() {
    const games = await prisma_1.prisma.game.findMany({
        orderBy: { createdAt: 'desc' }
    });
    return games.map(g => {
        var _a;
        return (Object.assign(Object.assign({}, g), { createdAt: (_a = g.createdAt) === null || _a === void 0 ? void 0 : _a.toISOString() }));
    });
}
async function getGameById(id) {
    var _a;
    const g = await prisma_1.prisma.game.findUnique({ where: { id } });
    if (!g)
        return undefined;
    return Object.assign(Object.assign({}, g), { createdAt: (_a = g.createdAt) === null || _a === void 0 ? void 0 : _a.toISOString() });
}
async function getGamesByCategory(categoryId) {
    const games = await prisma_1.prisma.game.findMany({
        where: { category: categoryId },
        orderBy: { createdAt: 'desc' }
    });
    return games.map(g => {
        var _a;
        return (Object.assign(Object.assign({}, g), { createdAt: (_a = g.createdAt) === null || _a === void 0 ? void 0 : _a.toISOString() }));
    });
}
