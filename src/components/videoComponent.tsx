// import React, { useRef, useState, useEffect } from 'react';
// import videojs from 'video.js';
// import 'video.js/dist/video-js.css';
// import qualitySelector from 'videojs-hls-quality-selector';
// import qualityLevels from 'videojs-contrib-quality-levels';
import React, { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import videojs from 'video.js';
import 'video.js/dist/video-js.css';

import helper from 'lib/helper';
export const VideoPlayer = () => {
  const videoPlayerRef = useRef(null); // Instead of ID
  const [currentTime, setCurrentTime] = useState(null);
  const videoSrc = 'https://vjs.zencdn.net/v/oceans.mp4';

  const videoJSOptions = {
    bigPlayButton: false,
    playbackRates: [0.5, 1, 1.5, 2],
    autoplay: true,
    controls: true,
    fluid: true,
    muted: false,
    responsive: true,
    html5: {
      hls: {
        overrideNative: true,
      },
      nativeVideoTracks: false,
      nativeAudioTracks: false,
      nativeTextTracks: false,
    },
    controlBar: {
      fullscreenToggle: true,
      volumePanel: false,
      muteToggle: true,
    },
  };
  const router = useRouter();

  useEffect(() => {
    if (videoPlayerRef) {
      const player = videojs(videoPlayerRef.current, videoJSOptions, () => {
        console.log(player);

        player.src(videoSrc);
        player.on('ended', () => {
          console.log('ended');
          helper.mySwalWithCallback('silahkan ikuti quiz yang kami berikan', () => {
            router.push({
              pathname: '/[project]/[tenant]/quiz',
              query: { project: router.query.project, tenant: router.query.tenant },
            });
          });
        });
        player.on('timeupdate', (e: any, _: any, second: any) => {
          setCurrentTime(player.currentTime());
        });

        player.on('loadeddata', (e: any, p: any) => {
          // console.log('e', e);
          // console.log('loadeddata');
          // player.currentTime(4304);
        });
        // player.hlsQualitySelector({ displayCurrentQuality: true });
        // player.fluid(true);
        // console.log(player);
      });
    }

    return () => {};
  }, []);

  const handleGetSecond = (second: any) => {
    return `${second}`.split('.')[0];
    //  localStorage.setItem(storageCurrentTime, getIndex[0]);
  };

  return (
    <div style={{ width: '100%' }}>
      <video style={{ width: '100%' }} ref={videoPlayerRef} className="video-js" />
      <span>Current Time: {currentTime}</span>
      <span>Current Time: {handleGetSecond(currentTime)}</span>
      {/* <GlobalStyle /> */}
    </div>
  );
};
