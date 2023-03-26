export const getSender = (loggedUser, users) => {
  if(loggedUser) return users[0]?._id === loggedUser?._id ? users[1]?.name : users[0]?.name;
};

export const putName = (messages, m, i, userId) => {
  if(userId)
    return (
      (i===0 && m.sender._id!==userId) ||
      (i>0 && messages[i-1].sender._id!==m.sender._id && m.sender._id!==userId)  
    )
  else return 
} 