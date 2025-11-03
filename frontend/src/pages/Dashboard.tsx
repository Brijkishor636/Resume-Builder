import { PlusIcon, UploadCloudIcon } from "lucide-react";
import Create from "../components/Dashboard/Create";

export default function Dashboard(){
    return <div className="pt-10 px-10 sm:px-25">
        <div className="flex gap-6">
            <Create title="Create Resume" fromColor="from-blue-600" toColor="to-purple-300" Icon={PlusIcon}/>
            <Create title="Upload Existing" fromColor="from-purple-600" toColor="to-purple-400" Icon={UploadCloudIcon}/>
        </div>
        <div className="border-b border-gray-300 w-62 pt-10"></div>
    </div>
}