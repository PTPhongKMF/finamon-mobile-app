import { View, Pressable } from 'react-native'
import US from "@assets/flags/US.svg";
import VN from "@assets/flags/VN.svg";
import React from 'react'
import { Divider } from '@components/lib/gluestack-ui/divider';
import clsx from 'clsx';
import { useLanguageStore } from '@stores/languageStore';
import { useShallow } from 'zustand/react/shallow';

export default function AuthPageLangSelector() {
  const { lang, setLang } = useLanguageStore(useShallow(
    state => ({
      lang: state.lang,
      setLang: state.setLang
    })
  ));

  return (
    <View className="flex-row gap-2">
      <Pressable onPress={() => {setLang("en")}}
        className={clsx(
          "border-4 rounded-md p-1",
          lang === "en" ? "border-blue-600" : "border-transparent"
        )}>
        <US width={30} height={20} />
      </Pressable>

      <Divider orientation="vertical" className="bg-black" />

      <Pressable onPress={() => {setLang("vi")}}
        className={clsx(
          "border-4 rounded-md p-1",
          lang === "vi" ? "border-blue-600" : "border-transparent"
        )}>
        <VN width={30} height={20} />
      </Pressable>
    </View>
  )
}