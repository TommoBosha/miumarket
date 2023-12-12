import Link from "next/link";
import Image from "next/image";


export default function ProductBox({
  title,
  slug,
  images,
}) {
  const url = "/product/" + slug;

  return (
    <div className="relative">
      <Link className="text-center flex items-center justify-center"
       href={url}>
        <div className="absolute  top-0 left-0 right-0 bottom-0 md:left-[2px] md:right-[2px] xl:left-0 xl:right-0  xxl:right-[25px] xxl:left-[25px] z-10" style={{ background: 'linear-gradient(180deg, rgba(180, 180, 180, 0.00) 20.31%, #333 100%)'}}></div>
        <Image 
        className="relative z-0 w-full h-full md:w-[213px] xl:min-w-[323px] md:h-[213px] xl:min-h-[323px] "
        src={images?.[0]} 
        alt={title}
        width={157}
        height={157} />
      </Link>
      <div  className="relative z-20">
        <Link className="absolute bottom-[20px] px-[2px] left-0 right-0 text-center text-white text-[12px] md:text-[15px] leading-normal  uppercase"
        href={url}>{title}</Link>
      </div>
    </div>
  );
}