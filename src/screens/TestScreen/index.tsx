import React from 'react'
import { useTranslation } from 'react-i18next'
export default function TestScreen() {
    const {t, i18n} = useTranslation()
    return (
        <div>
           <div>
           {t('description.part1')}
           </div>
           <button onClick={() => {
               i18n.changeLanguage('jp')
           }}>change</button>
        </div>
        
    )
}
