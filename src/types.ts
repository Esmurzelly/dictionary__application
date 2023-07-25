export interface IPhonetics {
    audio: string,
    text: string,
}

export interface IDefinitions {
    definition: Array<string>,
    synonyms?: Array<string>,
    antonyms?: Array<string>,
    example?: string,
}

export interface IMeaning {
    [x: string]: any;
    partOfSpeech: Array<string>,
    antonyms: Array<string>,
    synonyms: Array<string>,
    definitions: Array<IDefinitions>,
}

export interface IResult {
    word: string, 
    phonetics: Array<IPhonetics>, 
    meanings: Array<IMeaning>,
}


export interface IFormInput {
    fullName: string;
    email: string;
    message: string;
    handleSubmit: () => void
}
