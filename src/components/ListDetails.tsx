import { IPhonetics } from "@/types"
import { IMeaning } from "@/types"
import { PlayCircleIcon } from '@heroicons/react/24/solid';
import { useState } from "react";
import ReactAudioPlayer from 'react-audio-player';

import { useTranslation } from 'react-i18next';

type Props = {
  word: string,
  phonetics: Array<IPhonetics>,
  meanings: Array<IMeaning>,
  updateData: (value: string) => void;
}

const ListDetails = ({ word, phonetics, meanings, updateData }: Props) => {
  const [expandInfo, setExpandInfo] = useState<boolean[]>(Array(meanings.length).fill(true));
  const [examplesInfo, setExamplesInfo] = useState<boolean>(true);

  const { t } = useTranslation();

  const playAudio = (index: number) => {
    try {
      let audio = new Audio(phonetics[index].audio);
      audio.play();
    } catch (error) {
      console.log('error play:', error)
    }
  };

  const handleToggleExpand = (index: number) => {
    setExpandInfo(prevState => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });
  };

  return (
    <div className="mt-5">
      <div className="flex flex-col justify-start gap-5">
        <div className="flex flex-col">
          <h3>{t("Word")}</h3>
          <div className="flex flex-row justify-between">
            <p>{word}</p>

            <div className="flex flex-col gap-1">
              <ul>
                {meanings.map((meaning, index) => (
                  <li key={index}>{meaning.partOfSpeech}</li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-1">
              <ul>
                {phonetics.map((phonetic, index) => (
                  <li key={index}>{phonetic.text}</li>
                ))}
              </ul>
            </div>

            <div>
              <ul>
                {phonetics.map((phonetic, index) => (
                  <>
                    {phonetic.audio.length > 1 && (
                      // <ReactAudioPlayer
                      //   src={phonetics[index].audio}
                      //   controls
                      //   style={{ backgroundColor: '#f2f2f2'}}
                      // />
                      <PlayCircleIcon className="w-6 h-full cursor-pointer" onClick={() => playAudio(index)} />
                    )}
                  </>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div>
          <h3>{t("Definitions")}: </h3>
          <ul>
            {meanings.map((meaning, index) => (
              <div className="flex flex-col gap-1">
                <li
                  key={index}
                  className="font-bold mt-4"
                >
                  {meaning.partOfSpeech}
                </li>

                <ul className="flex flex-col gap-3 pb-2 border-gray-200 border-b-2">
                  {expandInfo[index] ? (
                    <li className="p-1">
                      <p>{meaning.definitions[0].definition}</p>
                      <button
                        className="mt-2 bg-yellow-600 py-1 rounded-sm w-[200px] text-white"
                        onClick={() => handleToggleExpand(index)}
                      >
                        {t("More")}
                      </button>
                    </li>
                  ) : (
                    <>
                      {meaning.definitions.map((item, subIndex) => (
                        <li
                          className="p-2"
                          key={subIndex}
                        >
                          {item.definition}
                        </li>
                      ))}
                      <button
                        className="mt-2 bg-red-500 py-1 rounded-sm w-[200px] text-white"
                        onClick={() => handleToggleExpand(index)}
                      >
                        {t("Hide")}
                      </button>
                    </>
                  )}
                </ul>
              </div>
            ))}
          </ul>
        </div>


        <div>
          <h3>{t("Examples")}: </h3>
          {examplesInfo ? (
            meanings.map((meaning, meaningIndex) => (
              <div key={meaningIndex}>
                <ul>
                  {meaningIndex === 0 && meaning.definitions[0]?.example && (
                    <>
                      <li>
                        <p>{meaning.definitions[0].example}</p>
                      </li>
                      <button
                        className="mt-2 bg-yellow-600 py-1 rounded-sm w-[200px] text-white"
                        onClick={() => setExamplesInfo(false)}
                      >
                        {t("More")}
                      </button>
                    </>
                  )}
                </ul>
              </div>
            ))
          ) : (
            <>
              {meanings.map((meaning, meaningIndex) => (
                <div key={meaningIndex}>
                  <ul>
                    {meaning.definitions.map((definition, definitionIndex) => (
                      <div key={definitionIndex}>
                        {definition.example && (
                          <li>
                            <p className="p-2">{definition.example}</p>
                          </li>
                        )}
                      </div>
                    ))}
                  </ul>
                </div>
              ))}
              <button
                className="mt-2 bg-red-500 py-1 rounded-sm w-[200px] text-white"
                onClick={() => setExamplesInfo(true)}
              >
                {t("Hide")}
              </button>
            </>
          )}
        </div>



        <div>
          <h2 className="font-bold">{t('Synonyms')}: </h2>
          {meanings.map((meaning, meaningIndex) => (
            meaning.synonyms.length > 1 && (  
              <div key={meaningIndex}>
                <div className="grid grid-cols-3">
                  {meaning.synonyms.map((synonym, synonymIndex) => (
                    <p
                      className="cursor-pointer"
                      key={synonymIndex}
                      onClick={() => updateData(synonym)}
                    >
                      {synonym}
                    </p>
                  ))}
                </div>
              </div>
            )

          ))}
        </div>

        <div>
          <h2 className="font-bold">{t('Antonyms')}: </h2>
          {meanings.map((meaning, meaningIndex) => (
            meaning.antonyms.length > 1 && (
              <div key={meaningIndex}>
                <div className="grid grid-cols-3">
                  {meaning.antonyms.map((antonym, antonymIndex) => (
                    <p
                      className="cursor-pointer"
                      key={antonymIndex}
                      onClick={() => updateData(antonym)}
                    >
                      {antonym}
                    </p>
                  ))}
                </div>
              </div>
            )
          ))}
        </div>
      </div>
    </div>
  )
}

export default ListDetails