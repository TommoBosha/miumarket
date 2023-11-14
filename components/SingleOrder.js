import React from "react";
import Image from 'next/image';

export default function SingleOrder({ orderItems, createdAt, shippingAddress, ...rest }) {
    return (
        <div className="my-10 py-10 border-b border-gray-300 flex gap-20 items-center">
            <div>
                <time className="text-sm text-gray-500">
                    {(new Date(createdAt)).toLocaleString('sv-SE')}
                </time>
                <div className="text-xs leading-relaxed mt-5 text-gray-800">
                    {shippingAddress.fullName}<br />
                    {shippingAddress.address}<br />
                    {shippingAddress.postCode} {shippingAddress.city}, {shippingAddress.country}
                </div>
            </div>
            <div>
                {orderItems && orderItems.length > 0 ? (
                    orderItems.map((item, index) => (
                        <div key={index} className="text-gray-600">
                            <span className="text-gray-500">{item.quantity} x </span>
                            {item.title}<br />

                            {item.images && item.images.length > 0 && (
                                <div>
                                    {item.images && item.images.length > 0 && (
                                        <Image src={item.images[0]} alt={`Product ${index + 1}`} width={100} height={100} />
                                    )}
                                </div>
                            )}
                            <span>Ціна: {item.price} грн.</span>
                        </div>
                    ))
                ) : (
                    <p>No items in this order</p>
                )}
            </div>
        </div>
    );
}