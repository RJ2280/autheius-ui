import { Router } from 'express';
import { getDriver } from '../db.js';

const router = Router();
const driver = getDriver();

/**
 * @route   GET /api/users/:userId/progress
 * @desc    Get all completed lesson IDs for a user
 * @access  Public
 */
router.get('/:userId/progress', async (req, res) => {
  const { userId } = req.params;
  const session = driver.session();
  try {
    const result = await session.run(
      'MATCH (:User {id: $userId})-[:COMPLETED]->(l:Lesson) RETURN l.id AS lessonId',
      { userId }
    );
    const completedLessonIds = result.records.map(record => record.get('lessonId'));
    res.json({ completedLessonIds });
  } catch (error) {
    console.error(`Error fetching progress for user ${userId}:`, error);
    res.status(500).json({ error: 'Failed to fetch user progress' });
  } finally {
    await session.close();
  }
});

export default router;