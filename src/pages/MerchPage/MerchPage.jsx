import React, { useState } from 'react'
import './MerchPage.css';
import SizeChart from '../../components/SizeChart';
import BuyNowModal from '../../components/BuyNow';
import { RulerIcon } from 'lucide-react';
import Merch1 from '../../assets/merch1.png';
import Merch2 from '../../assets/merch2.png';
import Merch3 from '../../assets/merch3.png';
import Merch4 from '../../assets/merch4.png';

const MerchPage = () => {
    const [likedItems, setLikedItems] = useState({});
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isSizeChartOpen, setIsSizeChartOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleHeart = (id) => {
        setLikedItems((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };
    const handleBuyNow = (product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };
    const closeBuyNowModal = () => {
        setSelectedProduct(null);
        setIsModalOpen(false);
    };


    const handleCloseModal = () => {
        setIsModalOpen(false);
    };
    const handleOpenSizeChart = () => {
        setIsSizeChartOpen(true);
    };

    const handleCloseSizeChart = () => {
        setIsSizeChartOpen(false);
    };

    const Merchandise = [
        {
            id: 1,
            image: Merch1,
            name: "Round-Neck TEE",
            title: "TEE",
            price: 20,
        },
        {
            id: 2,
            image: Merch2,
            name: "Round-Neck TEE",
            title: "TEE",
            price: 30,
        },
        {
            id: 3,
            image: Merch3,
            name: "Hoodie",
            title: "HDY",
            price: 35,
        },
        {
            id: 4,
            image: Merch4,
            name: "Sweatshirt",
            title: "SWT",
            price: 40,
        },

    ];

    return (
        <>
            <div className="merch-container">
                <div className="masking-container">
                    <h1 className="masked-text">Merchandise</h1>
                    <div className="diamond-loader">

                        <div className="pyramid-loader">
                            <div className="wrapper">
                                <span className="side side1"></span>
                                <span className="side side2"></span>
                                <span className="side side3"></span>
                                <span className="side side4"></span>
                                <span className="shadow"></span>
                            </div>
                        </div>


                        <div className="pyramid-loader inverted">
                            <div className="wrapper">
                                <span className="side side1"></span>
                                <span className="side side2"></span>
                                <span className="side side3"></span>
                                <span className="side side4"></span>
                                <span className="shadow"></span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="size-chart-button-container">
                    <button
                        onClick={handleOpenSizeChart}
                        className="size-chart-button"
                    >
                        <RulerIcon size={16} className="icon" />
                        <span>Size Chart</span>
                    </button>
                </div>
                <div className='card-container'>
                    {Merchandise.map((merch) => (
                        <section key={merch.id} className="product-container product-1">
                            <div className="card">
                                <div className="stage">
                                    <div className={`heart ${likedItems[merch.id] ? "is-active" : ""}`}
                                        onClick={() => toggleHeart(merch.id)}></div>
                                </div>
                                <div className="photo">
                                    <img src={merch.image} alt="Merch1" />
                                </div>
                                <div className="content">
                                    <div className="title">{merch.name}</div>
                                    <div className="bg-title">{merch.title}</div>
                                    <div className="feature size">
                                        <div>size :</div>
                                        <span>S</span>
                                        <span>M</span>
                                        <span>L</span>
                                        <span>XL</span>
                                    </div>
                                    <div className="feature price">
                                        <div>price :</div>
                                        <span>${merch.price}.00</span>
                                    </div>
                                    <button className="btn-buy" onClick={() => handleBuyNow(merch)}>Buy Now</button>
                                </div>
                            </div>
                        </section>))}

                </div>

                <BuyNowModal
                    product={selectedProduct}
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                />

                {isSizeChartOpen && <SizeChart onClose={handleCloseSizeChart} />}
            </div>


        </>
    )
}

export default MerchPage
