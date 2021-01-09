// Handle errors.
const handleError = function (err) {
  console.log('Error: ', err);
};

// Query the container to which the remote stream belong.
const remoteContainer = document.getElementById('remote-container');

// Add video streams to the container.
function addVideoStream(elementId) {
  // Creates a new div for every stream
  const streamDiv = document.createElement('div');
  // Assigns the elementId to the div.
  streamDiv.id = elementId;
  // Takes care of the lateral inversion
  streamDiv.style.transform = 'rotateY(180deg)';
  // Adds the div to the container.
  remoteContainer.appendChild(streamDiv);
}

// Remove the video stream from the container.
function removeVideoStream(elementId) {
  const remoteDiv = document.getElementById(elementId);
  if (remoteDiv) remoteDiv.parentNode.removeChild(remoteDiv);
}

// eslint-disable-next-line no-undef
const client = AgoraRTC.createClient({
  mode: 'rtc',
  codec: 'vp8',
});

fetch('../env.json')
  .then(async res => {
    const response = await res.json()
    client.init(response.APPID);

    // Join a channel
    client.join(response.TOKEN, 'shinbunbun-test-channel', null, (uid)=>{

      // Create a local stream
      // eslint-disable-next-line no-undef
      let localStream = AgoraRTC.createStream({
        audio: true,
        video: true,
      });
      // Initialize the local stream
      localStream.init(()=>{
      // Play the local stream
        localStream.play('me');
        // Publish the local stream
        client.publish(localStream, handleError);
      }, handleError);

      // Subscribe to the remote stream when it is published
      client.on('stream-added', function(evt){
        client.subscribe(evt.stream, handleError);
      });
      // Play the remote stream when it is subsribed
      client.on('stream-subscribed', function(evt){
        let stream = evt.stream;
        let streamId = String(stream.getId());
        addVideoStream(streamId);
        stream.play(streamId);
      });
      
      // Remove the corresponding view when a remote user unpublishes.
      client.on('stream-removed', function(evt){
        let stream = evt.stream;
        let streamId = String(stream.getId());
        stream.close();
        removeVideoStream(streamId);
      });
      // Remove the corresponding view when a remote user leaves the channel.
      client.on('peer-leave', function(evt){
        let stream = evt.stream;
        let streamId = String(stream.getId());
        stream.close();
        removeVideoStream(streamId);
      });
    }, handleError);
  })
