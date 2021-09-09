import React, { useRef, useState } from 'react';
import TextField from "@material-ui/core/TextField";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import ReactHlsPlayer from 'react-hls-player';

function App() {
  const [connState, setConnState] = useState('Offline');
  const [server, setServer] = useState('192.168.20.10:554');
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('123456');
  const [path, setPath] = useState('/ch01/01');

  const xhrSetup = (xhr: XMLHttpRequest, url: string) => {
    console.log('XHR', xhr, url);
    // xhr.setRequestHeader("Authorization", "Basic " + btoa(username + ":" + password));
  }

  const playerRef = useRef<HTMLVideoElement>(null);


  return (
    <div className="App">
      <Grid container spacing={1} >
        <Grid item xs={12}>
          <Typography variant="h4">Swann NVR Details</Typography>
        </Grid>
        <Grid item xs={6}>
          <TextField label='Server with Port' variant="outlined" defaultValue={server} fullWidth onChange={e => setServer(e.target.value)} />
        </Grid>
        <Grid item xs={3}>
          <TextField label='Username' variant="outlined" defaultValue={username} fullWidth onChange={e => setUsername(e.target.value)} />
        </Grid>
        <Grid item xs={3}>
          <TextField label='Password' type="password" variant="outlined" defaultValue={password} fullWidth onChange={e => setPassword(e.target.value)} />
        </Grid>
        <Grid item xs={12} >
        <TextField label='Path' variant="outlined" defaultValue={path} fullWidth onChange={e => setPath(e.target.value)} />
        </Grid>
        <Grid item xs={12} >
          Status : {connState}
        </Grid>
        <Grid item xs={12} >
          {playerRef && <ReactHlsPlayer
            // src={`rtsp://${server}${path}`}
            src={'http://localhost:8080/streams/driveway.m3u8'}
            autoPlay={false}
            controls={true}
            width="100%"
            height="auto"
            hlsConfig={{
              xhrSetup: xhrSetup
            }}
            playerRef={playerRef}
          />}

          <video src="http://localhost:8080/streams/driveway.m3u8.tmp"></video>
          <video src="http://localhost:8080/streams/driveway.m3u8"></video>
          <video src="http://localhost:8080/driveway.m3u8"></video>
          <video src="http://localhost:8080/streams/frontyard.m3u8"></video>
          <video src="http://localhost:8080/frontyard.m3u8"></video>
          Debug Area.
          <pre>
            <label>Rendered URL: {`rtsp://${server}${path}`}</label>

          </pre>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
