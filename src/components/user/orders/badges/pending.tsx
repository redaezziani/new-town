const PandingBadge = () => {
  return (
    <span
      className=' w-fit flex justify-center items-center gap-1 rounded-full border text-orange-500 border-orange-500/60 bg-orange-500/10   text-xs px-4 py-1'
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={17} height={17} fill={"none"}>
        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C7.52232 2 3.77426 4.94289 2.5 9H5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 8V12L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M2 12C2 12.3373 2.0152 12.6709 2.04494 13M9 22C8.6584 21.8876 8.32471 21.7564 8 21.6078M3.20939 17C3.01655 16.6284 2.84453 16.2433 2.69497 15.8462M4.83122 19.3065C5.1369 19.6358 5.46306 19.9441 5.80755 20.2292" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className='capitalize'>pending</span>
    </span>
  )
}

export default PandingBadge