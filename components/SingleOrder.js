import React from "react";
import Image from 'next/image';


export default function SingleOrder({ orderItems, createdAt,  }) {
    return (
        <div className="mb-[10px] md:mb-[16px]">
        <div className="flex flex-col  border-secondary border-[2px]">
            
               
            
            <div>
                {orderItems && orderItems.length > 0 ? (
                    orderItems.map((item) => (
                        <div
                        key={item._id}
                        className=" py-[10px] px-[12px] xl:px-[24px] xl:py-[18px]   xl:gap-[28px] relative"
                      >
                        <div className="flex items-center gap-[12px] md:gap-[17px] md:items-start">
                        
                            <Image
                              src={item.images[0]}
                              alt={item.title}
                              width={102}
                              height={102}
                              className="w-[102px] h-[102px] md:w-[76px] md:h-[76px] border-[1px] border-white"
                            />
                         
                          <div className="flex flex-col md:flex-row md:gap-[43px] xl:gap-[150px] md:items-start">
                            <div className="flex flex-col">
                              <p className="text-[15px] underline md:pb-[10px] md:w-[284px] xl:w-[313px]">
                                {item.title}
                              </p>
                              <p className="text-[12px] md:text-[11px] md:pb-[8px] ">
                                {item.productIndex}
                              </p>
                              <time className="text-sm text-gray-500">
                    {(new Date(createdAt)).toLocaleString('sv-SE')}
                </time>
               
                            </div>
                            <div className="flex flex-row gap-[11px] md:gap-[37px] xl:gap-[61px] items-center md:items-end">
                              <div className="flex flex-col">
                                <p className=" text-[11px]  underline">
                                  ціна за одиницю
                                </p>
                                <p className="text-[15px] md:text-[20px] xl:text-[15px] font-bold ">
                                  {item.price} грн
                                </p>
                              </div>
                              <div className="flex flex-col">
                                <p className=" text-[11px]  underline">
                                  загальна вартість
                                </p>
                                <p className=" text-[15px] md:text-[20px] xl:text-[15px] font-bold text-primary">
                                  {item.quantity * item.price} грн
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                ) : (
                    <p>No items in this order</p>
                )}
            </div>
        </div>
        </div>
    );
}