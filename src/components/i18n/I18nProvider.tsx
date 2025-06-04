import { PropsWithChildren, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useLanguageStore } from '@stores/languageStore';

export default function I18nProvider(props: PropsWithChildren) {
  const { i18n } = useTranslation();
  const lang = useLanguageStore(state => state.lang);

  useEffect(() => {
    i18n.changeLanguage(lang)
  }, [i18n, lang])

  return props.children
}