const fs = require('fs')
const translate = require('translate')
const languageCodes = require('../src/data/languages/codes.json') // ISO 639-1
const originalWords = require('../src/data/languages/en/words.json')

translate.engine = process.env.TRANSLATE_SERVICE // 'google' or 'yandex'
translate.key = process.env.TRANSLATE_KEY // API key of related service

const defaultLanguage = 'en'
const outputLanguage = process.argv[2]

const getTranslatedWords = async (originalWords, outputLanguage) => {
  const translatedWords = []
  for (let index = 0; index < originalWords.length; index++) {
    const originalWord = originalWords[index].toLowerCase()
    console.log(`Translating ${originalWord}...`)
    const translatedWord = await translate(originalWord, {
      from: defaultLanguage,
      to: outputLanguage
    })
    console.log(`Translated to ${translatedWord.toLowerCase()}.`)
    translatedWords.push(translatedWord.toLowerCase())
  }
  return translatedWords
}

const saveTranslatedWords = (translatedWords, outputLanguage) => fs.writeFile(
  `./src/data/languages/${outputLanguage}/words.json`,
  JSON.stringify(translatedWords, undefined, 2),
  'utf8',
  error => {
    if (error) {
      console.log('An error occured while creating word list.')
      return
    }
    console.log(translatedWords)
    console.log('Word list has been created.')
  }
)

if (
  !outputLanguage ||
  outputLanguage === defaultLanguage ||
  !Object.keys(languageCodes).includes(outputLanguage)
) {
  console.log('Output language is not correct or available.')
  return
}

// Execute
getTranslatedWords(originalWords, outputLanguage)
  .then(translatedWords =>
    saveTranslatedWords(translatedWords, outputLanguage)
  )
