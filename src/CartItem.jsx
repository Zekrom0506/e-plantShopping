import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

    const calculateTotalAmount = () => {
        let total = 0; // Step 1: Initialize total
      
        cart.forEach((item) => {
          const price = parseFloat(item.cost.substring(1)); // Remove "$" and convert to number
          const itemTotal = price * item.quantity; // Multiply price by quantity
          total += itemTotal; // Add to total
        });
      
        return total; // Return the final total amount
      };


      const handleContinueShopping = (e) => {
        e.preventDefault(); // ✅ Optional: Prevent default link/button behavior
        onContinueShopping(e); // ✅ Call the function passed from parent
      };
      
      const handleCheckoutShopping = (e) => {
        alert('Functionality to be added for future reference');
      };


      const handleIncrement = (item) => {
        dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
      };
      

      const handleDecrement = (item) => {
        if (item.quantity > 1) {
          // Decrease quantity by 1
          dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
        } else {
          // Quantity would be 0, remove the item completely
          dispatch(removeItem(item.name));
        }
      };
      

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    // Convert "$10.00" → 10.00 (as a number)
    const unitPrice = parseFloat(item.cost.substring(1));
  
    // Multiply with quantity
    const subtotal = unitPrice * item.quantity;
  
    return subtotal;
  };
  

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
        <br />
        <button className="get-started-button1" onClick = {(e) => handleCheckoutShopping(e)}>Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;


