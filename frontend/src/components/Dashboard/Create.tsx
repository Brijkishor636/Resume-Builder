import { type LucideIcon } from "lucide-react";

interface buttonProps{
    title: string;
    fromColor: string;
    toColor: string;
    Icon: LucideIcon;
}

export default function Create({title, fromColor, toColor, Icon}: buttonProps){
    return <button className="flex justify-center items-center outline-dashed outline-gray-300 outline-1 rounded-xl h-40 w-28 shadow hover:shadow-md hover:bg-gray-50 cursor-pointer">
        <div className="flex flex-col justify-center items-center">
            <div className={`w-8 h-8 rounded-full flex justify-center items-center bg-linear-to-br ${fromColor} ${toColor}`}>
                <Icon className="text-white"/>
            </div>
            <p className="pt-1 text-[12px] text-gray-700">{title}</p>
        </div>
    </button>
}