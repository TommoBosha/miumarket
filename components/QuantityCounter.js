import React from "react";
import { toast } from "react-toastify";


export default function QuantityCounter({ value, onChange, max }) {
    const handleIncrement = () => {
        if (value < max) {
          onChange(value + 1);
        } else {
          toast.error(" Більше товару немає в наявності");
        }
      };
  
    const handleDecrement = () => {
      if (value > 1) {
        onChange(value - 1);
      }
    };
  
    return (
      <div className="flex items-center ">
        <button onClick={handleDecrement}
        className="bg-counter px-[7px] xl:px-[9px] py-[2px] xl:py-[4px] text-[10px] xl:text-[12px]"
        >-</button>
        <p className="bg-white text-[10px] xl:text-[12px] px-[10px] xl:px-[15px] py-[2px] xl:py-[4px] ">{value}</p>
        <button onClick={handleIncrement}
        className="bg-counter px-[5px] xl:px-[9px] py-[2px] xl:py-[4px]  text-[10px] xl:text-[12px]">+</button>
      </div>
    );
  }