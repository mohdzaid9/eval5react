// First of all thank you masai school I gave my best and this is all i learnt although somethings i forgot but because Iam a slow learner that's why some 
// functionalities are missed.




import axios from "axios"
import { useEffect, useState } from "react"
import LoadingIndicator from "./LoadingIndicator"
import ErrorIndicator from "./ErrorIndicator"

// here I gave the UseState variables and functions

const Users = () => {
 const [data,setData]=useState([])
 const [loading,setLoading]=useState(false)
 const [error,setError]= useState(false)

// here I fetched the data 

 const URL = 'https://jsonplaceholder.typicode.com/users'
 const getData = async()=>{
    return await axios.get(URL)
 }

//  used useEffect here and within that resolved the promise

useEffect(()=>{
    setLoading(true)
    getData().then((res)=>{
        console.log(res)
        setData(res.data)
        setLoading(false)
        setError(false)
    })
    .catch((error)=>{
        console.log(error)
        setError(true)
        setLoading(false)
    })
},[])

// here I stored the new data in object and appended in the API to create new user

const handleSubmit =(e)=>{
    const formData = new FormData(e.target)
    e.preventDefault()

    const newData = {
        name : formData.get("name"),
        email :formData.get("email"),
        address : formData.get("address"),
        street : formData.get("street"),
        city : formData.get("city"),
        zipcode : formData.get("zipcode")
    }

    //here I done the post request for the API 

    console.log(newData)
    axios.post(URL,newData)
    .then((res)=>{
        console.log(res)
        setData(data, ...newData)
    })
    .catch((error)=>{
        console.log(error)
    })
    
}

// here I handled loading and error functionality with the react spinner

if(loading) return <LoadingIndicator/>
if(error) return <ErrorIndicator/>
    

// here i created the form to create a new user
  return (
    <div>
        <h1>Users</h1>
        <div style={{height:"100px",border : "5px",borderColor:"red"}}>
            <h3>Create a new user</h3>
            <form onSubmit={handleSubmit} style={{display:"flex",flexDirection:"column", margin:"10px"}}>
                <input type="text" placeholder="Enter your name" name="name" style={{border :"1px", borderColor:"blue",borderStyle:"solid",}}/>
                <input type="email" placeholder="Enter your email" name="email" style={{border :"1px", borderColor:"blue",borderStyle:"solid",}}/>
                <input type="text" placeholder="Enter your address" name="address" style={{border :"1px", borderColor:"blue",borderStyle:"solid",}}/>
                <input type="text" placeholder="Enter your street" name="street" style={{border :"1px", borderColor:"blue",borderStyle:"solid",}}/>
                <input type="text" placeholder="Enter your city" name="city" style={{border :"1px", borderColor:"blue",borderStyle:"solid",}}/>
                <input type="number" placeholder="Enter your zipcode" name="zipcode" style={{border :"1px", borderColor:"blue",borderStyle:"solid",}}/>
                <button type="submit">Submit</button>
            </form>
        </div>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        {

// here i mapped the data which i got from the promise

            data.map((el)=>{
                return (
                    <div key={el.id} 
                    style={{display:"grid",
                    gridTemplateColumns:"repeat(2,5fr)", 
                    border:"1px",borderStyle:"solid",
                    borderColor:"teal", 
                    width:"300px",
                    height:"150px"}}> 
                   <b>
                    {el.name}.
                    
                    {el.email}
                    <button>view Details</button>
                    <button>Edit</button>
                    <button>Delete</button>
                   </b>
                    </div>
                )
            })
        }
    </div>
  )
}

export default Users

// THAT WAS ALL FROM MY SIDE I KNOW MY EVALUATION IS NOT GOOD BUT I AM SEEING THE IMPROVEMENT IN MYSELF SO FOR THAT THANK YOU MASAI SCHOOL.
// PLEASE PARDON ME I AM A SLOW LEARNER 