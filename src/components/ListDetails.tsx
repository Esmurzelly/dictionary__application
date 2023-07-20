import { IPhonetics } from "@/types"
import { IMeaning } from "@/types"
import { PlayCircleIcon } from '@heroicons/react/24/solid';
import { useState } from "react";

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

  const {t} = useTranslation();

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
                      <PlayCircleIcon className="w-6 h-full" onClick={() => playAudio(index)} />
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


        {meanings[0].definitions[0].definition && (
          <ul>
            <h3>{t("Examples")}: </h3>
            {
              examplesInfo ? (
                <>
                  <p>{meanings[0].definitions[0].definition}</p>

                  <button
                    className="mt-2 bg-yellow-600 py-1 rounded-sm w-[200px] text-white"
                    onClick={() => setExamplesInfo(false)}

                  >
                    {t("More")}
                  </button>
                </>
              ) : (
                <>
                  {meanings[0].definitions.map((item, index) => (
                    <li key={index} className="p-2">{item.definition}</li>
                  ))}
                  <button
                    className="mt-2 bg-red-500 py-1 rounded-sm w-[200px] text-white"
                    onClick={() => setExamplesInfo(true)}

                  >
                    {t("Hide")}
                  </button>
                </>
              )
            }
          </ul>
        )}

        {meanings[0].synonyms.length > 0 && (
          <div>
            <h2 className="font-bold">{t('Synonyms')}: </h2>
            <div className="grid grid-cols-3">
              {meanings[0].synonyms.map((item, index) => (
                <p key={index} onClick={() => updateData(item)}>
                  {item}
                </p>
              ))}
            </div>

          </div>
        )}

        {meanings[0].antonyms.length > 0 && (
          <div>
            <h2 className="font-bold">{t('Antonyms')}: </h2>
            {meanings[0].antonyms.map((item, index) => (
              <p key={index} onClick={() => updateData(item)}>
                {item}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default ListDetails