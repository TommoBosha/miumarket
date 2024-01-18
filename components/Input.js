import React from "react";

export default function Input({label, id, ...props}) {
    return (

        <div className="mb-8 relative">
        {label && <label htmlFor={id} className="block text-[15px] xl:text-[14px] pl-1 pr-2 absolute top-0 left-5 transform -translate-y-2/4 bg-graybg text-form">
            {label}
        </label>}
        <input
            className={`appearance-none border-2 rounded-3xl
            
             w-full py-2 px-5 border-secondary bg-graybg text-black text-[15px] leading-[22.5px] xl:text-[18px] xl:leading-[27px] focus:outline-none focus:shadow-outline`}
             id={id}
             {...props}
        />
              </div>
    );
}