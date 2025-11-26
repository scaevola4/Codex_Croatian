import { Curriculum } from '../types';

export const localCurriculum: Curriculum = {
  id: 'cefr-a1-starter',
  title: 'Croatian A1 Starter',
  level: 'A1',
  modules: [
    {
      id: 'greetings',
      title: 'Pozdravi i upoznavanje',
      objectives: ['Say hello and goodbye', 'Introduce yourself', 'Ask how someone is'],
      vocab: [
        { id: 'bok', word: 'bok', translation: 'hi', example: 'Bok, kako si?' },
        { id: 'dobar_dan', word: 'dobar dan', translation: 'good day', example: 'Dobar dan, gospodine.' },
        { id: 'zdravo', word: 'zdravo', translation: 'hello', example: 'Zdravo svima!' },
        { id: 'kako_si', word: 'kako si?', translation: 'how are you?', example: 'Bok Ana, kako si danas?' }
      ],
      grammar: [
        {
          id: 'formal_informal',
          title: 'Formalni i neformalni pozdravi',
          content: 'Koristite "bok" ili "zdravo" u neformalnim situacijama, a "dobar dan" u formalnim.'
        }
      ]
    },
    {
      id: 'coffee-order',
      title: 'Narudžba kave',
      objectives: ['Order drinks politely', 'Ask for prices', 'Use please/thank you'],
      vocab: [
        { id: 'molim', word: 'molim', translation: 'please / you are welcome', example: 'Jednu kavu, molim.' },
        { id: 'hvala', word: 'hvala', translation: 'thank you', example: 'Hvala na pomoći.' },
        { id: 'koliko_kosta', word: 'koliko košta?', translation: 'how much does it cost?', example: 'Koliko košta cappuccino?' },
        { id: 'racun', word: 'račun', translation: 'bill', example: 'Mogu li dobiti račun, molim?' }
      ],
      grammar: [
        {
          id: 'polite_requests',
          title: 'Ljubazni zahtjevi',
          content: 'Dodajte "molim" i koristite infinitiv ili imenicu: "Jednu kavu, molim."'
        }
      ]
    },
    {
      id: 'directions',
      title: 'Upute i kretanje',
      objectives: ['Ask for directions', 'Understand left/right/straight', 'Confirm locations'],
      vocab: [
        { id: 'lijevo', word: 'lijevo', translation: 'left', example: 'Skrenite lijevo kod semafora.' },
        { id: 'desno', word: 'desno', translation: 'right', example: 'S desne strane je banka.' },
        { id: 'ravno', word: 'ravno', translation: 'straight', example: 'Idite ravno dvjesto metara.' },
        { id: 'gdje_je', word: 'gdje je...?', translation: 'where is...?', example: 'Gdje je najbliža apoteka?' }
      ],
      grammar: [
        {
          id: 'imperatives',
          title: 'Imperativi za upute',
          content: 'Za osnovne upute koristite imperativ: "Skrenite lijevo" (formalno) ili "Skrni lijevo" (neformalno).'
        }
      ]
    }
  ]
};
