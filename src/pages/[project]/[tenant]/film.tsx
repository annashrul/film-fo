import { VideoPlayer } from 'components/videoComponent';
import React, { useEffect, useRef } from 'react';
// import ReactPlayer from 'react-player';
// import helper from 'lib/helper';
// import { useRouter } from 'next/router';
// import videojs from 'video.js';
// import VREPlayer from 'videojs-react-enhanced';
// import 'video.js/dist/video-js.css';
// import { useBeforeunload } from 'react-beforeunload';
// import { VideoPlayer } from 'components/videoComponent';
// import videoJsResolutionSwitcher from 'videojs-resolution-switcher';

const Film: React.FC = () => {
  // useBeforeunload((event: any) => {
  //   event.preventDefault();
  // });
  return <VideoPlayer />;
  // useEffect(() => {
  //   const player = videojs('player', {
  //     plugins: {
  //       videoJsResolutionSwitcher: {
  //         default: 'low',
  //         dynamicLabel: true,
  //       },
  //     },
  //   });
  //   player.updateSrc([
  //     {
  //       src: 'https://vjs.zencdn.net/v/oceans.mp4',
  //       type: 'video/mp4',
  //       res: 480,
  //       label: 'SD',
  //     },
  //     {
  //       src: 'https://vjs.zencdn.net/v/oceans.mp4',
  //       type: 'video/mp4',
  //       res: 720,
  //       label: 'HD',
  //     },
  //   ]);
  // }, []);
  // return (
  //   <video
  //     id="player"
  //     className="video-js vjs-default-skin"
  //     controls
  //     preload="none"
  //     autoPlay
  //     loop
  //     muted
  //     width={640}
  //     height={360}
  //     poster="https://vjs.zencdn.net/v/oceans.png"
  //   ></video>
  // );
  // return (
  //   <video
  //     id="player"
  //     className="video-js"
  //     controls
  //     preload="auto"
  //     poster="//vjs.zencdn.net/v/oceans.png"
  //     data-setup="{}"
  //   >
  //     {/* <source src="http://ptnetindo.com:6701/project/video" type="video/mp4" /> */}
  //   </video>
  // );

  // return (
  //   <VREPlayer
  //     hideList={hideList}
  //     resources={resources}
  //     playerOptions={playerOptions}
  //     videojsOptions={videojsOptions}
  //     onLoadedData={(e, player) => {}}
  //     onLoadedMetadata={(e, player) => {
  //       let getPause = localStorage.getItem(storageCurrentTime);
  //       getPause ? player.currentTime(parseInt(getPause)) : 0;
  //     }}
  //     onReady={(player) => {}}
  //     onPlay={(e, _, second) => {}}
  //     onTimeUpdate={(e, _, second) => handleGetSecond(second)}
  //     onPause={(e, _, second) => handleGetSecond(second)}
  //     onEnded={(e, _) => {
  //       localStorage.setItem(storageCurrentTime, '0');
  //       _.currentTime(parseInt('0'));
  //     }}
  //     onWaiting={(e, _) => {}}
  //     onPlaying={(e, second) => {}}
  //   />
  // );
  // const handleProgress = ({ playedSeconds }: { playedSeconds: number }) => {
  //   console.log(playedSeconds);
  // };
  // return (
  //   <ReactPlayer
  //     className="react-player"
  //     url="http://ptnetindo.com:6701/project/video"
  //     // url="https://media.w3.org/2010/04/html5-meetup-paris-avril-2010.mp4"
  //     // url="https://www.learningcontainer.com/download/sample-video-file-for-testing/?wpdmdl=2514&refresh=60dabd9e21c0f1624948126"
  //     width="100%"
  //     height="100%"
  //     // config={{ file: { forceAudio: true } }}
  //     controls
  //     playsinline={true}
  //     playing
  //     progressInterval={500}
  //     onBufferEnd={() => {
  //       console.log('onBufferEnd');
  //     }}
  //     onEnded={() => {
  //       console.log('onEnded');
  // helper.mySwalWithCallback('silahkan ikuti quiz yang kami berikan', () => {
  //   router.push({
  //     pathname: '/[project]/[tenant]/quiz',
  //     query: { project: router.query.project, tenant: router.query.tenant },
  //   });
  // });
  //     }}
  //     onBuffer={() => {
  //       console.log('onBuffer');
  //     }}
  //     onProgress={handleProgress}
  //     // onP
  //   />
  // );
};

export default Film;
