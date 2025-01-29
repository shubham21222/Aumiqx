const express = require('express');
const { Content, HeroContent } = require('../models/Content'); // Adjust the path if necessary
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();


    // ----- Content APIs -----

    // Create content
    router.post('/content', authMiddleware, async (req, res) => {
    const { page, section, text, image } = req.body;
    try {
        const newContent = new Content({ page, section, text, image });
        await newContent.save();
        res.status(201).json(newContent);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create content' });
    }
    });

    // Get all content
    router.get('/content', async (req, res) => {
    try {
        const content = await Content.find();
        res.json(content);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch content' });
    }
    });

    // Update content
    router.put('/content/:id', authMiddleware, async (req, res) => {
    const { id } = req.params;
    const { page, section, text, image } = req.body;

    try {
        const updatedContent = await Content.findByIdAndUpdate(
        id,
        { page, section, text, image },
        { new: true }
        );
        res.json(updatedContent);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update content' });
    }
    });

    // Delete content
    router.delete('/content/:id', authMiddleware, async (req, res) => {
    const { id } = req.params;

    try {
        await Content.findByIdAndDelete(id);
        res.json({ message: 'Content deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete content' });
    }
    });

    // ----- Hero Content APIs -----

    // Get Hero Content
    router.get('/hero-content', async (req, res) => {
    try {
        const heroContent = await HeroContent.findOne(); // Assuming a single hero content document
        res.json(heroContent);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch hero content' });
    }
    });

    // Update Hero Content
    router.put('/hero-content', authMiddleware, async (req, res) => {
    const { title, description, users, shapeImg } = req.body;

    try {
        const updatedContent = await HeroContent.findOneAndUpdate(
        {},
        { title, description, users, shapeImg },
        { new: true, upsert: true } // `upsert: true` creates a new document if none exists
        );
        res.json(updatedContent);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update hero content' });
    }
    });

    // Create Hero Content
    router.post('/hero-content', authMiddleware, async (req, res) => {
        const { title, description, users, shapeImg } = req.body;
    
        try {
        const newHeroContent = new HeroContent({ title, description, users, shapeImg });
        await newHeroContent.save();
        res.status(201).json(newHeroContent);
        } catch (error) {
        res.status(500).json({ message: 'Failed to create hero content' });
        }
    });
    
    module.exports = router;


    router.post('/hero-content', authMiddleware, async (req, res) => {
        console.log('POST /api/hero-content hit');
        const { title, description, users, shapeImg } = req.body;
    
        try {
        const newHeroContent = new HeroContent({ title, description, users, shapeImg });
        await newHeroContent.save();
        res.status(201).json(newHeroContent);
        } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to create hero content' });
        }
    });
    