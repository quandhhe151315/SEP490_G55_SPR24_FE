
import ReactPlayer from 'react-player/youtube';
// or
// import ReactPlayer from 'react-player';
//if you want to support other video URLs

const EmbedVideo = (props) => {
  return (
    <ReactPlayer width={820} height={450} url={props.url} controls={true}/>
  );
}

export default EmbedVideo;