const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products
router.get('/', async (req, res) => {
  try {
    const productData = await Product.findAll({
      include: [{ model: Category }, { model: Tag, through: ProductTag, as: 'product_to_tag' }],
    });
    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
  // find all products
  // be sure to include its associated Category and Tag data
});

// get one product
router.get('/:id', async (req, res) => {
  try {
    const productData = await Product.findByPk(req.params.id, {
      include: [{ model: Category }, { model: Tag, through: ProductTag, as: 'product_to_tag' }],
    });

    if (!productData) {
      res.status(404).json({ message: "No product found with that ID" })
    }

    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
  // find a single product by its `id`
  // be sure to include its associated Category and Tag data
});

// create new product
router.post('/', async (req, res) => {

  try {
    const product = await Product.create(req.body)
    res.status(200).json(product)
  } catch (err) {
    res.status(400).json(err)
  }
});

// update product
// router.put('/:id', async (req, res) => {
//   try {
//     const productToUpdate = await Product.update(req.body, {
//       where: {
//         id: req.params.id,
//       })
//       res.status(200).json(productToUpdate)
//   } catch (err) {
//     res.status(400).json(err)
//   }
// }
// });

router.put('/:id', async (req, res) => {
  try {
    const productToUpdate = await Product.update(req.body, {
      where: {
        id: req.params.id,
      }
    })
    res.status(200).json(productToUpdate)
  } catch (err) {
    res.status(400).json(err)
  }
})
// update product data
// .then((product) => {
//   // find all associated tags from ProductTag
//   return ProductTag.findAll({ where: { product_id: req.params.id } });
// })
// .then((productTags) => {
//   // get list of current tag_ids
//   const productTagIds = productTags.map(({ tag_id }) => tag_id);
//   // create filtered list of new tag_ids
//   const newProductTags = req.body.tagIds
//     .filter((tag_id) => !productTagIds.includes(tag_id))
//     .map((tag_id) => {
//       return {
//         product_id: req.params.id,
//         tag_id,
//       };
//     });
//   // figure out which ones to remove
//   const productTagsToRemove = productTags
//     .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
//     .map(({ id }) => id);

//   // run both actions
//   return Promise.all([
//     ProductTag.destroy({ where: { id: productTagsToRemove } }),
//     ProductTag.bulkCreate(newProductTags),
//   ]);
// })
// .then((updatedProductTags) => res.json(updatedProductTags))
// .catch((err) => {
//   console.log(err);
//   res.status(400).json(err);
// });
// });

router.delete('/:id', async (req, res) => {
  try {
    const productToDel = await Product.destroy({
      where: {
        id: req.params.id
      }
    });
    if (!productToDel) {
      res.status(404).json({ message: 'No product found' });
      return;
    }
    res.status(200).json(productToDel);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
