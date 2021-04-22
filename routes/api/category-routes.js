const router = require('express').Router();
const { Category, Product } = require('../../models');


router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll();
    if (!categories) {
      res.status(404).json({ message: 'No categories found' });
      return;
    }
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    console.log(category);
    if (!category) {
      res.status(404).json({ message: 'No category found' });
      return;
    }
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    Category.update(
      {
        category_name: req.body.category_name,
      },
      {
        where: {
          id: req.params.id,
        },
      })
      .then((updatedCategory) => {
        res.json(updatedCategory);
      })
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const categoryToDel = await Category.destroy({
      where: {
        id: req.params.id
      }
    });
    if (!categoryToDel) {
      res.status(404).json({ message: 'No category found' });
      return;
    }
    res.status(200).json(categoryToDel);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
