import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

const CheckAuth = ({ children, protectedRoute }) => {
  const navigate = useNavigate()
  const [loading, setloading] = useState(second)
  useEffect(()=>{
    const token = localStorage.getItem("token")
    if(protectedRoute){
      if(!token){
        navigate("/login")
      } else{
        setloading(false)
      }
    } else{
      if(!token){
        setloading(false)
      } else{
        navigate("/")
      }
    }
  }, [navigate, protectedRoute])
  
  if(loading) {
    return <div>Loading...</div>
  }
  return children
}

export default CheckAuth