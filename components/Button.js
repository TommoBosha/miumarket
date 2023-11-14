import React from "react";

const Button = ({
    children,
    block,
    white,
    black,
    primary,
    outline,
    size,
    ...rest
}) => {
    const getBackgroundColor = () => {
        if (white && !outline) return "bg-white text-black";
        if (white && outline) return "border-white text-white";
        if (black && !outline) return "bg-black text-white";
        if (black && outline) return "border-black text-black";
        if (primary && !outline)
            return `bg-${primary} border-${primary} text-white`;
        if (primary && outline) return `border-${primary} text-${primary}`;
        return "";
    };

    const getFontSize = () => {
        if (size === "l") return "text-lg";
        return "";
    };

    const buttonClasses = `border-0 rounded cursor-pointer inline-flex items-center text-decoration-none font-poppins font-semibold ${getBackgroundColor()} ${getFontSize()}`;

    return (
        <button
            className={block ? `w-full ${buttonClasses}` : buttonClasses}
            {...rest}
        >
            {children}
        </button>
    );
};

export default Button;
