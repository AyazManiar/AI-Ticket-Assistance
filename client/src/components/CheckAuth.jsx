import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

const CheckAuth = ({ children, protected: protectedRoute }) => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  
  useEffect(()=>{
    const token = localStorage.getItem("token")
    if(protectedRoute){
      if(!token){
        navigate("/login")
      } else{
        setLoading(false)
      }
    } else{
      if(token){
        navigate("/dashboard")
      } else{
        setLoading(false)
      }
    }
  }, [navigate, protectedRoute])
  
  if(loading) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        flexDirection: 'column',
        gap: '16px'
      }}>
        <div style={{
          width: '40px',
          height: '40px',
          border: '3px solid #f3f3f3',
          borderTop: '3px solid #333',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }}></div>
        <p>Loading...</p>
      </div>
    )
  }
  return children
}

export default CheckAuth