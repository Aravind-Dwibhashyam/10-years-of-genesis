import React from 'react';
import { ExternalLink, X } from 'lucide-react';
import './BuyNow.css';

const BuyNowModal = ({ product, isOpen, onClose }) => {
    if (!isOpen || !product) return null;

    return (
        <div className="modal-overlay">
            <div
                className="modal-container"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="modal-close-button-wrapper">
                    <button
                        onClick={onClose}
                        className="modal-close-button"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="modal-content">
                    <div className="modal-product">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="product-image"
                        />
                        <div>
                            <h3 className="product-name">{product.name}</h3>
                            <p className="product-price">${product.price}</p>
                        </div>
                    </div>

                    <div className="modal-description">
                        <h4 className="description-title">Complete Your Purchase</h4>
                        <p className="description-text">
                            To purchase this item, please complete your order details in our Google Form. You'll be able to specify size, color, and shipping information.
                        </p>
                    </div>

                    <a
                        href="#"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="order-button"
                    >
                        <span className="order-button-content">
                            Continue to Order Form
                            <ExternalLink size={16} className="order-button-icon" />
                        </span>
                    </a>

                    <p className="redirect-note">
                        You'll be redirected to a secure Google Form to complete your purchase
                    </p>
                </div>
            </div>
        </div>
    );
};

export default BuyNowModal;
