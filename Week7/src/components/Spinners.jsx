import ClipLoader from "react-spinners/ClipLoader";
//Used to add loading spinner css when the page is loading or data is being fetched from api
export default function Spinners({loading}) {

    const override={
        display:"block",
        margin :"100px auto"
    }
  return (
    <ClipLoader
        color='#4338ca'
        loading={loading}
        cssOverride={override}
        size={150}
    />
  )
}
