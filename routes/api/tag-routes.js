const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.response(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!tagData) {
      res.status(404).json({ message: "No tag found with that ID" });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.response(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    Tag.update(
      {
        tag_name: req.body.tag_name,
      },
      {
        where: {
          id: req.params.id,
        },
      })
      .then((updatedTag) => {
        res.json(updatedTag);
      })
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const tagToDel = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });
    if (!tagToDel) {
      res.status(404).json({ message: 'No tag found' });
      return;
    }
    res.status(200).json(tagToDel);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
