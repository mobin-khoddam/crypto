const Error = ({error, className}) => {
  return (
      <div className={`h-full flex justify-center items-center mt-[20%] ${className}`}>
          <div className="text-xl text-red-500">
              <span className='font-semibold'>Error:{' '}</span>
              {error.message}
          </div>
      </div>
  )
}
export default Error