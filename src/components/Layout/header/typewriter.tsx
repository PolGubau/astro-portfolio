export const Typewriter = ({ children }: {
  children: string
})=>{

  return ( 
    <div className="typewriter-[10] w-fit">
    {children}
    </div>
   )
}