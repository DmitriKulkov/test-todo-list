import { useState } from "react"

const useFetching = (callback) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()

  const fetching = async (...args) => {
    setLoading(true)
    callback(...args)
    .catch((e)=>setError(e))
    .finally(()=>setLoading(false))
  }

  return { fetching, loading, error }
}

export default useFetching;