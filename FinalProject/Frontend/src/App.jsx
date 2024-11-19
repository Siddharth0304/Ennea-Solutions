import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements
} from "react-router-dom"

import AllCourses from "./components/AllCourses"
import MainLayout from "./layouts/MainLayout"
import SingleCourse from "./components/SingleCourse"
import NotFoundPage from "./pages/NotFoundPage"
import UserProfile from "./components/UserProfile"
import AllUsers from "./components/AllUsers"
import SearchResults from "./components/SearchResults"
import Categories from "./components/Categories"
import Wishlist from "./components/Wishlist"
import Cart from "./components/Cart"
import MyCourses from "./components/MyCourses"
import Login from "./components/Login"
import Signup from "./components/Signup"
import AddCourse from "./components/AddCourse"

function App() {
  const router=createBrowserRouter(
    createRoutesFromElements(
    // Main Layout and surrounds other routes meaning part of every route
    <Route path="/" element={<MainLayout/>}>
      <Route index element={<AllCourses/>} />
      <Route path="/categories/:query" element={<Categories/>} />
      <Route path="/search/:query" element={<SearchResults/>} />
      <Route path="/users/courses_enrolled/:id" element={<MyCourses/>} />
      <Route path="/users/wishlist/:id" element={<Wishlist/>} />
      <Route path="/users/cart/:id" element={<Cart/>} />
      <Route path="/course/:id" element={<SingleCourse/>}/>  
      <Route path="/profile/:id" element={<UserProfile/>}/>
      <Route path="/allusers" element={<AllUsers/>}/>
      <Route path='/login' element={<Login/>} />
      <Route path="/signup" element={<Signup/>} />
      <Route path="/course/add" element={<AddCourse/>} />
      <Route path="*" element={<NotFoundPage/>}/>
      
    </Route>
    )
  );  
  
  return <RouterProvider router={router}/>
}

export default App
