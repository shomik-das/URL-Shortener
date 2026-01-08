const Url = require('../models/Url');
const generateShortCode = require('../utils/generateShortCode');

const urlController = {
    shortenUrl: async (req, res) => {
        try {
            const { originalUrl } = req.body;
            const userId = req.user.id;

            const urlCount = await Url.countDocuments({ userId });

            if (urlCount >= 100) {
                return res.status(403).json({
                    success: false,
                    message: "Free limit reached. Upgrade to continue.",
                });
            }

            let shortCode;
            let exists = true;

            while (exists) {
                shortCode = generateShortCode();
                exists = await Url.findOne({ shortCode });
            }

            const url = await Url.create({
                originalUrl,
                shortCode,
                userId,
            });

            res.status(201).json({
                success: true,
                url,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Failed to shorten URL",
            });
        }
    },

    getMyUrls: async (req, res) => {
        try {
            const urls = await Url.find({ userId: req.user.id }).sort({ createdAt: -1 });
            res.status(200).json({
                success: true,
                urls,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Failed to fetch URLs",
            });
        }
    },

    deleteUrl: async (req, res) => {
        try {
            await Url.findOneAndDelete({
                _id: req.params.id,
                userId: req.user.id,
            });

            res.status(200).json({
                success: true,
                message: "URL deleted",
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Delete failed",
            });
        }
    },

    redirect: async (req, res) => {
        try {
            const { shortCode } = req.params;

            const url = await Url.findOne({ shortCode });

            if (!url) {
                return res.status(404).json({
                    success: false,
                    message: "URL not found",
                });
            }

            url.clicks += 1;
            await url.save();

            res.redirect(url.originalUrl);
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Redirection failed",
            });
        }
    }
};

module.exports = urlController;
