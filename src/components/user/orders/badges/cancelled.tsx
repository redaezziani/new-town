const CancelledBadge = () => {
    return (
        <span
            className=' w-fit flex justify-center items-center gap-1 rounded-full border text-red-500 border-red-500/60 bg-red-500/10   text-xs px-4 py-1'
        >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={17} height={17} fill={"none"}>
                <path d="M15.7494 15L9.75 9M9.75064 15L15.75 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M22.75 12C22.75 6.47715 18.2728 2 12.75 2C7.22715 2 2.75 6.47715 2.75 12C2.75 17.5228 7.22715 22 12.75 22C18.2728 22 22.75 17.5228 22.75 12Z" stroke="currentColor" strokeWidth="1.5" />
            </svg>
            <span className='capitalize'>
                Cancelled
            </span>
        </span>
    )
}

export default CancelledBadge