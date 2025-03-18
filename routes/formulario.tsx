import { Handlers, PageProps } from "$fresh/server.ts";
import Phonetics from "../components/Phonetics.tsx";
import Meanings from "../components/Meanings.tsx";

interface Phonetic {
  text: string;
  audio: string;
}

interface Meaning {
  partOfSpeech: string;
  definitions: { definition: string }[];
}

interface DictionaryResponse {
  word: string;
  phonetics: Phonetic[];
  meanings: Meaning[];
}

export const handler: Handlers<DictionaryResponse | null> = {
  async GET(req, ctx) {
    const url = new URL(req.url);
    const word = url.searchParams.get("word");
    if (!word) return ctx.render(null);

    const apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    const res = await fetch(apiUrl);
    if (!res.ok) return ctx.render(null);

    const data: DictionaryResponse[] = await res.json();
    return ctx.render(data[0]);
  },
};

export default function DictionaryPage({ data }: PageProps<DictionaryResponse | null>) {
  return (
    <div>
      
      <main>
        <h2>Buscar en el Diccionario</h2>
        <form>
          <input type="text" name="word"/>
          <button type="submit">Buscar</button>
        </form>

        {data ? (
          <div>
            <h2>Palabra: {data.word}</h2>
            <Phonetics phonetics={data.phonetics} />
            <Meanings meanings={data.meanings} />
          </div>
        ) : (
          <p>Ingrese una palabra para buscar su significado.</p>
        )}
      </main>
    </div>
  );
}
