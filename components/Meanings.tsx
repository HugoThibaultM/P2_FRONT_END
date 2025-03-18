import { FunctionComponent } from "preact";

type MeaningsProps = {
  meanings: {
    partOfSpeech:string;
    definitions:{
        definition:string
    }[]
  }[]
};

const Meanings: FunctionComponent<MeaningsProps> = ({ meanings }) => {
  return (
    <div>
      <h3>Significados:</h3>
      {meanings.map((m, index) => (
        <div key={index}>
          <p>{m.partOfSpeech}</p>
          <ul>
            {m.definitions.map((d, i) => (
              <li key={i}>{d.definition}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Meanings;
