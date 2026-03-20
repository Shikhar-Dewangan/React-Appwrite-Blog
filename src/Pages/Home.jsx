import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import appwriteService from "../AppWrite/files"
import { Container, PostCard } from "../Components"

function Home() {

   const authStatus = useSelector((state) => state.auth.status)

   const [posts, setPosts] = useState([])
   const [loading, setLoading] = useState(true)
   const [error, setError] = useState("")

   useEffect(() => {

      if (!authStatus) {
         setLoading(false)
         return
      }

      appwriteService.getPosts()
         .then((res) => {
            if (res) {
               setPosts(res.rows || [])
            }
         })
         .catch((err) => {
            setError("Failed to load posts")
         })
         .finally(() => {
            setLoading(false)
         })

   }, [authStatus])

   // ⭐ Logged out UI
   if (!authStatus) {
      return (
         <div className="w-full py-16 text-center">
            <Container>
               <h1 className="text-3xl font-bold">
                  Login to read posts
               </h1>
            </Container>
         </div>
      )
   }

   // ⭐ Loading UI
   if (loading) {
      return (
         <div className="w-full py-16 text-center">
            <Container>
               <h1 className="text-2xl font-semibold">
                  Loading posts...
               </h1>
            </Container>
         </div>
      )
   }

   // ⭐ Error UI
   if (error) {
      return (
         <div className="w-full py-16 text-center text-red-500">
            <Container>
               <h1 className="text-2xl font-semibold">
                  {error}
               </h1>
            </Container>
         </div>
      )
   }

   // ⭐ Empty UI
   if (posts.length === 0) {
      return (
         <div className="w-full py-16 text-center">
            <Container>
               <h1 className="text-2xl font-semibold">
                  No posts yet
               </h1>
            </Container>
         </div>
      )
   }

   // ⭐ Posts UI
   return (
      <div className="w-full py-8">
         <Container>
            <div className="flex flex-wrap">
               {posts.map((post) => (
                  <div key={post.$id} className="p-2 w-full md:w-1/2 lg:w-1/4">
                     <PostCard {...post} />
                  </div>
               ))}
            </div>
         </Container>
      </div>
   )
}

export default Home