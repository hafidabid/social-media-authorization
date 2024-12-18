import "./App.css";
import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import {
  GoogleOAuthProvider,
  GoogleLogin,
  useGoogleLogin,
} from "@react-oauth/google";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

function App() {
  const [token, setToken] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const handleLoginSuccess = (credentialResponse: any) => {
    console.log("credResponse: ", credentialResponse);
    const token = credentialResponse.credential ?? credentialResponse.code;
    setToken(token);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(token ?? "");
    alert("Token copied to clipboard");
  };

  const gLog = useGoogleLogin({
    onSuccess: handleLoginSuccess,
    onError: () => {
      alert("Login Failed");
    },
    flow: "auth-code",
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <h1>Social Media Login Playground</h1>
      {/* <GoogleLogin
          onSuccess={handleLoginSuccess}
          onError={() => {
            alert("Login Failed");
          }}
        /> */}
      <Button onClick={gLog}>Login with Google</Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Token Generated</DialogTitle>
        <DialogContent>
          <Typography variant="body1">{token}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCopy} color="secondary">
            Copy
          </Button>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default App;
