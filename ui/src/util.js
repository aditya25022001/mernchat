export const getSender = (loggedUser, users) => {
  return users[0]._id === loggedUser._id ? users[1].name : users[0].name;
};

export const getSenderFull = (loggedUser, users) => {
  return users[0]._id === loggedUser._id ? users[1] : users[0];
};

export const putName = (messages, m, i, userId) => {
  return (
    (i===0 && m.sender._id!==userId) ||
    (i>0 && messages[i-1].sender._id!==m.sender._id && m.sender._id!==userId)  
  )
} 