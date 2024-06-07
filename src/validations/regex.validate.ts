export const regex5minLess = /^(1:([0-5][0-9])|(2|3|4):[0-5][0-9])$/;
export const regexPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9#@$%]{8,}$/; // atleast 8 characters, contain a number, a lowercase and uppercase, '#' or '@' or '$' or '%'
export const regexUrlImage = /^(https?):\/\/[^\s/?\.#]+\.[^\s]+\.(jpg|png|jpeg|gif)$/
export const regexUsername = /^[a-zA-Z0-9]{5,32}$/