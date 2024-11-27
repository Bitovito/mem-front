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
import VoDataTable from "./VoDataTable.jsx";
import testingData from "../assets/testingData.json"

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
  backgroundColor: sender === "user" ? theme.palette.primary.light : theme.palette.background.paper,
  color: sender === "user" ? theme.palette.primary.contrastText : theme.palette.text.primary,
  alignSelf: sender === "user" ? "flex-end" : "flex-start",
  // boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
  // transition: "all 0.3s ease",
  // "&:hover": {
  //   transform: "scale(1.02)",
  // },
}));

function MessageDataRender(mesg_data){
  const msg_data = mesg_data.msg_data
  
  switch(msg_data.last_tool_called) {
    case "RegistryResponse":
      console.log("Respuesta con data_table");
      console.log(msg_data.final_response.data_table);
      return(
        <VoDataTable table_obj={msg_data.final_response.data_table} />
      )
      // return(
      //   <MessageBubble>
      //     {/* data_table */}
      //       <TableContainer>
      //         <Table>
      //           <TableHead>
      //             <TableRow>
      //               {Object.keys(msg_data.final_response.data_table[0]).map((key) => <TableCell>{key}</TableCell>)}
      //             </TableRow>
      //           </TableHead>
      //           <TableBody>{
      //             msg_data.final_response.data_table.map((row) => {
      //               console.log(row);
      //               return(  
      //                 <TableRow
      //                   ker={row.res_title}
      //                   sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
      //                 >
      //                   {Object.keys(row).map((key) => <TableCell>{row[key]}</TableCell>)}
      //                 </TableRow>
      //               )
      //             })
      //           }</TableBody>
      //         </Table>
      //       </TableContainer>
      //   </MessageBubble>
      // )
    case "ImageResponse":
      console.log("Respuesta con imagen");
      console.log(msg_data.final_response.vo_image);
      return(
        <MessageBubble>
          <img src={msg_data.msg_data.final_response.vo_image.link} alt={msg_data.msg_data.final_response.vo_image.title} />
        </MessageBubble>
      )
  }
}

function MessageRender({sender, msg_data}) {
  var text = msg_data
  if (sender === "assistant"){
    text = "final_response" in msg_data ? msg_data.final_response.text_answer : msg_data.last_message
  }
  return(
    <MessageBubble sender={sender}>
      <ListItemText primary={text} />
    </MessageBubble>
  )
}

const InputContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
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
  const [messages, setMessages] = useState(testingData);
  const [inputMessage, setInputMessage] = useState("");
  const [error, setError] = useState(null);

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      const newMessage = { id: Date.now(), msg_data: inputMessage, sender: "user" };
      console.log(newMessage);
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
          throw new Error('Error from backend: ' + data.answer);
        }
        const newAIMessage = { id: Date.now(), msg_data: data.answer, sender: "assistant"}
        console.log(newAIMessage);
        setMessages((prevMessages) => [...prevMessages, newAIMessage]);
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
            <>
            <ListItem key={message.id} sx={{ display: "flex", justifyContent: message.sender === "user" ? "flex-end" : "flex-start" }}>
              <MessageRender sender={message.sender} msg_data={message.msg_data} />
            </ListItem>
            {message.sender != "user" && "final_response" in message.msg_data &&
              (<ListItem key={message.id+"_"} sx={{ display: "flex", justifyContent: "flex-start" }}>
                <MessageDataRender msg_data={message.msg_data} />
              </ListItem>)
            }
            </>
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