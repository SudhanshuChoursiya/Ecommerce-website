import Image from "next/image";
const Loading = () => {
  return (
  <div style={{display:"flex",alignItems:"center",justifyContent:"center",flex:1}}>
  <Image src="/Infinity-loader.svg" alt="loading" height={100} width={100}/>
  </div>
  )
}

export default Loading;