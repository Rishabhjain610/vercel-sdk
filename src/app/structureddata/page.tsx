"use client"
import React,{useState} from 'react'
import { experimental_useObject as useObject } from '@ai-sdk/react'
import { receipeSchema } from '../api/structuredData/schema'
const page = () => {
  const [dishName,setDishName]=useState("")
  const {submit,object}=useObject({
    api:'/api/structureddata',
    schema:receipeSchema
  })
  const handleSubmit=(e:React.FormEvent)=>{
    e.preventDefault();
    submit({dishName})
  }
  return (
    <div>
      {object?.receipe && (
          <div>
            <h2>{object.receipe.name}</h2>
            {
              object?.receipe.ingredients && (
                
              )
            }
          </div>
        )
      }
      <form action="" onSubmit={handleSubmit}>
        <div>
          <input type="text" value={dishName} onChange={(e) => setDishName(e.target.value)} placeholder='type here' />
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  )
}

export default page
// ...existing code...