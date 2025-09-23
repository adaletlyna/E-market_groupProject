import Cart from '../models/cart.model.js'

// Create a new cart
async function createCart(req, res) {
  try {
    const cart = await Cart.create(req.body) // saves + validates
    res.status(201).json(cart)
  } catch (error) {
    console.log(error)
    res.status(400).json(error)
  }
}

// Get one cart by ID
async function getOneCart(req, res) {
  try {
    const cart = await Cart.findById(req.params.id)
    res.json(cart)
  } catch (error) {
    console.log(error)
    res.status(400).json(error)
  }
}

// Add a product to cart
async function addItemToCart(req, res) {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.id, // cart ID
      { $push: { items: req.body } }, // add one new product
      { new: true, runValidators: true }
    )
    res.json(updatedCart)
  } catch (error) {
    console.log(error)
    res.status(400).json(error)
  }
}

// Remove a product from cart
async function removeItemFromCart(req, res) {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.id, // cart ID
      { $pull: { items: { _id: req.params.itemId } } }, // remove item by its ID
      { new: true }
    )
    res.json(updatedCart)
  } catch (error) {
    console.log(error)
    res.status(400).json(error)
  }
}

// Update entire cart (LIKE WHEN replace items or change quantities)
async function updateCart(req, res) {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
    res.json(updatedCart)
  } catch (error) {
    console.log(error)
    res.status(400).json(error)
  }
}

// Delete the whole cart
async function deleteCart(req, res) {
  try {
    const deleted = await Cart.findByIdAndDelete(req.params.id)
    res.json(deleted)
  } catch (error) {
    console.log(error)
    res.status(400).json(error)
  }
}

export {
  createCart,
  getOneCart,
  addItemToCart,
  removeItemFromCart,
  updateCart,
  deleteCart
}
