import Link from "next/link";
import Image from "next/image";
import XMarkIcon from "@heroicons/react/24/outline/XMarkIcon";

export default function FavoriteItem({
  title,
  slug,
  images,
  priceInHryvnia,
  productRemovedFromWishlist,
}) {
  const url = "/product/" + slug;

  return (
    <div className="relative z-20 ">
      <Link href={url}>
        <div
          className="absolute  top-0 left-0 right-0 bottom-0 z-10 "
          style={{
            background:
              "linear-gradient(0deg, rgba(0, 0, 0, 0.50) 0%, rgba(0, 0, 0, 0.40) 20%), linear-gradient(180deg, rgba(180, 180, 180, 0.00) 20.31%, rgba(51, 51, 51, 0.80) 100%)",
          }}
        ></div>
        <Image
          className="relative z-0 w-full h-full object-fill"
          src={images?.[0]}
          alt={title}
          width={157}
          height={157}
        />
      </Link>
      <div >
        <Link href={url}>
          <h2 className="absolute xl:pt-[130px]  z-20 bottom-[21px] md:bottom-[16px] xl:bottom-[4px]  left-[4px] xl:left-[7px] w-[128px]  xl:w-[134px]  text-[12px]  xl:text-[13px]  uppercase text-white">
            {title}
          </h2>
        </Link>
        <p className="absolute xl:pt-[130px]  z-20 bottom-[6px] xl:bottom-[10px]  left-[4px] xl:left-[172px] xxl:left-[210px]  text-[12px] xl:text-[13px] leading-[6px] font-bold uppercase text-primary">
          {priceInHryvnia} грн
        </p>
       
          <button onClick={productRemovedFromWishlist}
          className="absolute z-30 top-1 right-0 mr-1 text-white"
          >

            <XMarkIcon className="h-[14px] w-[14px] md:h-[17px] md:w-[17px]" />
          </button>
        
      </div>
    </div>
  );
}
