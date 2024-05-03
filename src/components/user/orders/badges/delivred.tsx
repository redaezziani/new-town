const DelivredBadge = () => {
    return (
        <span
            className=' w-fit flex justify-center items-center gap-1 rounded-full border text-green-500 border-green-500/60 bg-green-500/10   text-xs px-4 py-1'
        >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={17} height={17} fill={"none"}>
                <path d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z" stroke="currentColor" strokeWidth="1.5" />
                <path d="M8 12.5L10.5 15L16 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className='capitalize'>
                تم التوصيل
            </span>
        </span>
    )
}

export default DelivredBadge