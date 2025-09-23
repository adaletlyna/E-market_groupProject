import { Router } from 'express'
import {
  createCart,
  getOneCart,
  addItemToCart,
  removeItemFromCart,
  updateCart,
  deleteCart
} from '../controllers/cart.controller.js'

const router =Router()

router.post('/', createCart)

router.get('/:id', getOneCart)


router.put('/:id/items', addItemToCart)

router.delete('/:id/items/:itemId', removeItemFromCart)

router.put('/:id', updateCart)
router.delete('/:id', deleteCart)

export default router
