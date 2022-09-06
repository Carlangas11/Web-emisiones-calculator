import { IncomingMessage } from 'http'
import cookie from 'cookie'
import jscookie from 'js-cookie'
import { NextApiRequestCookies } from 'next/dist/server/api-utils'

export const setObjectOnCookie = <T>(name: string, obj: T): boolean => {
  jscookie.set(name, JSON.stringify(obj))

  return true
}

export const getCookie = (
  req: IncomingMessage & {
    cookies: NextApiRequestCookies
  },
  cookieName: string
) => {
  const cookies = cookie.parse(req ? req.headers.cookie || '' : document.cookie)

  return cookies[cookieName] || {}
}
