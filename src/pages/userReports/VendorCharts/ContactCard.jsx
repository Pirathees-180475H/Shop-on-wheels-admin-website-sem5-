import React from "react";
function ContactCard({ contact }) {
    return (React.createElement("div", { className: "contact-card" },
        React.createElement("p", null, contact.name),
        React.createElement("p", null,
            " ",
            contact.number)));
}
export default ContactCard;