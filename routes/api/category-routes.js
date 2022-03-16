const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint



router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findAll({
      include: {
        model: Product,
        attributes: ['product_name', 'price', 'stock']
      }
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err)
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const newCategory = await Category.create(req.body);
    res.status(200).json(newCategory)
  } catch(err) {
    res.status(400).json(err)
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryById = await Category.findByPk(req.params.id, {
      include: {
        model: Product,
        attributes: ['product_name', 'price', 'stock']
      }
      
    });
    res.status(200).json(categoryById);
  } catch (err) {
    res.status(500).json({ message: 'No location found with this id!' });
  }
});



router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const updateCategory = await Category.update(req.body, {
      where: {
        id: req.params.id
      }
    });
    res.status(200).json(updateCategory)
  } catch(err) {
    res.status(500).json(err)
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deleteCategory = await Category.destroy({
      where: {
        id: req.params.id
      }
    });
    res.status(200).json(deleteCategory)
  } catch(err) {
    res.status(500).json(err)
  }
});


module.exports = router;
                                                  