import { eachDataProps } from "./TopCategory"
import {AiFillDownSquare,AiFillUpSquare} from "react-icons/ai"

type MicroSubCategoryProps = {
    data:eachDataProps,
    setToggleCards:React.Dispatch<React.SetStateAction<boolean | undefined>>,
    toggleCards:boolean|undefined,
    list:JSX.Element[]
}

const MicroSubCategory = (props:MicroSubCategoryProps) => {
    const {id,name,description,prerequisites,teacher,type,created_at,updated_at} = props.data
    let created_at_date = new Date(created_at).toDateString()
    let updated_at_date = new Date(updated_at).toDateString()
  return (
    <div key={id} className="my-4 w-full   bg-slate-300 rounded-lg">
          <div className="relative bg-purple-500 w-full rounded-t-lg">
            <h1 className="font-bold text-2xl text-center p-4 text-white font-serif">{name}</h1>
                <div className="absolute right-0 top-0" onClick={()=>{
                    props.setToggleCards(!props.toggleCards)
                }}>
                {(props.list.length>0 )&& (props.toggleCards?<AiFillUpSquare size="1.75rem" style={{color:"white",cursor:"pointer"}}></AiFillUpSquare>:<AiFillDownSquare size="1.75rem" style={{color:"white",cursor:"pointer"}} ></AiFillDownSquare>)}

                </div>
                </div>
            <h2 className="text-lg text-center font-medium font-serif pt-3">{type}</h2>

            <h2 className="text-md text-center ">Instructor: <span className="font-semibold  ">{teacher}</span></h2>
            <h2 className="text-md text-center font-extralight">{description==="<p>tbd</p>"?"Coming Soon...":description}</h2>
            <h3 className="text-md text-center ">{prerequisites.length>0?prerequisites:"No Prerequisities"}</h3>
            <h4 className="text-md text-center font-thin font-serif ">Created on <span className="font-bold">{created_at_date}</span></h4>
            <h4 className="text-md text-center font-thin  font-serif  pb-4">Updated on <span className="font-bold">{updated_at_date}</span></h4>
                <div >
                {props.toggleCards && props.list}
                </div>
    </div>
  )
}

export default MicroSubCategory