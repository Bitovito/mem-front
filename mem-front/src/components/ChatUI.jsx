import React, { useState, useEffect } from "react";
import {
  Box,
  Avatar,
  Typography,
  IconButton,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Paper,
  Snackbar,
  TableContainer,
  Table, TableHead, TableBody, TableRow, TableCell
} from "@mui/material";
import { styled } from "@mui/material";
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import SearchSharpIcon from '@mui/icons-material/SearchSharp';

const ChatContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  margin: "0 auto",
  height:"100%",
  maxHeight:"100vh"
}));


const ConversationContainer = styled(Paper)(({ theme }) => ({
  flex: "1 1 auto",
  overflow: "auto",
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.default,
  maxHeight:"fit-content"
}));

const MessageBubble = styled(Box)(({ theme, sender }) => ({
  maxWidth: sender === "user" ? "70%" : "100%",
  padding: theme.spacing(1, 2),
  borderRadius: "20px",
  marginBottom: theme.spacing(1),
  backgroundColor: sender === "user" ? theme.palette.primary.light : '#fefcff',
  color: sender === "user" ? theme.palette.primary.contrastText : theme.palette.text.primary,
  alignSelf: sender === "user" ? "flex-end" : "flex-start",
  // boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
  // transition: "all 0.3s ease",
  // "&:hover": {
  //   transform: "scale(1.02)",
  // },
}));

function MessageRender({sender, msg_data}) {
  if (sender === "assistant"){
    if ((msg_data.last_message.includes('image')|| msg_data.last_message.includes('Image')) && msg_data.last_message.includes('$https')){
      console.log(msg_data.split('$'));
  
      var imageUrl = msg_data.split('$')[1]
      return(
        <>
          <MessageBubble sender={sender}>
            <ListItemText primary={msg_data} />
          </MessageBubble>
          <MessageBubble>
            <img src={imageUrl} alt="My Image" />
          </MessageBubble>
        </>
      )
    }
    else if ('final_response' in msg_data && 'data_table' in msg_data.final_response){
      console.log("Respuesta con data_table");
      console.log(msg_data.final_response.data_table);
      
      return(
        <>
          <MessageBubble sender={sender}>
            <ListItemText primary={msg_data.final_response.text_message} />
          </MessageBubble>
          <MessageBubble>
            {/* data_table */}
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      {Object.keys(msg_data.final_response.data_table[0]).map((key) => <TableCell>{key}</TableCell>)}
                    </TableRow>
                  </TableHead>
                  <TableBody>{
                    msg_data.final_response.data_table.map((row) => {
                      console.log(row);
                      return(  
                        <TableRow
                          ker={row.res_title}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                          {Object.keys(row).map((key) => <TableCell>{row[key]}</TableCell>)}
                        </TableRow>
                      )
                    })
                  }</TableBody>
                </Table>
              </TableContainer>
          </MessageBubble>
        </>
      )
    }
  }
  return(
    <MessageBubble sender={sender}>
      <ListItemText primary={sender != 'user' ? msg_data.last_message : msg_data} />
    </MessageBubble>
  )
}

const InputContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  padding: theme.spacing(2),
  backgroundColor: theme.palette.primary.main,
  minHeight: "3rem",
  height: "auto",
}));

const SendButton = styled(IconButton)(({ theme }) => ({
  width: "3rem",
  height: "3rem",
  color: theme.palette.primary.contrastText,
  marginLeft: theme.spacing(1),
  transition: "all 0.3s ease",
  "&:active": {
    transform: "scale(0.95)",
  },
}));

const ChatUI = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [error, setError] = useState(null);

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      const newMessage = { id: Date.now(), msg_data: inputMessage, sender: "user" };
      setMessages([...messages, newMessage]);
      setInputMessage("");
      //
      fetch("http://localhost:8000/agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ msg_data: inputMessage })
      })
      .then((response) => response.json())
      .then((data) => {
        if(data.status === "error"){
          //Handle backend error msg
          throw new Error('Error from backend: '+data);
        }
        setMessages((prevMessages) => [...prevMessages, { id: Date.now(), msg_data: data.answer, sender: "assistant"}]);
      })
      .catch((error) => console.log(error));
      //
      // setTimeout(() => {
      //   const receivedMessage = { id: Date.now() + 1, msg_data: "Thanks for your message!", sender: "other" };
      //   setMessages((prevMessages) => [...prevMessages, receivedMessage]);
      // }, 1000);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
    
  };

  useEffect(() => {
    // Scroll to bottom when new messages are added
    const conversationContainer = document.getElementById("conversation-container");
    if (conversationContainer) {
      conversationContainer.scrollTop = conversationContainer.scrollHeight;
    }
  }, [messages]);

  return (
    <ChatContainer>
      <ConversationContainer id="conversation-container">
        <List>
          {messages.map((message) => (
            <ListItem key={message.id} sx={{ display: "flex", justifyContent: message.sender === "user" ? "flex-end" : "flex-start" }}>
              {/* <MessageBubble sender={message.sender}>
                <ListItemText primary={message.msg_data} />
              </MessageBubble> */}
              <MessageRender sender={message.sender} text={message.msg_data} />
            </ListItem>
          ))}
        </List>
      </ConversationContainer>

      <InputContainer>
        <TextField
          fullWidth
          multiline
          height="3em"
          variant="filled"
          placeholder="Query..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={handleKeyPress}
          slotProps={{
            input: {
              sx: { 
                borderRadius: "20px",
                padding: "1em"
              },
              disableUnderline: true
            }
          }}
        />
        <SendButton
          onClick={handleSendMessage}
          aria-label="Send Message"
        >
          <SearchSharpIcon />
        </SendButton>
      </InputContainer>

      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={!!error}
        autoHideDuration={3000}
        onClose={() => setError(null)}
        message={error}
      />
    </ChatContainer>
  );
};

export default ChatUI;