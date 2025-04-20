const express = require('express');
const router = express.Router();

const userRoutes = require('./userRoutes');
const challengeRoutes = require('./challengeRoutes');
const characterRoutes = require('./characterRoutes');
const petRoutes = require('./petRoutes');
const inventoryRoutes = require('./inventoryRoutes');
const factionRoutes = require('./factionRoutes');
const marketRoutes = require('./marketRoutes');
const dungeonRoutes = require('./dungeonRoutes');;
const classRoutes = require('./classRoutes')

router.use("/users", userRoutes);
router.use("/challenges", challengeRoutes);
router.use("/characters", characterRoutes);
router.use("/pets", petRoutes);
router.use("/inventory", inventoryRoutes);
router.use("/factions", factionRoutes);
router.use("/market", marketRoutes);
router.use("/dungeons", dungeonRoutes);
router.use("/classes", classRoutes);

module.exports = router;