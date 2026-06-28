// ─── GERMAN NOTES DATA — sourced from A1–B2 Complete Notes PDF ────────────────

export interface NoteSection {
  id: string;
  title: string;
  content: NoteBlock[];
}

export interface NoteBlock {
  type: 'text' | 'table' | 'tip' | 'example' | 'list' | 'subheading';
  text?: string;
  rows?: string[][];
  headers?: string[];
  items?: string[];
}

export interface NoteChapter {
  id: string;
  title: string;
  level: 'A1' | 'A2' | 'B1' | 'B2' | 'Reference';
  icon: string;
  sections: NoteSection[];
}

export const noteChapters: NoteChapter[] = [
  // ═══════════════════════════════════════════════════════════
  // A1 CHAPTERS
  // ═══════════════════════════════════════════════════════════
  {
    id: 'a1-alphabet',
    title: 'Alphabet & Pronunciation',
    level: 'A1',
    icon: '🔤',
    sections: [
      {
        id: 'alphabet',
        title: '1.1 The German Alphabet',
        content: [
          { type: 'text', text: 'German uses the same 26 letters as English plus 4 special characters: ä, ö, ü, ß. Pronunciation is very regular — once you learn the rules, you can read any German word aloud correctly.' },
          {
            type: 'table',
            headers: ['Letter', 'Pronunciation', 'Memory Hook'],
            rows: [
              ['A a', 'ah — like "father"', 'der Apfel (apple)'],
              ['B b', 'beh', 'das Buch (book)'],
              ['C c', 'tseh — "ts" before e/i, "k" before a/o/u', 'der Computer'],
              ['D d', 'deh', 'danke (thank you)'],
              ['E e', 'eh — like "say" (short: like "bed")', 'das Ei (egg)'],
              ['F f', 'eff', 'die Familie (family)'],
              ['G g', 'geh — like "good", never soft', 'gut (good)'],
              ['H h', 'hah — breathy; silent after vowels', 'Hallo'],
              ['I i', 'ih — like "see" (short: like "bit")', 'ich (I)'],
              ['J j', 'yot — like "y" in "yes"', 'ja (yes)'],
              ['K k', 'kah', 'die Katze (cat)'],
              ['L l', 'ell', 'lecker (delicious)'],
              ['M m', 'emm', 'die Mutter (mother)'],
              ['N n', 'enn', 'nein (no)'],
              ['O o', 'oh — like "more" (short: like "hot")', 'das Obst (fruit)'],
              ['P p', 'peh', 'der Pass (passport)'],
              ['Q q', 'koo — always followed by "u", sounds "kv"', 'die Quelle (source)'],
              ['R r', 'err — guttural, made in throat (like French r)', 'rot (red)'],
              ['S s', 'ess — like "z" before vowels; "s" elsewhere', 'die Sonne (sun)'],
              ['T t', 'teh', 'der Tisch (table)'],
              ['U u', 'oo — like "moon" (short: like "put")', 'die Uhr (clock)'],
              ['V v', 'fow — like "f" in "father" (not "v"!)', 'der Vater (father)'],
              ['W w', 'veh — like "v" in "voice"', 'das Wasser (water)'],
              ['X x', 'iks — like "ks" in "fox"', 'das Xylophon'],
              ['Y y', 'üpsilon — like German ü (rare, loanwords)', 'der Typ (type/guy)'],
              ['Z z', 'tset — like "ts" in "bits"', 'der Zug (train)'],
            ],
          },
          { type: 'subheading', text: 'Special Characters' },
          {
            type: 'table',
            headers: ['Character', 'Pronunciation', 'Example'],
            rows: [
              ['Ä ä', 'eh (Umlaut) — like "e" in "bed"', 'der Bär (bear)'],
              ['Ö ö', 'öh (Umlaut) — like "u" in "burn", rounded lips', 'schön (beautiful)'],
              ['Ü ü', 'üh (Umlaut) — like "ee" with rounded lips', 'tschüss (bye)'],
              ['ß (Eszett)', 'ess-tset — like double "ss", only lowercase, only in German', 'die Straße (street)'],
            ],
          },
          { type: 'tip', text: 'ß is never capitalised — it always stays ß (or SS when typing in caps).' },
        ],
      },
      {
        id: 'pronunciation',
        title: '1.3 Key Pronunciation Rules',
        content: [
          {
            type: 'table',
            headers: ['Rule', 'Pronunciation', 'Examples'],
            rows: [
              ['ie', 'long ee', 'lieben, Liebe, viel'],
              ['ei', 'long eye', 'nein, Stein, mein'],
              ['eu / äu', 'oy', 'neu, Leute, Häuser'],
              ['au', 'ow', 'auch, kaufen, blau'],
              ['ch after a/o/u', 'hard ch (throat)', 'Bach, noch, Buch'],
              ['ch after e/i/ä/ö/ü', 'soft ch (like "huge")', 'ich, nicht, Bücher'],
              ['sch', 'sh', 'Schule, schön, waschen'],
              ['sp- / st- (start of word)', 'shp / sht', 'Spaß, spielen, Straße'],
              ['qu', 'kv', 'Qualität, Quelle'],
              ['-ig (end of word)', 'ich-sound (south Germany: ik)', 'richtig, fertig, lustig'],
              ['v in German words', 'f', 'Vater, von, viel'],
              ['w', 'v-sound', 'Wasser, wir, wohnen'],
              ['z', 'ts', 'Zeit, Zug, zehn'],
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'a1-greetings',
    title: 'Greetings & Introductions',
    level: 'A1',
    icon: '👋',
    sections: [
      {
        id: 'greetings',
        title: '2.1 Greetings',
        content: [
          {
            type: 'table',
            headers: ['German', 'English', 'Usage'],
            rows: [
              ['Guten Morgen!', 'Good morning!', 'Until about noon'],
              ['Guten Tag!', 'Good day!', 'Formal daytime greeting'],
              ['Guten Abend!', 'Good evening!', 'From late afternoon'],
              ['Hallo!', 'Hello!', 'Informal, any time'],
              ['Servus!', 'Hi! / Bye! (Bavaria/Austria)', 'Very informal'],
              ['Grüß Gott!', 'God bless you (Hello)', 'Bavaria & Austria'],
              ['Moin!', 'Hi!', 'Northern Germany'],
              ['Auf Wiedersehen!', 'Goodbye! (formal)', 'Formal farewell'],
              ['Tschüss!', 'Bye!', 'Informal farewell'],
              ['Bis bald!', 'See you soon!', 'Casual parting'],
              ['Bis morgen!', 'See you tomorrow!', 'Next-day parting'],
              ['Wie geht es Ihnen?', 'How are you? (formal)', 'Formal — use with Sie'],
              ['Wie geht es dir?', 'How are you? (informal)', 'Informal — use with du'],
              ['Mir geht es gut, danke.', 'I am fine, thank you.', 'Standard reply'],
              ['Nicht schlecht.', 'Not bad.', 'Casual positive reply'],
              ['Es geht so.', 'So-so / OK.', 'Neutral reply'],
            ],
          },
          { type: 'tip', text: 'In Germany, use "Sie" (formal) with strangers, officials, and older people. Use "du" (informal) with friends, family, children, and colleagues who invite it.' },
        ],
      },
      {
        id: 'introductions',
        title: '2.2 Introducing Yourself',
        content: [
          {
            type: 'table',
            headers: ['German', 'English'],
            rows: [
              ['Wie heißen Sie?', 'What is your name? (formal)'],
              ['Wie heißt du?', 'What is your name? (informal)'],
              ['Ich heiße [Name].', 'My name is [Name].'],
              ['Mein Name ist [Name].', 'My name is [Name]. (more formal)'],
              ['Woher kommen Sie?', 'Where are you from? (formal)'],
              ['Woher kommst du?', 'Where are you from? (informal)'],
              ['Ich komme aus [Land].', 'I come from [country].'],
              ['Ich bin aus [Stadt].', 'I am from [city].'],
              ['Wo wohnen Sie?', 'Where do you live?'],
              ['Ich wohne in [Stadt].', 'I live in [city].'],
              ['Was sind Sie von Beruf?', 'What is your profession? (formal)'],
              ['Ich bin [Beruf].', 'I am a [profession].'],
              ['Ich lerne Deutsch.', 'I am learning German.'],
              ['Ich spreche ein bisschen Deutsch.', 'I speak a little German.'],
              ['Freut mich!', 'Nice to meet you!'],
              ['Sehr angenehm.', 'Very pleased to meet you. (formal)'],
            ],
          },
        ],
      },
      {
        id: 'nationalities',
        title: '3.1 Countries & Nationalities',
        content: [
          {
            type: 'table',
            headers: ['Country (das Land)', 'Nationality (masc)', 'Nationality (fem)'],
            rows: [
              ['Deutschland', 'Deutscher', 'Deutsche'],
              ['Österreich', 'Österreicher', 'Österreicherin'],
              ['die Schweiz', 'Schweizer', 'Schweizerin'],
              ['Indien', 'Inder', 'Inderin'],
              ['England / Großbritannien', 'Engländer / Brite', 'Engländerin / Britin'],
              ['Amerika / die USA', 'Amerikaner', 'Amerikanerin'],
              ['Frankreich', 'Franzose', 'Französin'],
              ['Spanien', 'Spanier', 'Spanierin'],
              ['Italien', 'Italiener', 'Italienerin'],
              ['China', 'Chinese', 'Chinesin'],
              ['Japan', 'Japaner', 'Japanerin'],
              ['Türkei', 'Türke', 'Türkin'],
              ['Polen', 'Pole', 'Polin'],
              ['Russland', 'Russe', 'Russin'],
            ],
          },
          { type: 'tip', text: 'Nationalities change ending for female: Inder → Inderin, Deutscher → Deutsche.' },
        ],
      },
    ],
  },
  {
    id: 'a1-numbers',
    title: 'Numbers, Time & Dates',
    level: 'A1',
    icon: '🔢',
    sections: [
      {
        id: 'numbers',
        title: '4.1 Numbers 0–100',
        content: [
          {
            type: 'table',
            headers: ['Number', 'German', 'Number', 'German'],
            rows: [
              ['0', 'null', '11', 'elf'],
              ['1', 'ein / eins', '12', 'zwölf'],
              ['2', 'zwei', '13', 'dreizehn'],
              ['3', 'drei', '14', 'vierzehn'],
              ['4', 'vier', '15', 'fünfzehn'],
              ['5', 'fünf', '16', 'sechzehn'],
              ['6', 'sechs', '17', 'siebzehn'],
              ['7', 'sieben', '18', 'achtzehn'],
              ['8', 'acht', '19', 'neunzehn'],
              ['9', 'neun', '20', 'zwanzig'],
              ['10', 'zehn', '21', 'einundzwanzig'],
              ['30', 'dreißig', '40', 'vierzig'],
              ['50', 'fünfzig', '60', 'sechzig'],
              ['70', 'siebzig', '80', 'achtzig'],
              ['90', 'neunzig', '100', 'hundert'],
            ],
          },
          { type: 'tip', text: 'German numbers after 20 say the units FIRST: 21 = einundzwanzig (one-and-twenty). 45 = fünfundvierzig.' },
          { type: 'subheading', text: '4.2 Ordinal Numbers' },
          {
            type: 'table',
            headers: ['Number', 'Ordinal (German)', 'English'],
            rows: [
              ['1st', 'erste(r/s)', 'first'],
              ['2nd', 'zweite(r/s)', 'second'],
              ['3rd', 'dritte(r/s)', 'third'],
              ['4th', 'vierte(r/s)', 'fourth'],
              ['7th', 'siebte(r/s)', 'seventh'],
              ['20th', 'zwanzigste(r/s)', 'twentieth'],
              ['21st', 'einundzwanzigste(r/s)', 'twenty-first'],
            ],
          },
          { type: 'tip', text: 'Rule: 2–19 → add -te. 20+ → add -ste. Exceptions: erste (1st), dritte (3rd), siebte (7th), achte (8th).' },
        ],
      },
      {
        id: 'time',
        title: '4.3 Telling the Time',
        content: [
          {
            type: 'table',
            headers: ['Time', 'Formal (24h)', 'Informal (colloquial)'],
            rows: [
              ['8:00', 'Es ist acht Uhr.', 'acht Uhr'],
              ['8:15', 'Es ist acht Uhr fünfzehn.', 'Viertel nach acht'],
              ['8:30', 'Es ist acht Uhr dreißig.', 'halb neun (half to nine!)'],
              ['8:45', 'Es ist acht Uhr fünfundvierzig.', 'Viertel vor neun'],
              ['12:00', 'Es ist zwölf Uhr.', 'Mittag (noon) / Mitternacht (midnight)'],
            ],
          },
          { type: 'tip', text: '"halb neun" (half nine) means 8:30, NOT 9:30! It means "half before nine". This confuses many English speakers.' },
          { type: 'subheading', text: 'Days of the Week (Wochentage)' },
          {
            type: 'table',
            headers: ['German', 'English', 'Abbreviation'],
            rows: [
              ['Montag', 'Monday', 'Mo'],
              ['Dienstag', 'Tuesday', 'Di'],
              ['Mittwoch', 'Wednesday', 'Mi'],
              ['Donnerstag', 'Thursday', 'Do'],
              ['Freitag', 'Friday', 'Fr'],
              ['Samstag / Sonnabend', 'Saturday', 'Sa'],
              ['Sonntag', 'Sunday', 'So'],
            ],
          },
          { type: 'subheading', text: 'Months (Monate)' },
          {
            type: 'table',
            headers: ['German', 'English', 'German', 'English'],
            rows: [
              ['Januar', 'January', 'Juli', 'July'],
              ['Februar', 'February', 'August', 'August'],
              ['März', 'March', 'September', 'September'],
              ['April', 'April', 'Oktober', 'October'],
              ['Mai', 'May', 'November', 'November'],
              ['Juni', 'June', 'Dezember', 'December'],
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'a1-grammar',
    title: 'A1 Grammar Complete',
    level: 'A1',
    icon: '📐',
    sections: [
      {
        id: 'articles',
        title: '8.1 Articles — der, die, das',
        content: [
          { type: 'text', text: 'Every German noun has a grammatical gender: masculine (der), feminine (die) or neuter (das). This must be memorised with each noun!' },
          {
            type: 'table',
            headers: ['Article', 'Gender', 'Examples'],
            rows: [
              ['der', 'Masculine', 'der Mann (man), der Hund (dog), der Tisch (table)'],
              ['die', 'Feminine', 'die Frau (woman), die Katze (cat), die Schule (school)'],
              ['das', 'Neuter', 'das Kind (child), das Buch (book), das Auto (car)'],
              ['die (pl)', 'Plural (all genders)', 'die Männer, die Frauen, die Kinder'],
            ],
          },
          {
            type: 'tip',
            text: 'Indefinite articles: ein (masc/neut), eine (fem) — ein Mann, ein Kind, eine Frau. Negative: kein/keine (no, not a) — kein Mann, keine Frau, kein Kind.',
          },
        ],
      },
      {
        id: 'pronouns',
        title: '8.2 Personal Pronouns',
        content: [
          {
            type: 'table',
            headers: ['Pronoun', 'Meaning', 'Example'],
            rows: [
              ['ich', 'I', 'Ich heiße Maria.'],
              ['du', 'you (informal)', 'Du bist nett.'],
              ['er', 'he', 'Er kommt aus Indien.'],
              ['sie', 'she', 'Sie lernt Deutsch.'],
              ['es', 'it', 'Es ist kalt.'],
              ['wir', 'we', 'Wir sprechen Deutsch.'],
              ['ihr', 'you all (informal)', 'Ihr seid müde.'],
              ['sie', 'they', 'Sie arbeiten viel.'],
              ['Sie', 'You (formal)', 'Wie heißen Sie?'],
            ],
          },
        ],
      },
      {
        id: 'sein',
        title: '8.3 sein (to be)',
        content: [
          {
            type: 'table',
            headers: ['Pronoun', 'sein', 'Example'],
            rows: [
              ['ich', 'bin', 'Ich bin müde. (I am tired.)'],
              ['du', 'bist', 'Du bist nett. (You are nice.)'],
              ['er/sie/es', 'ist', 'Er ist Arzt. (He is a doctor.)'],
              ['wir', 'sind', 'Wir sind hier. (We are here.)'],
              ['ihr', 'seid', 'Ihr seid jung. (You all are young.)'],
              ['sie/Sie', 'sind', 'Sie sind nett. (They/You are nice.)'],
            ],
          },
        ],
      },
      {
        id: 'haben',
        title: '8.4 haben (to have)',
        content: [
          {
            type: 'table',
            headers: ['Pronoun', 'haben', 'Example'],
            rows: [
              ['ich', 'habe', 'Ich habe Hunger. (I am hungry.)'],
              ['du', 'hast', 'Du hast ein Buch. (You have a book.)'],
              ['er/sie/es', 'hat', 'Er hat Zeit. (He has time.)'],
              ['wir', 'haben', 'Wir haben Geld. (We have money.)'],
              ['ihr', 'habt', 'Ihr habt Recht. (You are right.)'],
              ['sie/Sie', 'haben', 'Sie haben Fragen. (They have questions.)'],
            ],
          },
        ],
      },
      {
        id: 'present-tense',
        title: '8.5 Present Tense — Regular Verbs',
        content: [
          { type: 'text', text: 'Regular verbs follow a predictable pattern. Take the stem (infinitive minus -en) and add the endings:' },
          {
            type: 'table',
            headers: ['Pronoun', 'Ending', 'lernen (to learn)', 'wohnen (to live)', 'arbeiten (to work)'],
            rows: [
              ['ich', '-e', 'lerne', 'wohne', 'arbeite'],
              ['du', '-st', 'lernst', 'wohnst', 'arbeitest'],
              ['er/sie/es', '-t', 'lernt', 'wohnt', 'arbeitet'],
              ['wir', '-en', 'lernen', 'wohnen', 'arbeiten'],
              ['ihr', '-t', 'lernt', 'wohnt', 'arbeitet'],
              ['sie/Sie', '-en', 'lernen', 'wohnen', 'arbeiten'],
            ],
          },
          { type: 'tip', text: 'If the stem ends in -t or -d (arbeit-, find-), add an extra "e" before -st and -t: du arbeitest, er arbeitet.' },
        ],
      },
      {
        id: 'irregular-verbs',
        title: '8.6 Common Irregular Verbs',
        content: [
          {
            type: 'table',
            headers: ['Infinitive', 'ich', 'du', 'er/sie/es', 'wir / sie / Sie', 'ihr'],
            rows: [
              ['fahren (drive)', 'fahre', 'fährst', 'fährt', 'fahren', 'fahrt'],
              ['laufen (run)', 'laufe', 'läufst', 'läuft', 'laufen', 'lauft'],
              ['lesen (read)', 'lese', 'liest', 'liest', 'lesen', 'lest'],
              ['sehen (see)', 'sehe', 'siehst', 'sieht', 'sehen', 'seht'],
              ['sprechen (speak)', 'spreche', 'sprichst', 'spricht', 'sprechen', 'sprecht'],
              ['nehmen (take)', 'nehme', 'nimmst', 'nimmt', 'nehmen', 'nehmt'],
              ['essen (eat)', 'esse', 'isst', 'isst', 'essen', 'esst'],
              ['geben (give)', 'gebe', 'gibst', 'gibt', 'geben', 'gebt'],
              ['wissen (know)', 'weiß', 'weißt', 'weiß', 'wissen', 'wisst'],
              ['werden (become)', 'werde', 'wirst', 'wird', 'werden', 'werdet'],
            ],
          },
          { type: 'tip', text: 'Many irregular verbs change a → ä or e → i/ie in the du and er/sie/es forms. Learn these by heart!' },
        ],
      },
      {
        id: 'modal-verbs',
        title: '8.7 Modal Verbs',
        content: [
          { type: 'text', text: 'Modal verbs express ability, permission, obligation, or desire. Structure: Modal (position 2) + infinitive (END of sentence).' },
          {
            type: 'table',
            headers: ['Infinitive', 'Meaning', 'ich', 'du', 'er/sie/es', 'wir/sie/Sie', 'ihr'],
            rows: [
              ['können', 'can / be able to', 'kann', 'kannst', 'kann', 'können', 'könnt'],
              ['müssen', 'must / have to', 'muss', 'musst', 'muss', 'müssen', 'müsst'],
              ['dürfen', 'may / be allowed to', 'darf', 'darfst', 'darf', 'dürfen', 'dürft'],
              ['wollen', 'want to', 'will', 'willst', 'will', 'wollen', 'wollt'],
              ['sollen', 'should / supposed to', 'soll', 'sollst', 'soll', 'sollen', 'sollt'],
              ['mögen', 'to like', 'mag', 'magst', 'mag', 'mögen', 'mögt'],
              ['möchten', 'would like to', 'möchte', 'möchtest', 'möchte', 'möchten', 'möchtet'],
            ],
          },
          {
            type: 'example',
            text: 'Ich kann Deutsch sprechen. (I can speak German.) • Ich muss jetzt gehen. (I must go now.) • Ich möchte einen Kaffee. (I would like a coffee.)',
          },
          { type: 'tip', text: 'After modal verbs, NO "zu" before the infinitive. ✓ Ich muss lernen. ✗ Ich muss zu lernen.' },
        ],
      },
      {
        id: 'cases',
        title: '8.8 German Cases — Introduction',
        content: [
          { type: 'text', text: 'German has 4 cases. At A1 you need Nominative and Accusative. Dative starts at A2. Genitive at B1.' },
          {
            type: 'table',
            headers: ['Case', 'Function', 'Level', 'Example'],
            rows: [
              ['Nominative', 'Subject (who does the action)', 'A1', 'Der Mann kauft Brot.'],
              ['Accusative', 'Direct object (who/what receives the action)', 'A1', 'Ich kaufe den Apfel.'],
              ['Dative', 'Indirect object (to/for whom)', 'A2', 'Ich gebe dem Kind Brot.'],
              ['Genitive', 'Possession', 'B1', 'Das Auto des Mannes.'],
            ],
          },
          { type: 'subheading', text: 'Article Changes in Accusative' },
          {
            type: 'table',
            headers: ['Case', 'Masc (der)', 'Fem (die)', 'Neut (das)', 'Plural (die)'],
            rows: [
              ['Nominative', 'der', 'die', 'das', 'die'],
              ['Accusative', 'den ⚡', 'die', 'das', 'die'],
            ],
          },
          { type: 'tip', text: 'Only masculine changes in Accusative: der → den. Everything else stays the same!' },
        ],
      },
      {
        id: 'negation',
        title: '8.10 Negation: nicht & kein',
        content: [
          {
            type: 'table',
            headers: ['Word', 'Rule', 'Example'],
            rows: [
              ['nicht', 'negates verbs and adjectives', 'Ich verstehe nicht. / Ich bin nicht müde.'],
              ['kein / keine', 'negates nouns (replaces ein/eine)', 'Ich habe kein Geld. / Ich habe keine Zeit.'],
            ],
          },
          { type: 'tip', text: 'Rule: Use KEIN with nouns that have ein/eine or no article. Use NICHT for everything else.' },
        ],
      },
      {
        id: 'question-words',
        title: '8.11 Question Words (W-Fragen)',
        content: [
          {
            type: 'table',
            headers: ['Question Word', 'Meaning', 'Example'],
            rows: [
              ['Wer?', 'Who?', 'Wer bist du?'],
              ['Was?', 'What?', 'Was machst du?'],
              ['Wo?', 'Where?', 'Wo wohnst du?'],
              ['Woher?', 'Where from?', 'Woher kommst du?'],
              ['Wohin?', 'Where to?', 'Wohin gehst du?'],
              ['Wann?', 'When?', 'Wann kommst du?'],
              ['Wie?', 'How?', 'Wie geht es dir?'],
              ['Wie viel?', 'How much?', 'Wie viel kostet das?'],
              ['Wie viele?', 'How many?', 'Wie viele Kinder hast du?'],
              ['Warum?', 'Why?', 'Warum lernst du Deutsch?'],
              ['Welche(r/s)?', 'Which?', 'Welches Buch liest du?'],
            ],
          },
        ],
      },
      {
        id: 'word-order',
        title: '8.12 Word Order',
        content: [
          { type: 'text', text: 'Rule 1: The verb is ALWAYS in position 2 (second element), not necessarily second word.' },
          {
            type: 'example',
            text: 'Ich lerne heute Deutsch. ✓\nHeute lerne ich Deutsch. ✓ (verb still position 2!)\nDeutsch lerne ich heute. ✓ (verb still position 2!)',
          },
          { type: 'text', text: 'Rule 2: With modal verbs, infinitive goes to the END.' },
          { type: 'example', text: 'Ich muss heute Deutsch lernen. (I must learn German today.)' },
          { type: 'text', text: 'Rule 3: In yes/no questions, verb comes FIRST.' },
          { type: 'example', text: 'Lernst du Deutsch? (Are you learning German?) Kommst du heute? (Are you coming today?)' },
          { type: 'tip', text: 'In subordinate clauses (weil, dass, wenn…), the verb goes to the very END of the clause.' },
        ],
      },
    ],
  },
  // ═══════════════════════════════════════════════════════════
  // A2 CHAPTERS
  // ═══════════════════════════════════════════════════════════
  {
    id: 'a2-grammar',
    title: 'A2 Grammar Complete',
    level: 'A2',
    icon: '📐',
    sections: [
      {
        id: 'perfekt',
        title: '13.1 Perfekt — Talking About the Past',
        content: [
          { type: 'text', text: 'Perfekt is used in SPOKEN German to talk about the past. Structure: haben / sein (position 2) + past participle (END of sentence).' },
          {
            type: 'example',
            text: 'Ich habe Deutsch gelernt. (I learned German.)\nEr hat ein Buch gelesen. (He read a book.)\nWir sind nach Berlin gefahren. (We went to Berlin.)\nSie ist aufgestanden. (She got up.)',
          },
          { type: 'subheading', text: 'Forming the Past Participle' },
          {
            type: 'table',
            headers: ['Type', 'Rule', 'Examples'],
            rows: [
              ['Regular verbs', 'ge- + stem + -t', 'lernen → gelernt, machen → gemacht'],
              ['Irregular verbs', 'ge- + stem (changes) + -en', 'fahren → gefahren, schreiben → geschrieben'],
              ['Verbs ending -ieren', 'no ge-, stem + -t', 'studieren → studiert, telefonieren → telefoniert'],
              ['Separable verbs', 'ge- goes between prefix and stem', 'aufstehen → aufgestanden'],
            ],
          },
          { type: 'subheading', text: 'When to use sein instead of haben' },
          {
            type: 'list',
            items: [
              'Movement verbs: gehen, fahren, fliegen, kommen, laufen, reisen',
              'State-change verbs: werden, sterben, wachsen, einschlafen, aufwachen',
              'The verbs "sein" and "bleiben" themselves',
            ],
          },
        ],
      },
      {
        id: 'dative',
        title: '13.2 Dative Case',
        content: [
          { type: 'text', text: 'Dative is the INDIRECT object case — used after: mit, zu, bei, von, aus, nach, seit, gegenüber, and for "to/for whom" actions.' },
          {
            type: 'table',
            headers: ['Case', 'Masc', 'Fem', 'Neut', 'Plural'],
            rows: [
              ['Nominative', 'der', 'die', 'das', 'die (pl)'],
              ['Accusative', 'den', 'die', 'das', 'die (pl)'],
              ['Dative', 'dem', 'der', 'dem', 'den (+n)'],
            ],
          },
          {
            type: 'example',
            text: 'Ich gebe dem Mann das Buch. (I give the man the book.)\nIch helfe der Frau. (I help the woman.) — helfen takes Dative!\nSie wohnt bei einem Freund. (She lives with a friend.)',
          },
          { type: 'tip', text: 'Dative plural always adds -n to the noun: den Männern, den Kindern, den Büchern.' },
        ],
      },
      {
        id: 'two-way-prepositions',
        title: '13.3 Two-Way Prepositions',
        content: [
          { type: 'text', text: 'These prepositions take Accusative when showing movement/direction, and Dative when showing location/position.' },
          {
            type: 'table',
            headers: ['Preposition', 'Meaning', 'Accusative (movement)', 'Dative (location)'],
            rows: [
              ['an', 'at, on (vertical)', 'Ich hänge das Bild an die Wand.', 'Das Bild hängt an der Wand.'],
              ['auf', 'on (horizontal)', 'Ich lege das Buch auf den Tisch.', 'Das Buch liegt auf dem Tisch.'],
              ['in', 'in, into', 'Ich gehe in die Schule.', 'Ich bin in der Schule.'],
              ['hinter', 'behind', 'Er stellt das Auto hinter das Haus.', 'Das Auto steht hinter dem Haus.'],
              ['neben', 'next to', 'Ich setze mich neben dich.', 'Ich sitze neben dir.'],
              ['über', 'over, above', 'Der Vogel fliegt über den See.', 'Der Vogel fliegt über dem See.'],
              ['unter', 'under, below', 'Der Hund kriecht unter den Tisch.', 'Der Hund liegt unter dem Tisch.'],
              ['vor', 'in front of', 'Er stellt sich vor die Tür.', 'Er steht vor der Tür.'],
              ['zwischen', 'between', 'Sie setzt sich zwischen die Kinder.', 'Sie sitzt zwischen den Kindern.'],
            ],
          },
          { type: 'tip', text: 'Memory trick: "wo?" (where?) → Dative. "wohin?" (where to?) → Accusative.' },
        ],
      },
      {
        id: 'subordinate-clauses',
        title: '13.4 Subordinate Clauses',
        content: [
          { type: 'text', text: 'Subordinate clauses are introduced by a conjunction (weil, dass, wenn, als, obwohl, etc.). In a subordinate clause, the verb goes to the END.' },
          {
            type: 'table',
            headers: ['Conjunction', 'Meaning', 'Example'],
            rows: [
              ['weil', 'because', 'Ich lerne Deutsch, weil ich in Deutschland arbeiten möchte.'],
              ['dass', 'that', 'Ich glaube, dass er krank ist.'],
              ['wenn', 'when / if (present/future)', 'Wenn ich Zeit habe, lese ich ein Buch.'],
              ['als', 'when (past, single event)', 'Als ich klein war, spielte ich viel.'],
              ['obwohl', 'although', 'Ich gehe spazieren, obwohl es regnet.'],
              ['damit', 'so that', 'Ich lerne Deutsch, damit ich einen Job finde.'],
              ['ob', 'whether, if', 'Ich frage, ob er kommt.'],
            ],
          },
          { type: 'tip', text: 'The subordinate clause is separated from the main clause by a COMMA.' },
        ],
      },
      {
        id: 'comparative',
        title: '13.5 Comparative & Superlative',
        content: [
          {
            type: 'table',
            headers: ['Form', 'Pattern', 'Example'],
            rows: [
              ['Positive', '(base form)', 'schnell — fast'],
              ['Comparative', 'stem + -er + als', 'Er läuft schneller als ich.'],
              ['Superlative', 'am + stem + -sten', 'Er ist am schnellsten.'],
            ],
          },
          { type: 'subheading', text: 'Irregular Forms' },
          {
            type: 'table',
            headers: ['Positive', 'Comparative', 'Superlative'],
            rows: [
              ['gut (good)', 'besser', 'am besten'],
              ['viel (much/many)', 'mehr', 'am meisten'],
              ['gern (gladly)', 'lieber', 'am liebsten'],
              ['hoch (high)', 'höher', 'am höchsten'],
              ['groß (big)', 'größer', 'am größten'],
              ['nah (near)', 'näher', 'am nächsten'],
            ],
          },
        ],
      },
    ],
  },
  // ═══════════════════════════════════════════════════════════
  // B1 CHAPTERS
  // ═══════════════════════════════════════════════════════════
  {
    id: 'b1-grammar',
    title: 'B1 Grammar Complete',
    level: 'B1',
    icon: '📐',
    sections: [
      {
        id: 'konjunktiv-ii',
        title: '18.1 Konjunktiv II (Subjunctive)',
        content: [
          { type: 'text', text: 'Konjunktiv II is used for: polite requests, hypothetical situations, wishes, and conditions. Most commonly formed with würde + infinitive.' },
          {
            type: 'table',
            headers: ['Pronoun', 'würde + Infinitive', 'Example'],
            rows: [
              ['ich', 'würde', 'Ich würde gern kommen. (I would like to come.)'],
              ['du', 'würdest', 'Was würdest du machen? (What would you do?)'],
              ['er/sie/es', 'würde', 'Er würde helfen. (He would help.)'],
              ['wir', 'würden', 'Wir würden gern bleiben. (We would like to stay.)'],
              ['ihr', 'würdet', 'Ihr würdet es mögen. (You would like it.)'],
              ['sie/Sie', 'würden', 'Sie würden kommen. (They would come.)'],
            ],
          },
          { type: 'subheading', text: 'Key Konjunktiv II forms used directly (without würde)' },
          {
            type: 'table',
            headers: ['Verb', 'ich', 'du', 'er/sie/es', 'Meaning'],
            rows: [
              ['sein', 'wäre', 'wärst', 'wäre', 'would be'],
              ['haben', 'hätte', 'hättest', 'hätte', 'would have'],
              ['können', 'könnte', 'könntest', 'könnte', 'could'],
              ['müssen', 'müsste', 'müsstest', 'müsste', 'would have to'],
              ['dürfen', 'dürfte', 'dürftest', 'dürfte', 'would be allowed to'],
              ['sollen', 'sollte', 'solltest', 'sollte', 'should'],
              ['wollen', 'wollte', 'wolltest', 'wollte', 'wanted to'],
            ],
          },
          { type: 'example', text: 'Könnten Sie mir bitte helfen? (Could you please help me?) — polite request\nWenn ich Zeit hätte, würde ich kommen. (If I had time, I would come.) — conditional\nIch wäre gern in Berlin. (I would like to be in Berlin.) — wish' },
        ],
      },
      {
        id: 'passive',
        title: '18.2 Passive Voice (Passiv)',
        content: [
          { type: 'text', text: 'Passive shifts focus from the doer to the action/recipient. Formed with: werden + past participle.' },
          {
            type: 'table',
            headers: ['Tense', 'Structure', 'Example'],
            rows: [
              ['Present', 'wird + Partizip II', 'Das Buch wird gelesen. (The book is read.)'],
              ['Past (Perfekt)', 'wurde + Partizip II', 'Das Buch wurde gelesen. (The book was read.)'],
              ['Future', 'wird + Partizip II + werden', 'Das Buch wird gelesen werden.'],
            ],
          },
          { type: 'tip', text: 'To express the agent (by whom), use "von + Dative": Das Buch wird von Maria gelesen.' },
        ],
      },
      {
        id: 'genitive',
        title: '18.3 Genitive Case',
        content: [
          { type: 'text', text: 'Genitive shows possession. In spoken German, "von + Dative" is often used instead.' },
          {
            type: 'table',
            headers: ['Case', 'Masc', 'Fem', 'Neut', 'Plural'],
            rows: [
              ['Nominative', 'der', 'die', 'das', 'die'],
              ['Genitive', 'des (+s)', 'der', 'des (+s)', 'der'],
            ],
          },
          {
            type: 'example',
            text: 'Das Auto des Mannes. (The man\'s car.)\nDas Buch der Frau. (The woman\'s book.)\nDas Spielzeug des Kindes. (The child\'s toy.)',
          },
          { type: 'tip', text: 'Masculine and neuter nouns add -s or -es in Genitive: des Mannes, des Kindes.' },
        ],
      },
    ],
  },
  // ═══════════════════════════════════════════════════════════
  // B2 CHAPTERS
  // ═══════════════════════════════════════════════════════════
  {
    id: 'b2-grammar',
    title: 'B2 Grammar Complete',
    level: 'B2',
    icon: '📐',
    sections: [
      {
        id: 'konjunktiv-i',
        title: '23.1 Konjunktiv I — Indirect Speech',
        content: [
          { type: 'text', text: 'Konjunktiv I is mainly used in written/formal German to report what someone else said (indirect speech). Formed from the infinitive stem.' },
          {
            type: 'table',
            headers: ['Pronoun', 'sein', 'haben', 'arbeiten'],
            rows: [
              ['ich', 'sei', 'habe', 'arbeite'],
              ['du', 'sei(e)st', 'habest', 'arbeitest'],
              ['er/sie/es', 'sei ⭐', 'habe ⭐', 'arbeite ⭐'],
              ['wir', 'seien', 'haben', 'arbeiten'],
              ['sie/Sie', 'seien', 'haben', 'arbeiten'],
            ],
          },
          { type: 'example', text: 'Er sagt, er sei krank. (He says he is sick.) — Konjunktiv I\nDer Minister erklärte, die Situation sei unter Kontrolle. (The minister stated the situation was under control.)' },
          { type: 'tip', text: 'When Konjunktiv I looks identical to Indikativ (we/they forms), use Konjunktiv II instead to make it clear.' },
        ],
      },
      {
        id: 'extended-adj',
        title: '23.2 Extended Adjectival Phrases',
        content: [
          { type: 'text', text: 'German can replace relative clauses with complex adjective phrases before the noun. This is common in formal/written German.' },
          {
            type: 'example',
            text: 'Relative clause: Der Mann, der in Berlin wohnt, ist mein Freund.\nExtended adjective: Der in Berlin wohnende Mann ist mein Freund.\n(The man living in Berlin is my friend.)',
          },
          { type: 'tip', text: 'Extended adjectival phrases always go between the article and the noun, and the adjective must agree in case, gender, and number.' },
        ],
      },
      {
        id: 'infinitive-clauses',
        title: '23.3 Infinitive Clauses with zu',
        content: [
          { type: 'text', text: 'Infinitive clauses with "zu" are used instead of dass-clauses when the subject is the same in both clauses.' },
          {
            type: 'table',
            headers: ['With dass (different subjects)', 'With zu-infinitive (same subject)'],
            rows: [
              ['Ich hoffe, dass du kommst.', '(different subjects — must use dass)'],
              ['Ich hoffe, bald fertig zu sein.', '(same subject — use zu-infinitive)'],
              ['Er bittet mich, dass ich helfe.', 'Er bittet mich, ihm zu helfen.'],
            ],
          },
          { type: 'tip', text: 'With separable verbs: zu goes between prefix and verb: aufzustehen, anzufangen, anzurufen.' },
        ],
      },
    ],
  },
  // ═══════════════════════════════════════════════════════════
  // REFERENCE CHAPTERS
  // ═══════════════════════════════════════════════════════════
  {
    id: 'ref-conjunctions',
    title: 'Conjunctions Reference',
    level: 'Reference',
    icon: '🔗',
    sections: [
      {
        id: 'subordinating',
        title: 'Subordinating Conjunctions (verb goes to END)',
        content: [
          {
            type: 'table',
            headers: ['Conjunction', 'Meaning', 'Example'],
            rows: [
              ['weil', 'because', 'Ich lerne, weil ich es will.'],
              ['dass', 'that', 'Ich glaube, dass es stimmt.'],
              ['wenn', 'when/if (pres/fut)', 'Wenn du kommst, koche ich.'],
              ['als', 'when (past, once)', 'Als ich jung war,...'],
              ['ob', 'whether', 'Ich frage, ob er kommt.'],
              ['obwohl', 'although', 'Obwohl es regnet, gehe ich.'],
              ['damit', 'so that', 'Ich lerne, damit ich bestehe.'],
              ['bevor', 'before', 'Bevor du gehst, ruf an!'],
              ['nachdem', 'after', 'Nachdem er gegessen hat, geht er.'],
              ['während', 'while', 'Während er schläft, arbeite ich.'],
              ['seitdem', 'since (time)', 'Seitdem er weg ist, bin ich traurig.'],
              ['sobald', 'as soon as', 'Sobald ich fertig bin, rufe ich an.'],
              ['solange', 'as long as', 'Solange du hier bist, bin ich glücklich.'],
              ['falls', 'in case/if', 'Falls du Zeit hast, komm vorbei.'],
              ['da', 'since/as (reason)', 'Da es regnet, bleibe ich.'],
              ['sodass', 'so that (result)', 'Er sprach laut, sodass alle hörten.'],
              ['indem', 'by doing', 'Er lernte, indem er übte.'],
              ['je...desto', 'the more...the more', 'Je mehr du übst, desto besser wirst du.'],
            ],
          },
        ],
      },
      {
        id: 'coordinating',
        title: 'Coordinating Conjunctions (no word order change)',
        content: [
          {
            type: 'table',
            headers: ['Conjunction', 'Meaning', 'Example'],
            rows: [
              ['und', 'and', 'Ich lerne und er arbeitet.'],
              ['aber', 'but', 'Ich will, aber ich kann nicht.'],
              ['oder', 'or', 'Kaffee oder Tee?'],
              ['denn', 'because (coord)', 'Ich lerne, denn ich will bestehen.'],
              ['sondern', 'but rather (after negation)', 'Nicht Englisch, sondern Deutsch.'],
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'ref-pronouns',
    title: 'All Pronoun Cases',
    level: 'Reference',
    icon: '👤',
    sections: [
      {
        id: 'personal-all-cases',
        title: 'Personal Pronouns — All Cases',
        content: [
          {
            type: 'table',
            headers: ['Nominative', 'Accusative', 'Dative', 'Genitive'],
            rows: [
              ['ich', 'mich', 'mir', 'meiner'],
              ['du', 'dich', 'dir', 'deiner'],
              ['er', 'ihn', 'ihm', 'seiner'],
              ['sie (she)', 'sie', 'ihr', 'ihrer'],
              ['es', 'es', 'ihm', 'seiner'],
              ['wir', 'uns', 'uns', 'unser'],
              ['ihr', 'euch', 'euch', 'euer'],
              ['sie/Sie', 'sie/Sie', 'ihnen/Ihnen', 'ihrer/Ihrer'],
            ],
          },
        ],
      },
      {
        id: 'possessive',
        title: 'Possessive Pronouns',
        content: [
          {
            type: 'table',
            headers: ['Possessive', 'Meaning', 'Example'],
            rows: [
              ['mein-', 'my', 'Mein Vater, meine Mutter, mein Kind'],
              ['dein-', 'your (inf)', 'Dein Buch, deine Tasche'],
              ['sein-', 'his/its', 'Sein Auto, seine Frau'],
              ['ihr-', 'her/their', 'Ihr Mann, ihre Kinder'],
              ['unser-', 'our', 'Unser Haus, unsere Wohnung'],
              ['euer-', 'your (pl)', 'Euer Hund, eure Katze'],
              ['Ihr-', 'Your (formal)', 'Ihr Name, Ihre Adresse'],
            ],
          },
          { type: 'tip', text: 'Possessive endings follow the SAME pattern as ein/eine across all cases.' },
        ],
      },
    ],
  },
  {
    id: 'ref-prepositions',
    title: 'Prepositions Reference',
    level: 'Reference',
    icon: '📍',
    sections: [
      {
        id: 'acc-prepositions',
        title: 'Accusative Prepositions (always Accusative)',
        content: [
          {
            type: 'table',
            headers: ['Preposition', 'Meaning', 'Example'],
            rows: [
              ['durch', 'through', 'durch den Park gehen'],
              ['für', 'for', 'Das ist für dich.'],
              ['gegen', 'against, around (time)', 'gegen die Wand, gegen 8 Uhr'],
              ['ohne', 'without', 'ohne Geld'],
              ['um', 'around, at (time)', 'um den Tisch, um 9 Uhr'],
              ['bis', 'until, up to', 'bis nächste Woche'],
              ['entlang', 'along (follows noun)', 'den Fluss entlang'],
            ],
          },
        ],
      },
      {
        id: 'dat-prepositions',
        title: 'Dative Prepositions (always Dative)',
        content: [
          {
            type: 'table',
            headers: ['Preposition', 'Meaning', 'Example'],
            rows: [
              ['mit', 'with', 'mit dem Zug fahren'],
              ['zu', 'to (places/people)', 'zum Bahnhof, zur Schule'],
              ['bei', 'at, near, with', 'bei der Arbeit, bei mir'],
              ['von', 'from, by, of', 'von Berlin, ein Buch von Kafka'],
              ['aus', 'from (origin), out of', 'aus Deutschland, aus der Flasche'],
              ['nach', 'after, to (cities/countries)', 'nach Berlin fahren, nach der Arbeit'],
              ['seit', 'since, for (ongoing)', 'seit einem Jahr'],
              ['gegenüber', 'opposite', 'der Bank gegenüber'],
              ['außer', 'except, besides', 'außer mir'],
            ],
          },
          { type: 'tip', text: 'Memory trick for Dative prepositions: "aus, bei, mit, nach, seit, von, zu, gegenüber, außer"' },
        ],
      },
    ],
  },
  {
    id: 'ref-common-mistakes',
    title: 'Common Mistakes',
    level: 'Reference',
    icon: '⚠️',
    sections: [
      {
        id: 'mistakes',
        title: 'What NOT to Say — Common Errors',
        content: [
          {
            type: 'table',
            headers: ['❌ Wrong', '✅ Correct', 'Rule'],
            rows: [
              ['Ich bin 25 Jahre.', 'Ich bin 25 Jahre alt.', 'Don\'t forget "alt" — "I am 25 years old"'],
              ['Ich bin gefahren (with haben).', 'Ich bin gefahren.', 'Motion verbs use SEIN not haben in Perfekt'],
              ['Ich muss Deutsch zu lernen.', 'Ich muss Deutsch lernen.', 'After modal verbs, NO "zu" before infinitive'],
              ['Das ist eine interessant Stadt.', 'Das ist eine interessante Stadt.', 'Adjectives before nouns MUST have endings'],
              ['Ich kenne nicht das Wort.', 'Ich kenne das Wort nicht.', '"Nicht" goes AFTER the object'],
              ['Wann du kommst?', 'Wann kommst du?', 'In questions, verb MUST come before subject'],
              ['Er ist gegangen nach Hause.', 'Er ist nach Hause gegangen.', 'Past participle goes at the VERY END'],
              ['Ich lerne seit einem Jahr Deutsch gelernt.', 'Ich lerne seit einem Jahr Deutsch.', '"Seit" uses PRESENT tense for ongoing actions'],
              ['Das macht Spaß mir.', 'Das macht mir Spaß.', 'Dative indirect objects come BEFORE accusative'],
              ['Sie ist sehr schöne.', 'Sie ist sehr schön.', 'After "sein", NO adjective ending (predicate adjective)'],
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'ref-word-formation',
    title: 'Word Formation',
    level: 'Reference',
    icon: '🔧',
    sections: [
      {
        id: 'compound-nouns',
        title: 'Compound Nouns',
        content: [
          { type: 'text', text: 'German combines two or more words to make a new noun. The LAST word is the "head" and determines the grammatical gender.' },
          {
            type: 'table',
            headers: ['Components', 'Compound', 'Gender', 'Meaning'],
            rows: [
              ['Arbeit + Zimmer', 'Arbeitszimmer', 'das', 'study / home office'],
              ['Fach + Mann', 'Fachmann', 'der', 'specialist / expert'],
              ['Kranken + Haus', 'Krankenhaus', 'das', 'hospital'],
              ['Haupt + Bahnhof', 'Hauptbahnhof', 'der', 'main train station'],
              ['Berufs + Schule', 'Berufsschule', 'die', 'vocational school'],
              ['Daten + Schutz', 'Datenschutz', 'der', 'data protection'],
              ['Wohn + Zimmer', 'Wohnzimmer', 'das', 'living room'],
              ['Kühl + Schrank', 'Kühlschrank', 'der', 'fridge (cool cupboard)'],
              ['Hand + Schuh', 'Handschuh', 'der', 'glove (hand shoe)'],
              ['Kopf + Schmerzen', 'Kopfschmerzen', 'die (pl)', 'headache (head pain)'],
              ['Selbst + Bewusst + sein', 'Selbstbewusstsein', 'das', 'self-confidence'],
            ],
          },
        ],
      },
      {
        id: 'suffixes',
        title: 'Common Suffixes',
        content: [
          {
            type: 'table',
            headers: ['Suffix', 'Meaning', 'Examples'],
            rows: [
              ['-ung', 'action/process (die)', 'Entwicklung (development), Lösung (solution)'],
              ['-heit / -keit', 'quality/state (die)', 'Gesundheit (health), Freiheit (freedom)'],
              ['-schaft', 'collective/relationship (die)', 'Gesellschaft (society), Freundschaft (friendship)'],
              ['-er', 'person who does sth (der)', 'Lehrer (teacher), Fahrer (driver)'],
              ['-erin', 'female person (die)', 'Lehrerin, Entwicklerin, Ärztin'],
              ['-ismus', 'ideology/system (der)', 'Kapitalismus, Tourismus'],
              ['-ist', 'person of ideology (der)', 'Journalist, Spezialist'],
              ['-tion / -sion', 'process/state (die)', 'Kommunikation, Information'],
              ['-ieren', 'to do sth (verb)', 'informieren, organisieren'],
              ['-los', 'without', 'arbeitslos (unemployed), kostenlos (free of charge)'],
              ['-voll', 'full of', 'stressvoll (stressful), hoffnungsvoll (hopeful)'],
              ['-reich', 'rich in', 'erfolgreich (successful), kinderreich (with many children)'],
              ['-fähig', 'capable of', 'teamfähig (team-capable), arbeitsfähig (able to work)'],
              ['-würdig', 'worthy of', 'sehenswürdig (worth seeing), vertrauenswürdig (trustworthy)'],
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'ref-practical',
    title: 'Everyday German',
    level: 'Reference',
    icon: '🏪',
    sections: [
      {
        id: 'supermarket',
        title: 'At the Supermarket',
        content: [
          {
            type: 'table',
            headers: ['German', 'English', 'Note'],
            rows: [
              ['Haben Sie eine Payback-Karte?', 'Do you have a loyalty card?', 'Answer: Nein, danke.'],
              ['Möchten Sie eine Tüte?', 'Would you like a bag?', 'Ja bitte / Nein danke'],
              ['Das macht 12 Euro 50.', 'That comes to €12.50', ''],
              ['Stimmt so!', 'Keep the change!', 'Tipping is modest in Germany'],
              ['Haben Sie es kleiner?', 'Do you have something smaller?', 'Asking for change'],
              ['Kann ich quittieren?', 'Can I get a receipt?', ''],
            ],
          },
        ],
      },
      {
        id: 'public-transport',
        title: 'On Public Transport',
        content: [
          {
            type: 'table',
            headers: ['German', 'English'],
            rows: [
              ['Ist hier noch frei?', 'Is this seat free?'],
              ['Entschuldigung, ich muss aussteigen.', 'Excuse me, I need to get off.'],
              ['Welche Linie fährt zur Innenstadt?', 'Which line goes to the city centre?'],
              ['Einmal nach [Ziel], bitte.', 'One ticket to [destination], please.'],
              ['Gilt der Fahrschein auch für die S-Bahn?', 'Is the ticket valid for the S-Bahn too?'],
              ['Wo muss ich umsteigen?', 'Where do I need to change?'],
            ],
          },
        ],
      },
      {
        id: 'government-office',
        title: 'At a Government Office (Amt)',
        content: [
          {
            type: 'table',
            headers: ['German', 'English'],
            rows: [
              ['Ich brauche Hilfe auf Deutsch.', 'I need help in German.'],
              ['Sprechen Sie bitte langsam.', 'Please speak slowly.'],
              ['Können Sie das bitte aufschreiben?', 'Can you please write that down?'],
              ['Ich verstehe das Formular nicht ganz.', 'I don\'t fully understand this form.'],
              ['Welche Unterlagen brauche ich?', 'What documents do I need?'],
              ['Wann bekomme ich Bescheid?', 'When will I hear back?'],
              ['Kann ich einen neuen Termin machen?', 'Can I make a new appointment?'],
            ],
          },
        ],
      },
      {
        id: 'doctor',
        title: 'At the Doctor\'s',
        content: [
          {
            type: 'table',
            headers: ['German', 'English'],
            rows: [
              ['Ich habe einen Termin bei Dr. Müller.', 'I have an appointment with Dr. Müller.'],
              ['Sind Sie versichert?', 'Are you insured?'],
              ['Haben Sie die Versicherungskarte?', 'Do you have the insurance card?'],
              ['Bitte füllen Sie dieses Formular aus.', 'Please fill out this form.'],
              ['Die Wartezeit beträgt ca. 20 Minuten.', 'The wait is approximately 20 minutes.'],
            ],
          },
        ],
      },
      {
        id: 'bank',
        title: 'At the Bank',
        content: [
          {
            type: 'table',
            headers: ['German', 'English'],
            rows: [
              ['Ich möchte ein Konto eröffnen.', 'I\'d like to open an account.'],
              ['Was für Unterlagen brauche ich?', 'What documents do I need?'],
              ['Wie lange dauert die Überweisung?', 'How long does the transfer take?'],
              ['Ich habe meine Karte verloren.', 'I have lost my card.'],
              ['Ich möchte Geld abheben.', 'I\'d like to withdraw money.'],
              ['Bitte sperren Sie meine Karte.', 'Please block my card.'],
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'ref-writing',
    title: 'Writing Templates',
    level: 'Reference',
    icon: '✍️',
    sections: [
      {
        id: 'templates',
        title: 'Templates for All Levels',
        content: [
          { type: 'subheading', text: 'A1: Simple Personal Message' },
          { type: 'example', text: 'Hallo [Name],\nWie geht es dir? Mir geht es [gut/nicht so gut]. Ich [was I doing]. Das war [schön/interessant/anstrengend]. [One more sentence about plans or question].\nViele Grüße,\n[Your name]' },
          { type: 'subheading', text: 'A2: Formal Request Email' },
          { type: 'example', text: 'Betreff: [Topic]\nSehr geehrte/r Frau/Herr [Name],\nmein Name ist [Name]. Ich schreibe Ihnen, weil [reason]. Ich möchte [request]. Könnten Sie mir bitte [specific ask]? Ich wäre Ihnen sehr dankbar.\nMit freundlichen Grüßen,\n[Name] [Contact]' },
          { type: 'subheading', text: 'B1: Opinion / Discussion Text' },
          { type: 'example', text: 'Das Thema [X] ist heute sehr aktuell. Einerseits [argument FOR]. Zum Beispiel [example]. Andererseits [argument AGAINST]. Das zeigt sich daran, dass [evidence]. Meiner Meinung nach [your position], weil [reason]. Zusammenfassend lässt sich sagen, dass [conclusion].' },
          { type: 'subheading', text: 'B1: Formal Complaint' },
          { type: 'example', text: 'Betreff: Beschwerde wegen [issue]\nSehr geehrte Damen und Herren,\nIch wende mich an Sie, weil [describe problem]. Am [date] habe ich [what you did]. Leider [what went wrong]. Das ist nicht akzeptabel, da [reason]. Ich bitte Sie daher, [what you want]. Falls ich bis zum [deadline] keine Antwort erhalte, sehe ich mich gezwungen, weitere Schritte einzuleiten.\nMit freundlichen Grüßen,\n[Name]' },
          { type: 'subheading', text: 'B2: Academic / Professional Report Structure' },
          { type: 'example', text: '1. EINLEITUNG — Der vorliegende Bericht befasst sich mit [topic]. Ziel ist es, [aim].\n2. IST-ANALYSE — Derzeit [current situation]. Laut [source], [finding].\n3. PROBLEME — Die größten Herausforderungen bestehen in [list].\n4. HANDLUNGSEMPFEHLUNGEN — • Erstens: [measure 1] • Zweitens: [measure 2]\n5. FAZIT — Zusammenfassend lässt sich sagen, dass [conclusion].' },
        ],
      },
    ],
  },
  {
    id: 'ref-exam-tips',
    title: 'TELC / Goethe Exam Tips',
    level: 'Reference',
    icon: '🎯',
    sections: [
      {
        id: 'a1-tips',
        title: 'A1 Exam Tips',
        content: [
          {
            type: 'list',
            items: [
              'Read every question carefully before reading/listening to the passage.',
              'For listening: you hear each track TWICE. Use the first listen to get the gist.',
              'For writing: always include a greeting (Hallo / Liebe/r ...) and sign off (Viele Grüße).',
              'For speaking: don\'t panic if you don\'t know a word — say "Ich weiß nicht das Wort, aber..."',
              'Know your numbers, days, months, and basic verbs perfectly — they appear in every section.',
              'Practise forming W-questions and yes/no questions every day.',
              'Learn 10 new words every day and review them the next morning.',
            ],
          },
        ],
      },
      {
        id: 'b1-tips',
        title: 'B1 Exam Structure & Tips',
        content: [
          {
            type: 'table',
            headers: ['Section', 'Description', 'Tips'],
            rows: [
              ['Lesen (Reading)', '3-4 texts, 25 min', 'Skim first, then answer. Match keywords.'],
              ['Hören (Listening)', 'Radio/dialogue clips, 20 min', 'Read questions before audio plays.'],
              ['Schreiben (Writing)', 'Letter/email, 30 min', 'Use linking words: jedoch, außerdem, zunächst.'],
              ['Sprechen (Speaking)', 'Discussion + presentation', 'Learn phrases: Meiner Meinung nach, Einerseits...'],
            ],
          },
          {
            type: 'list',
            items: [
              'Konjunktiv II (würde, wäre, hätte) impresses examiners — use it for polite requests.',
              'Use a variety of connectors: weil, obwohl, damit, sodass — not just "und" and "aber".',
              'For Hören: common topics are workplace, leisure, health, environment, and daily life.',
              'In Sprechen, always give reasons for your opinions: "...weil ich denke, dass..."',
            ],
          },
        ],
      },
    ],
  },
];
