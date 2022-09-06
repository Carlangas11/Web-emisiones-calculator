import { Button, ButtonGroup } from '@chakra-ui/button'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

const LocaleOptions = () => {
  const { locales, locale } = useRouter()
  const { t } = useTranslation(['common'])

  if (!locales || !locale) return null

  return (
    <>
      <span className="pr-3">{t('language')}:</span>
      <ButtonGroup size="sm" isAttached variant="outline">
        {locales.map(loc => (
          <form
            action="/api/language"
            method="POST"
            key={loc}
            className="inline-block">
            <input name="preferredLocale" value={loc} type="hidden"></input>
            <Button m={1} type="submit" className="ml-1">
              {loc}
            </Button>
          </form>
        ))}
      </ButtonGroup>
    </>
  )
}

export default LocaleOptions
