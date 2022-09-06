import { CookieSerializeOptions, serialize } from 'cookie'
import { NextApiHandler, NextApiResponse } from 'next'

const DEFAULT_LOCALE = 'es'
const PREFERRED_LOCALE_COOKIE = 'NEXT_LOCALE' || DEFAULT_LOCALE

const setCookie = (
  res: NextApiResponse,
  name: string,
  value: unknown,
  options: CookieSerializeOptions = {
    maxAge: 1000
  }
) => {
  const stringValue =
    typeof value === 'object' ? `j:${JSON.stringify(value)}` : String(value)

  if (options.maxAge) {
    options.expires = new Date(Date.now() + options.maxAge)
    options.maxAge /= 1000
  }

  res.setHeader('Set-Cookie', serialize(name, String(stringValue), options))
}

const language: NextApiHandler = (request, response) => {
  if (request.method === 'GET') {
    const preferredLocale = request.cookies[PREFERRED_LOCALE_COOKIE] || ''

    return response.status(200).json({
      preferredLocale,
      defaultLocale: DEFAULT_LOCALE
    })
  }

  if (request.method === 'POST') {
    const newPreferredLocale = request.body.preferredLocale as
      | string
      | undefined

    setCookie(response, PREFERRED_LOCALE_COOKIE, newPreferredLocale, {
      path: '/'
    })

    response.redirect('/')

    return response.end()
  }

  response.status(405).end()
}

export default language
