import React from 'react';
import SvgIcon from '../SvgIcons/SvgIcons';
import './TextToSpeech.scss';

const TextToSpeech: React.FC<{ text: string }> = ({ text }) => {
  const [playing, setPalying] = React.useState(false);

  const msg = new SpeechSynthesisUtterance();
  const voices = window.speechSynthesis.getVoices();
  msg.voice = voices[4];
  msg.text = text;
  msg.lang = 'en-US';

  msg.onend = () => setPalying(false);

  const speak = () => {
    speechSynthesis.speak(msg);
    setPalying(true);
  };

  const stop = () => {
    speechSynthesis.cancel();
    setPalying(false);
  };

  return (
    <div className="text-speech">
      {playing ? (
        <SvgIcon iconId="stop" onClick={stop} className="text-speech__stop" />
      ) : (
        <SvgIcon iconId="play" onClick={speak} className="text-speech__play" />
      )}
    </div>
  );
};

export default TextToSpeech;
