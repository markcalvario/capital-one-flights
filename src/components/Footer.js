import React from 'react';

function Footer(props) { 
    return(
        <div className="fixed-bottom bg-dark py-3 text-white text-center">
            {props.title}
        </div>
    )
}

export default Footer;