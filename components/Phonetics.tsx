import { FunctionComponent } from "preact";

type PhoneticsProps = {
  phonetics: {
        text: string;
        audio: string;
    }[];
};

const Phonetics: FunctionComponent<PhoneticsProps> = ({ phonetics }) => {
  return (
    <div>
      <h3>Fonética:</h3>
      {phonetics.map((p, index) => (
        <p key={index}>
          {p.text} <audio controls src={p.audio}></audio>
        </p>
      ))}
    </div>
  );
};

export default Phonetics;
