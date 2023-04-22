
const VideoDesc = ({className, description}) => {
  return (
    <div className={className}>
      <h5 className="text-2xl text-thistle text-center">
         Video Description
      </h5>
      <p className="text-white p-4">{description}</p>
    </div>
  )
}

export default VideoDesc