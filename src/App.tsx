import axios from "axios"
import {useEffect,useState} from "react"
import UseAnimations from "react-useanimations"
import infinity from "react-useanimations/lib/infinity"
import TopCategory from "./components/TopCategory"

export type DataFetched = {
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
  }[]





function App() {
  const [apiData,setApiData] = useState<DataFetched|[]>([])

  const [loading,setLoading] = useState(true)

  
  const url = 'https://xcool.in/api/test5m23'
  const token = '1|FWItRXH5DCAN9rjBjIhfH9KMnprvKZweoK2Jfi5T'

  const fetchData = async()=>{
    
    axios.get(url,{headers:{"Authorization":`Bearer ${token}`}}).then((response)=>response.data).then((data)=>{
      setApiData(data.data)
      setLoading(false)
    })
  }
  
  
  useEffect(()=>{
    
      
      fetchData()
      
    
  },[])
  

  return (
    <div className="bg-purple-800 flex justify-center  min-h-screen">
     
     {loading?<div >
      <UseAnimations animation={infinity} size={100} strokeColor="white"></UseAnimations>
      <h3 className="text-white font-bold text-2xl">Loading..</h3>
      </div>:
    
     <TopCategory {...apiData}></TopCategory>
     
      }
    </div>
  )
}

export default App
