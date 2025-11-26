import { DialogScenario } from '../types';

export const dialogScenarios: DialogScenario[] = [
  {
    id: 'greeting-chat',
    title: 'Prvi susret',
    rubric: 'Jasno izgovorite pozdrave i odgovorite na "kako si" s kratkom rečenicom.',
    turns: [
      { speaker: 'bot', text: 'Bok! Kako se zoveš?' },
      { speaker: 'user', text: '' },
      { speaker: 'bot', text: 'Drago mi je. Kako si danas?' },
      { speaker: 'user', text: '' },
      { speaker: 'bot', text: 'Odlično. Odakle si?' }
    ]
  },
  {
    id: 'coffee-order',
    title: 'Narudžba u kafiću',
    rubric: 'Koristite ljubazne izraze poput "molim" i "hvala" dok naručujete.',
    turns: [
      { speaker: 'bot', text: 'Dobar dan! Što želite popiti?' },
      { speaker: 'user', text: '' },
      { speaker: 'bot', text: 'Još nešto uz to?' },
      { speaker: 'user', text: '' },
      { speaker: 'bot', text: 'Ukupno je 3 eura. Hvala!' }
    ]
  }
];
