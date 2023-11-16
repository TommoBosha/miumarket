import React, { useState } from "react";
import axios from "axios";

const WishlistButton = ({ productId, onToggle }) => {
    const [isWished, setWished] = useState(false);

    const toggleWishlist = async () => {
        try {
            const response = await axios.post('/api/wishlist', {
                product: productId,
            });

            console.log("Response from the server:", response);

            if (response.data.wishedDoc && response.data.wishedDoc._id) {
                setWished((prevWished) => !prevWished);
                onToggle(productId);
            } else {
                console.error("Invalid wishedDoc data:", response.data.wishedDoc);
            }
        } catch (error) {
            console.error("Error toggling wishlist:", error);
        }
    };

    return (
        <button onClick={toggleWishlist}>
            <svg xmlns="http://www.w3.org/2000/svg" fill={isWished ? "#3ACCE9" : "none"} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>
        </button>
    );
};

export default WishlistButton;