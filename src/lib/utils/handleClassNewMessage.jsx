const handleClassNewMessage = (setClassNewMessage, commercials, notif, setCountMessage) => {
  const classNewMessages = new Array(), countMessages = new Array();
  // console.log(notif)
  commercials.map((item) => {
    const find = notif.find((n) => n.send.ID_user == item.ID_user);
    if (find) {
      classNewMessages.push("newMessage");
      countMessages.push(find?.count)
    } else {
      classNewMessages.push("");
      countMessages.push(find?.count)
    }
    
  });
  setCountMessage(countMessages)
  setClassNewMessage(classNewMessages);
};

export default handleClassNewMessage;
