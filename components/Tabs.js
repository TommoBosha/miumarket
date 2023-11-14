

export default function Tabs({ tabs, active, onChange }) {
    return (
        <div className="gap-5 flex mb-5">
            {tabs.map((tabName, index) => (
                <span
                    key={index}
                    className={`text-lg cursor-pointer ${active === tabName ? 'text-black border-b-2 border-black' : 'text-gray-600'}`}
                    onClick={() => { onChange(tabName) }}
                >{tabName}</span>
            ))}
        </div>
    );
}