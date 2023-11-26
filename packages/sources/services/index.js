import useragent from 'express-useragent'

export function extractUserAgent (ua) {
  const userAgentOrigin = useragent.parse(ua)
  const regex = /^is/gm
  const uaAnalyze = Object
    .entries(userAgentOrigin)
    .filter(([key, value]) => {
      const acceptedEntries = {}
      if (key.match(regex) && value) {
        acceptedEntries.key = value
        return acceptedEntries
      } else if (!key.match(regex) && key !== 'geoIp' && key !== 'source' && value !== '') {
        acceptedEntries.key = value
        return acceptedEntries
      }

      return null
    })

  return Object.fromEntries(uaAnalyze)
}
