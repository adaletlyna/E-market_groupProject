import Cart from '../models/cart.model.js'

// Create a new empty cart (can be tied to user later)
async function createCart(req, res) {
  try {
    const cart = await Cart.create({ items: [] })
    res.status(201).json(cart)
  } catch (error) {
    console.log(error)
    res.status(400).json(error)
  }
}

// Get one cart by ID with product details
async function getOneCart(req, res) {
  try {
    const cart = await Cart.findById(req.params.id).populate("items.product")
    if (!cart) return res.status(404).json({ message: "Cart not found" })
    res.json(cart)
  } catch (error) {
    console.log(error)
    res.status(400).json(error)
  }
}

// Add a product (or increase quantity if exists)
async function addItemToCart(req, res) {
  try {
    const { product, quantity } = req.body
    let cart = await Cart.findById(req.params.id)

    if (!cart) return res.status(404).json({ message: "Cart not found" })

    // check if product already in cart
    const existingItem = cart.items.find(
      (item) => item.product.toString() === product
    )

    if (existingItem) {
      existingItem.quantity += quantity || 1
    } else {
      cart.items.push({ product, quantity: quantity || 1 })
    }

    await cart.save()
    cart = await cart.populate("items.product")
    res.json(cart)
  } catch (error) {
    console.log(error)
    res.status(400).json(error)
  }
}

// Remove product from cart
async function removeItemFromCart(req, res) {
  try {
    let cart = await Cart.findById(req.params.id)
    if (!cart) return res.status(404).json({ message: "Cart not found" })

    cart.items = cart.items.filter(
      (item) => item._id.toString() !== req.params.itemId
    )

    await cart.save()
    cart = await cart.populate("items.product")
    res.json(cart)
  } catch (error) {
    console.log(error)
    res.status(400).json(error)
  }
}

// Update quantity of an item
async function updateItemQuantity(req, res) {
  try {
    const { quantity } = req.body
    let cart = await Cart.findById(req.params.id)

    if (!cart) return res.status(404).json({ message: "Cart not found" })

    const item = cart.items.id(req.params.itemId)
    if (!item) return res.status(404).json({ message: "Item not found" })

    item.quantity = quantity
    await cart.save()
    cart = await cart.populate("items.product")

    res.json(cart)
  } catch (error) {
    console.log(error)
    res.status(400).json(error)
  }
}

// Delete entire cart
async function deleteCart(req, res) {
  try {
    const deleted = await Cart.findByIdAndDelete(req.params.id)
    if (!deleted) return res.status(404).json({ message: "Cart not found" })
    res.json({ message: "Cart deleted successfully" })
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
  updateItemQuantity,
  deleteCart
}
