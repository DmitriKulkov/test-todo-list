import { useCallback, useState, useRef } from "react"
/**
 * Custom hook for fetch processing
 * @param {Function} callback - Function for processing 
 * @returns {{fetching: Function, loading: boolean, error: Error}}
 */
const useFetching = (callback) => {
  const cbRef = useRef(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState()

  if (!cbRef.current) 
  cbRef.current = (...args) => {
    setLoading(true)
    callback(...args)
    .catch((e)=>setError(e))
    .finally(()=>setLoading(false))

  }

  return { fetching: cbRef.current, loading, error }
}

export default useFetching;