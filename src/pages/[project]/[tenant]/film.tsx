import React from 'react';
import ReactPlayer from 'react-player';
import helper from 'lib/helper';
import { useRouter } from 'next/router';

const Film: React.FC = () => {
  const router = useRouter();
  const handleProgress = ({ playedSeconds }: { playedSeconds: number }) => {
    console.log(playedSeconds);
  };
  return (
    <ReactPlayer
      className="react-player"
      url="http://ptnetindo.com:6701/project/video"
      // url="https://media.w3.org/2010/04/html5-meetup-paris-avril-2010.mp4"
      // url="https://www.learningcontainer.com/download/sample-video-file-for-testing/?wpdmdl=2514&refresh=60dabd9e21c0f1624948126"
      width="100%"
      height="100%"
      // config={{ file: { forceAudio: true } }}
      controls
      playsinline={true}
      playing
      progressInterval={500}
      onBufferEnd={() => {
        console.log('onBufferEnd');
      }}
      onEnded={() => {
        console.log('onEnded');
        helper.mySwalWithCallback('silahkan ikuti quiz yang kami berikan', () => {
          router.push({
            pathname: '/[project]/[tenant]/quiz',
            query: { project: router.query.project, tenant: router.query.tenant },
          });
        });
      }}
      onBuffer={() => {
        console.log('onBuffer');
      }}
      onProgress={handleProgress}
      // onP
    />
  );
};

export default Film;
