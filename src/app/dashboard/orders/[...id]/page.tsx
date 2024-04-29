import { Params } from 'next/dist/shared/lib/router/utils/route-matcher'
import React from 'react'

const page = ({...params} : any) => {
  const id = params.params.id[0]
  return (
    <div>

    </div>
  )
}

export default page