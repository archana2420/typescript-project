import { DataFetched } from "../App"

import MicroCategory from "./MicroCategory"
import {AiFillDownSquare,AiFillUpSquare} from "react-icons/ai"
import {useState} from "react"
import SubCategory from "./SubCategory"
import MicroSubCategory from "./MicroSubCategory"


export type eachDataProps ={
    
    id:number
    name:string
    teacher:string|null
    category_id:number
    type:string 
    description:string 
    created_at:string 
    updated_at:string 
    prerequisites:string 
    parentId:number|null
    toggle?:boolean
}

type categoryDataType = {
    [ key:number]:eachDataProps[]
}
    


const TopCategory = (props:DataFetched) => {

    let topCategoryData:eachDataProps[] = []
    Object.values(props).forEach((data)=>{
        if(data.parentId === null && data.teacher === null)
        {
            topCategoryData.push({...data,toggle:true})
        }
    })
   

    let subCategoryData:categoryDataType = []
    
    topCategoryData.forEach((data)=>{
        let subcategory:eachDataProps[] = []
        Object.values(props).forEach((subData)=>{
            if(subData.parentId !== null)
            {
                if(data?.id === subData.parentId)
                {
                    
                    subcategory.push({...subData,toggle:false})
                }
            }
        })
        subCategoryData[data.id] = subcategory
    })
    
    let microSubLevelData:categoryDataType = []
    Object.values(subCategoryData).forEach((eachData)=>{
        eachData.forEach((subCategory)=>{
            let microSubCategory:eachDataProps[] = []
            Object.values(props).forEach((data)=>{

                if((subCategory.id === data.category_id && data.parentId === null) ||subCategory.id == data.parentId)
                {
                    microSubCategory.push({...data,toggle:false})
                }


            })
            microSubLevelData[subCategory.id] = microSubCategory
        })
       
    })
    
    let microCategoryData:categoryDataType = []
    Object.values(microSubLevelData).forEach((eachData)=>{
        eachData.forEach((subCategory)=>{
            let microcategory:eachDataProps[] = []
            Object.values(props).forEach((data)=>{
                if(subCategory.id === data.parentId && data.parentId !== 49)
                {
                    microcategory.push({...data,toggle:false})
                }
            })
            microCategoryData[subCategory.id] = microcategory
        })
        
        
    })
   
   
  return (
    <div className="flex gap-3 flex-col" >
   {topCategoryData?.map((data)=>{
     
    let created_at_date = new Date(data.created_at).toDateString()
    let updated_at_date = new Date(data.updated_at).toDateString()

    const [toggleCards,setToggleCards] = useState(data?.toggle)

    const subCategoryList = subCategoryData[data?.id].map((subData)=>{
        const [toggleCards,setToggleCards] = useState(subData?.toggle)

        const microSubLevelList = microSubLevelData[subData?.id].map((microSubData)=>{

            const [toggleCards,setToggleCards] = useState(microSubData?.toggle)
            const microCategoryList = microCategoryData[microSubData?.id].map((microSubData)=>{ 
                
                
                return (
                    <div >
                    <MicroCategory {...microSubData} ></MicroCategory>
                    </div>
                )
            })
            return (
                <div>
                    <MicroSubCategory data={microSubData} setToggleCards={setToggleCards} toggleCards={toggleCards} list={microCategoryList}></MicroSubCategory>
                </div>
            )
        })
        
        
        return (
            <div className="flex justify-center ">
                <SubCategory subData={subData} setToggleCards={setToggleCards} toggleCards={toggleCards} microSubLevelList={microSubLevelList}></SubCategory>
            </div>
            )
    })
    
    return (
    <div key={data?.id} className="my-4 w-[800px]   bg-white rounded-lg">
        <div className="relative bg-purple-400 w-full rounded-t-lg">
        <h1 className="font-bold text-3xl text-center p-4 text-white font-serif">{data?.name}</h1>
        <div className="absolute right-0 top-0" onClick={()=>{
            setToggleCards(!toggleCards)
        }}>
        {toggleCards?<AiFillUpSquare size="1.75rem" style={{color:"white",cursor:"pointer"}}></AiFillUpSquare>:<AiFillDownSquare size="1.75rem" style={{color:"white",cursor:"pointer"}} ></AiFillDownSquare>}

        </div>
        </div>
        <h2 className="text-lg text-center font-medium font-serif pt-3">{data?.type}</h2>
       <h2 className="text-md font-extralight text-center">{data?.description==="<p>tbd</p>"?"Coming Soon..":data?.description}</h2>
       <h3 className="text-md text-center ">{data?.prerequisites?data?.prerequisites:"No Prerequisities"}</h3>
       <h4 className="text-md text-center font-thin font-serif ">Created on <span className="font-bold">{created_at_date}</span></h4>
       <h4 className="text-md text-center font-thin  font-serif  pb-4">Updated on <span className="font-bold">{updated_at_date}</span></h4>
        <div >
        {toggleCards && subCategoryList}
        </div>
    </div>
    )
   }) 
  }
</div>   
)
}

export default TopCategory