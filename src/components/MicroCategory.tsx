import { eachDataProps } from "./TopCategory"




const MicroCategory = (props:eachDataProps) => {

  const {id,name,description,prerequisites,teacher,type,created_at,updated_at} = props
  let created_at_date = new Date(created_at).toDateString()
  let updated_at_date = new Date(updated_at).toDateString()

  return (
    <div key={id} className="my-4 rounded-lg w-full bg-slate-100">
      <div className="bg-purple-600 w-full rounded-t-lg">
      <h1 className="font-bold text-2xl text-center p-4 text-white font-serif">{name}</h1>
      
      </div>
      <h2 className="text-lg text-center font-medium font-serif pt-3">{type}</h2>

        <h2 className="text-md text-center ">Instructor: <span className="font-semibold  ">{teacher}</span></h2>

        <h2 className="text-md text-center font-extralight">{description==="<p>tbd</p>"?"Coming Soon...":description}</h2>
        <h3 className="text-md text-center ">{prerequisites?prerequisites:"No Prerequisities"}</h3>
        <h4 className="text-md text-center font-thin font-serif ">Created on <span className="font-bold">{created_at_date}</span></h4>
            <h4 className="text-md text-center font-thin  font-serif  pb-4">Updated on <span className="font-bold">{updated_at_date}</span></h4>
        <div >
         
          </div>
    </div>

  )
}

export default MicroCategory