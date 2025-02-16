import React, { useEffect, useState } from "react";
import { Container, Button, Alert, Spinner } from "react-bootstrap";
import { BsCart } from "react-icons/bs";

const Cart = () => {
    const [cart, setCart] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [paymentError, setPaymentError] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    // Load cart from localStorage
    useEffect(() => {
        const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
        setCart(cartItems);

        // Calculate total amount
        const total = cartItems.reduce((sum, item) => sum + item.price, 0);
        setTotalAmount(total);
    }, []);

    // Remove item from cart
    const removeFromCart = (id) => {
        const updatedCart = cart.filter((item) => item.id !== id);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        setCart(updatedCart);

        // Recalculate total amount
        const total = updatedCart.reduce((sum, item) => sum + item.price, 0);
        setTotalAmount(total);
    };

    // Simulate fake payment process
    const initiateFakePayment = () => {
        setIsProcessing(true);
        setPaymentSuccess(false);
        setPaymentError(false);

        // Simulate a payment process with a 2-second delay
        setTimeout(() => {
            const isSuccess = Math.random() > 0.5; // Randomly decide success or failure
            if (isSuccess) {
                setPaymentSuccess(true);
                setPaymentError(false);

                // Clear the cart after successful payment
                localStorage.removeItem("cart");
                setCart([]);
                setTotalAmount(0);
            } else {
                setPaymentError(true);
                setPaymentSuccess(false);
            }

            setIsProcessing(false);
        }, 2000); // 2-second delay
    };

    return (
        <Container className="mt-5">
            <h2 className="mb-4">
                <BsCart size={24} /> Your Cart
            </h2>

            {cart.length === 0 ? (
                <p>No items in your cart.</p>
            ) : (
                <>
                    {cart.map((item) => (
                        <div
                            key={item.id}
                            className="d-flex justify-content-between align-items-center mb-3 p-3 border rounded"
                        >
                            <div>
                                <h5>{item.code}</h5>
                                <p className="mb-0">
                                    {item.discount}% off on {item.platform}
                                </p>
                                <small className="text-muted">Price: ₹{item.price}</small>
                            </div>
                            <Button
                                variant="danger"
                                size="sm"
                                onClick={() => removeFromCart(item.id)}
                            >
                                Remove
                            </Button>
                        </div>
                    ))}

                    <div className="d-flex justify-content-between align-items-center mt-4">
                        <h4>Total: ₹{totalAmount}</h4>
                        <Button 
                            variant="success" 
                            onClick={initiateFakePayment}
                            disabled={isProcessing} // Disable button while processing
                        >
                            {isProcessing ? (
                                <>
                                    <Spinner
                                        as="span"
                                        animation="border"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                        className="me-2"
                                    />
                                    Processing...
                                </>
                            ) : (
                                "Proceed to Pay"
                            )}
                        </Button>
                    </div>
                </>
            )}

            {/* Payment Success/Failure Alerts */}
            {paymentSuccess && (
                <Alert variant="success" className="mt-4">
                    Payment Successful! Thank you for your purchase.
                </Alert>
            )}
            {paymentError && (
                <Alert variant="danger" className="mt-4">
                    Payment Failed. Please try again.
                </Alert>
            )}
        </Container>
    );
};

export default Cart;