import moment from "moment";
export const formatDate = (date) => {

    const now = new Date();
    //? DIFFERENCE BTW CURRENT DATE & USER DATE
    const diff = now.getTime() - date.getTime();


    //? FOR MINUTE
    if (diff < 60000) {
        return "now";
    }


    //? FOR HOUR
    if (diff < 3600000) {
        return `${Math.round(diff / 60000)} min ago`;
    }


    //? FOR DAY
    if (diff < 86400000) {
        return moment(date).format("h:mm A");
    }


    return moment(date).format("MM/DD/YY");

}

export const wrapEmojisInHtmlTag = (messageText) => {
    const regexEmoji = /(\p{Emoji_Presentation}|\p{Emoji}\uFE0F)/gu; // regex to match all Unicode emojis
    return messageText.replace(regexEmoji, (match) => {
        return `<span style="font-size:1.5em;margin:0 2px;position:relative;top:2px">${match}</span>`;
    });
};