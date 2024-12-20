const Loading = ({className}) => {
  return (
      <div className={`absolute w-fit left-[50%] -translate-x-2/4 mt-[5%] ${className}`}>
          <span className="loading loading-spinner loading-lg mx-auto dark:bg-light-color"></span>
      </div>
  )
}
export default Loading