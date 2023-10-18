import { useEffect } from "react"



function UserOrders() {

  useEffect(()=>{
    window.scrollTo({ top: 0 })
  },[])
  
  return (
            <>
              <div className={``}>
                My Orders Page
              </div>
            </>
  )
}
 
export default UserOrders