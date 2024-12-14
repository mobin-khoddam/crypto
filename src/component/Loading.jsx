const Loading = ({className}) => {
  return (
      <div className={`w-full h-full flex justify-center items-center mt-[20%] ${className}`}>
          <span className="loading loading-spinner loading-lg mx-auto dark:bg-light-color"></span>
      </div>
  )
}
export default Loading