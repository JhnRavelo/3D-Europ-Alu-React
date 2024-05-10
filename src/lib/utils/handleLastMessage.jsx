const handleLastMessage = (commercials, lastMessage, setLastMessageDisplay) => {
  var userLastMessage,
    displayMessages = new Array();
  commercials.map((item) => {
    userLastMessage = lastMessage.find(
      (m) => item.ID_user == m.receiver || item.ID_user == m.sender
    );
    if (userLastMessage && userLastMessage?.text) {
      displayMessages.push(userLastMessage.text);
    }
  });
  setLastMessageDisplay(displayMessages);
};

export default handleLastMessage;
