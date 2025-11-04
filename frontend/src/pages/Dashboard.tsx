import { FilePenLineIcon, PencilIcon, PlusIcon, TrashIcon, UploadCloud, UploadCloudIcon, XIcon } from "lucide-react";
import Create from "../components/Dashboard/Create";
import { useEffect, useState } from "react";
import { dummydata } from "../assets/dummdata";
import { useNavigate } from "react-router-dom";

export default function Dashboard(){

    const colors = ["#9333ea", "#d97706", "#dc2626", "#0284c7", "#16a34a"]
    const[allResumes, setAllResumes] = useState<{
        _id: number; name: string; email: string; phone: string; education: string; experience: string; skills: string[]
}[]>([]);
    const[showCreateResume, setShowCreateResume] = useState(false);
    const[showUploadResume, setShowUploadResume] = useState(false);
    const[title, setTitle] = useState("");
    const[resume, setResume] = useState<File | null>(null);
    const[editResumeId, setEditResumeId] = useState("");

    const navigate = useNavigate();

    const loadAllResumes = async()=>{
        setAllResumes(dummydata);
    }

    const createResume = async(event: React.FormEvent)=>{
        event.preventDefault();
        setShowCreateResume(false);
        navigate(`/app/builder/res123`);
    }

    const updateResume = async(event: React.FormEvent)=>{
        event.preventDefault();
        setShowUploadResume(false);
        navigate(`/app/builder/res123`);
    }

    const editTitle = async (event: React.FormEvent)=>{
        event.preventDefault();
    }

    const deleteResume = async (resumeId: any)=>{
        const confirm = window.confirm("Are you sure you want to delete this resume.");
        if(confirm){
            setAllResumes(prev => prev.filter(resume => resume._id !== resumeId))
        }
    }
    
    useEffect(()=>{
        loadAllResumes();
    },[])

    return <div className="pt-10 px-10 sm:px-25 min-h-screen">
        <div className="flex gap-6">
            <Create title="Create Resume" fromColor="from-blue-600" toColor="to-purple-300" Icon={PlusIcon} onClick={()=>{setShowCreateResume(true)}}/>
            <Create title="Upload Existing" fromColor="from-purple-600" toColor="to-purple-400" Icon={UploadCloudIcon} onClick={()=>{setShowUploadResume(true)}}/>
        </div>
        <hr className="border-slate-300 my-6 sm:w-[305px]"/>
        <div className="grid grid-cols-2 sm:flex flex-wrap gap-6">
            {allResumes.map((resume, index) => {
                const baseColor = colors[index % colors.length];
                return (
                    <button key={index} onClick={()=>{ navigate(`/app/builder/${resume._id}`)}} className="relative w-full sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg border gap-2 group hover:shadow-lg transition-all duration-300 cursor-pointer" style={{background: `linear-gradient(135deg, ${baseColor}10, ${baseColor}40)`, borderColor: baseColor + '40'}}>
                        <FilePenLineIcon className="size-7 group-hover:scale-105 transition-all" style={{color: baseColor}}/>
                        <p className="text-sm group-hover:scale-105 transition-all text-center px-2" style={{color: baseColor}}>{resume.name}</p>
                        <p className="bottom-1 absolute text-[11px] text-slate-400 group-hover:text-slate-500 transition-all duration-300 text-center px-2">Updated on {new Date(resume.updatedAt).toLocaleDateString()}</p>

                        <div onClick={(e)=>{e.stopPropagation();}} className="absolute hidden group-hover:flex top-1 right-1 items-center">
                            <TrashIcon onClick={()=>{deleteResume(resume._id)}} className="size-7 p-1.5 hover:bg-white/50 rounded text-slate-700 transition-colors"/>
                            <PencilIcon onClick={()=>{setEditResumeId(resume._id.toString()); setTitle(resume.name)}} className="size-7 p-1.5 hover:bg-white/50 rounded text-slate-700 transition-colors"/>
                        </div>
                    </button>
                );
            })}
        </div>

        {showCreateResume && (
            <form onSubmit={createResume} onClick={()=>{setShowCreateResume(false)}} className="fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center">
                <div onClick={e => e.stopPropagation()} className="bg-slate-50 max-w-sm p-5 rounded-lg items-center relative">
                    <h2 className="mb-4 text-lg font-semibold">Create a Resume</h2>
                    <input onChange={(e)=>{setTitle(e.target.value)}} value={title} type="text" placeholder="Enter resume title" className="w-full text-[15px] text-gray-900 py-2 px-4 mb-5 focus:border-green-600 ring-green-600 bg-gray-200 rounded-lg outline-none border border-green-400" required/>
                    <button className="bg-green-600 w-full py-2 px-4 rounded-lg cursor-pointer text-white hover:bg-green-700 transition-all duration-300">Create Resume</button>
                    <XIcon className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer" onClick={()=>{
                        setShowCreateResume(false); setTitle("")
                    }}/>
                </div>
            </form>
        )}

        {showUploadResume && (
            <form onSubmit={updateResume} onClick={()=>{setShowCreateResume(false)}} className="fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center">
                <div onClick={e => e.stopPropagation()} className="bg-slate-50 max-w-sm w-full p-5 rounded-lg items-center relative">
                    <h2 className="mb-4 text-lg font-semibold text-gray-800">Upload Resume</h2>
                    <input onChange={(e)=>{setTitle(e.target.value)}} value={title} type="text" placeholder="Enter resume title" className="text-[15px] w-full text-gray-900 py-2 px-4 mb-5 focus:border-green-600 ring-green-600 bg-gray-200 rounded-lg outline-none border border-green-400" required/>
                    <div className="w-full mb-4">
                        <label htmlFor="resume-input" className="block text-sm font-semibold text-gray-700">Select resume file
                            <div className="flex flex-col items-center justify-center gap-2 border group text-slate-400 border-slate-400 border-dashed rounded-md p-4 py-10 my-4 hover:border-green-500 hover:text-green-700 cursor-pointer transition-colors">
                                {resume ? (
                                    <p className="text-green-700">{resume.name}</p>
                                ) : (
                                    <>
                                        <UploadCloud className="size-14 stroke-1" />
                                        <p>Upload resume</p>
                                    </>
                                )}
                            </div>
                        </label>
                        <input type="file" id="resume-input" accept=".pdf" hidden
                        onChange={(e)=>{e.target.files && setResume(e.target.files[0])}}/>
                    </div>
                    <button className="bg-green-600 w-full max-w-sm py-2 px-4 rounded-lg cursor-pointer text-white hover:bg-green-700 transition-all duration-300">Update Resume</button>
                    <XIcon className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer" onClick={()=>{
                        setShowUploadResume(false); setTitle("")
                    }}/>
                </div>
            </form>
        )}

        {editResumeId && (
            <form onSubmit={editTitle} onClick={()=>{setEditResumeId("")}} className="fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center">
                <div onClick={e => e.stopPropagation()} className="bg-slate-50 max-w-sm p-5 rounded-lg items-center relative">
                    <h2 className="mb-4 text-lg font-semibold">Edit Resume Title</h2>
                    <input onChange={(e)=>{setTitle(e.target.value)}} value={title} type="text" placeholder="Enter resume title" className="w-full text-[15px] text-gray-900 py-2 px-4 mb-5 focus:border-green-600 ring-green-600 bg-gray-200 rounded-lg outline-none border border-green-400" required/>
                    <button className="bg-green-600 w-full py-2 px-4 rounded-lg cursor-pointer text-white hover:bg-green-700 transition-all duration-300">Update</button>
                    <XIcon className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer" onClick={()=>{
                        setEditResumeId(""); setTitle("")
                    }}/>
                </div>
            </form>
        )}
    </div>
}