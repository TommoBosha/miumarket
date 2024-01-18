

export default function Tabs({ tabs, active, onChange }) {
    return (
        <div className="max-w-xxl mx-auto pt-[12px] pb-[30px] md:pb-[23px] xl:pb-[37px] flex flex-wrap justify-evenly text-center md:gap-[23px]">
            {tabs.map((tabName, index) => (
                <span
                    key={index}
                    className={` cursor-pointer ${active === tabName ? 'text-[12px] md:text-[15px] xl:text-[18px] font-bold text-primary md:border-b-2  md:border-accent uppercase leading-normal  ' : 'text-secondary uppercase text-[12px] md:text-[15px] xl:text-[18px] font-bold'}`}
                    onClick={() => { onChange(tabName) }}
                >{tabName}</span>
            ))}
        </div>
    );
}