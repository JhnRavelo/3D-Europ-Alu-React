const handleLastMessage = (commercials, lastMessage, setLastMessageDisplay) => {
  var userLastMessage,
    displayMessages = new Array();
  commercials.map((item) => {
    userLastMessage = lastMessage.find(
      (m) => item.ID_user == m.receiver || item.ID_user == m.sender
    );
    if (
      userLastMessage &&
      (userLastMessage?.text || userLastMessage?.img || userLastMessage?.file)
    ) {
      displayMessages.push(
        userLastMessage?.text
          ? userLastMessage.text
          : userLastMessage?.img
          ? userLastMessage.img.split("/")[
              userLastMessage.img.split("/").length - 1
            ]
          : userLastMessage?.file
          ? userLastMessage.file.split("/")[
              userLastMessage.file.split("/").length - 1
            ]
          : ""
      );
    }
  });
  setLastMessageDisplay(displayMessages);
};

export default handleLastMessage;
