import { Router } from 'express'
import {
  createCart,
  getOneCart,
  addItemToCart,
  removeItemFromCart,
  updateItemQuantity,
  deleteCart
} from '../controllers/cart.controller.js'

const router = Router()

// Create empty cart
router.post('/', createCart)

// Get cart by ID
router.get('/:id', getOneCart)

// Add product to cart
router.put('/:id/items', addItemToCart)

// Update item quantity
router.put('/:id/items/:itemId', updateItemQuantity)

// Remove an item from cart
router.delete('/:id/items/:itemId', removeItemFromCart)

// Delete whole cart
router.delete('/:id', deleteCart)

export default router
