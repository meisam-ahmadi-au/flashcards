import React, { useState, useRef } from 'react';
import Api from '../../api/Api';
import styles from './MeriamWebsterPronunciation.module.scss';
import mwSrc from '../../assets/meriamwebster.png';
import SvgIcon from '../SvgIcons/SvgIcons';

const MeriamWebsterPronunciation: React.FC<{ text: string }> = ({ text }) => {
  const [word, setWord] = useState(text);
  const [audio, setAudio] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  React.useEffect(() => {
    if (text) {
      const firstWord = text.split(' ')[0];
      const regex = RegExp(/[^A-Z,^a-z]/);
      if (!regex.test(firstWord)) {
        setWord(firstWord);
      }
    }
    return () => {
      setAudio("");
    };
  }, [text]);

  const loadPronunciation = async () => {
    if (!word) {
      return;
    }
    const baseFilename = (await Api.getPronunciation(word)) as string;
    if (!baseFilename) {
      return;
    }
    const subdirectory = baseFilename.startsWith('bix')
      ? 'bix'
      : baseFilename.startsWith('gg')
      ? 'gg'
      : baseFilename[0];

    const audioUrl = `https://media.merriam-webster.com/soundc11/${subdirectory}/${baseFilename}.wav`;
    setAudio(audioUrl);
  };

  const playAudio = () => {
    audioRef.current?.play();
    setIsPlaying(true);
  };

  const audioEnded = () => setIsPlaying(false);

  const stopAudio = () => {
    audioRef.current?.pause();
    setIsPlaying(false);
  };

  return (
    <div className={styles.mw}>
      {!audio && (
        <img
          onClick={loadPronunciation}
          alt="meriam webster"
          title="meriam webster"
          src={mwSrc}
        />
      )}
      {audio && (
        <>
          {isPlaying ? (
            <SvgIcon
              iconId="stop"
              onClick={stopAudio}
              className={styles.mw__stop}
            />
          ) : (
            <SvgIcon
              iconId="play"
              onClick={playAudio}
              className={styles.mw__play}
            />
          )}
          <audio src={audio} ref={audioRef} onEnded={audioEnded}>
            Your browser does not support the
            <code>audio</code> element.
          </audio>
        </>
      )}
    </div>
  );
};

export default MeriamWebsterPronunciation;
