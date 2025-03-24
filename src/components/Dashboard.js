import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { createEncryptedMessage } from "../services/firebase";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { IconButton, Paper, Tooltip, Snackbar, Alert } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import LockIcon from '@mui/icons-material/Lock';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';

const theme = createTheme();

function Dashboard() {
  const [value, setValue] = useState("");
  const [encryptedURL, setEncryptedURL] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [password, setPassword] = useState("");
  const [copySuccess, setCopySuccess] = useState(false);
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("submit pressed");
    setDisabled(true);
    setLoading(true);

    try {
      let docRefId = await createEncryptedMessage(value, password);
      setEncryptedURL(
        window.location.origin + "/messages/" + docRefId.toString() + "/"
      );
    } catch (e) {
      console.error("zyzz err", e);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyUrl = () => {
    if (encryptedURL) {
      const urlToCopy = encryptedURL;
      navigator.clipboard.writeText(urlToCopy)
        .then(() => {
          setCopySuccess(true);
          setTooltipOpen(true);
          setTimeout(() => setTooltipOpen(false), 1500);
        })
        .catch(err => {
          console.error('Failed to copy: ', err);
        });
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      style={{ height: "100vh", backgroundColor: "" }}
    >
      <ThemeProvider theme={theme}>
        {loading && (
          <Box
            sx={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              zIndex: 9999,
            }}
          >
            <Box sx={{ position: 'relative', display: 'inline-flex' }}>
              <CircularProgress 
                size={60} 
                sx={{ 
                  color: '#ff6b6b',
                  animation: 'spin 1.5s linear infinite',
                  '@keyframes spin': {
                    '0%': { transform: 'rotate(0deg)' },
                    '100%': { transform: 'rotate(360deg)' },
                  }
                }} 
              />
              <Box
                sx={{
                  top: 0,
                  left: 0,
                  bottom: 0,
                  right: 0,
                  position: 'absolute',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <LockIcon sx={{ color: 'rgba(131,58,180,1)', fontSize: 30 }} />
              </Box>
            </Box>
            <Typography 
              sx={{ 
                mt: 2, 
                background: "linear-gradient(90deg, rgba(131,58,180,1) 13%, rgba(253,62,29,1) 67%, rgba(252,176,69,1) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontWeight: 'bold'
              }}
            >
              Encrypting your secret...
            </Typography>
          </Box>
        )}
        <Grid
          container
          spacing={0}
          direction="row"
          justifyContent="center"
          // alignItems="center"
          alignItems="center"
          style={{ backgroundColor: "", height: "50vh" }}
        >
          <Grid item xs={12} md={6} style={{ backgroundColor: "" }}>
            <Typography
              gutterBottom
              textAlign="center"
              sx={{ typography: { sm: "h2", xs: "h4" } }}
              style={{
                background: "rgb(131,58,180)",
                background:
                  "linear-gradient(90deg, rgba(131,58,180,1) 13%, rgba(253,62,29,1) 67%, rgba(252,176,69,1) 100%)",
                webkitBackgroundClip: "text",
                webkitTextFillColor: "transparent",
              }}
            >
              Share your secret!
            </Typography>
          </Grid>

          <Grid item xs={12} md={12} style={{ backgroundColor: "" }}>
            <Typography
              gutterBottom
              textAlign="center"
              sx={{ typography: { sm: "h6", xs: "body2" } }}
              style={{}}
            >
              Type in a secret message and share that link with someone...Once
              they see that message, the link will self destruct!
            </Typography>
          </Grid>

          <Grid item md={7} xs={9} style={{ backgroundColor: "" }}>
            <TextField
              fullWidth
              id="outlined-multiline-static"
              label="Add your secret message here..."
              rows={4}
              onChange={(e) => setValue(e.target.value)}
              sx={{
                input: {
                  color: "black",

                  borderColor: "white",
                },
              }}
              color="success"
            />
          </Grid>

          <Grid item md={7} xs={9} style={{ backgroundColor: "" }}>
            <TextField
              fullWidth
              id="outlined-multiline-static"
              label="Enter a password to encrypt this file"
              type={showPassword ? "text" : "password"}
              rows={4}
              onChange={(e) => setPassword(e.target.value)}
              sx={{
                input: {
                  color: "black",

                  borderColor: "white",
                },
              }}
              color="success"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleTogglePasswordVisibility}
                      edge="end"
                    >
                      {showPassword ? 
                        <VisibilityOff sx={{ color: '#ff6b6b' }} /> : 
                        <Visibility sx={{ color: '#ff6b6b' }} />
                      }
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid
            item
            md={6}
            justifyContent="center"
            style={{
              backgroundColor: "",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button
              onClick={handleSubmit}
              variant="outlined"
              disabled={disabled}
            >
              Submit your secret message!
            </Button>
          </Grid>
          {encryptedURL && (
            <Grid
              item
              xs={12}
              justifyContent="center"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginTop: "20px",
                width: "100%"
              }}
            >
              <Typography variant="h6" sx={{ typography: { sm: "h6", xs: "body2" } }}>
                Your link is available at:
              </Typography>
              
              <Paper 
                elevation={0} 
                sx={{ 
                  p: 2, 
                  display: 'flex', 
                  alignItems: 'center', 
                  backgroundColor: 'rgba(0, 0, 0, 0.04)',
                  borderRadius: 2,
                  width: "80%",
                  maxWidth: "600px",
                  marginTop: "8px"
                }}
              >
                <a 
                  href={encryptedURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ 
                    flexGrow: 1,
                    textDecoration: 'none',
                    fontFamily: 'monospace', 
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    background: "linear-gradient(90deg, rgba(131,58,180,1) 13%, rgba(253,62,29,1) 67%, rgba(252,176,69,1) 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    fontWeight: "bold",
                    display: 'block'
                  }}
                >
                  {encryptedURL}
                </a>
                <Tooltip 
                  title={tooltipOpen ? "Copied!" : "Copy to clipboard"} 
                  placement="top"
                  open={tooltipOpen}
                  onClose={() => setTooltipOpen(false)}
                >
                  <IconButton 
                    onClick={handleCopyUrl} 
                    size="small" 
                    aria-label="copy to clipboard"
                  >
                    <ContentCopyIcon fontSize="small" sx={{ color: "rgba(131,58,180,1)" }} />
                  </IconButton>
                </Tooltip>
              </Paper>
            </Grid>
          )}

          <Snackbar
            open={copySuccess}
            autoHideDuration={2000}
            onClose={() => setCopySuccess(false)}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          >
            <Alert severity="success" sx={{ width: '100%' }}>
              URL copied to clipboard!
            </Alert>
          </Snackbar>
        </Grid>
      </ThemeProvider>
    </Box>
  );
}

export default Dashboard;
