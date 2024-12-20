const Error = ({error, className}) => {
  return (
      <div className={`absolute w-fit left-[50%] -translate-x-2/4  mt-[5%] ${className}`}>
          <div className="text-xl text-red-500 max-sm:text-base">
              <span className='font-semibold'>Error:{' '}</span>
              {error.message}
          </div>
      </div>
  )
}
export default Error