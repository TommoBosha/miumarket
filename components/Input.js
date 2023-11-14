import React from "react";

export default function Input(props) {
    return (
        <input
            className="w-full p-2 mb-2 border border-gray-300 rounded"
            {...props}
        />
    );
}