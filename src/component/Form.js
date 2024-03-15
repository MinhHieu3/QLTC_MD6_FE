
import React, {useState} from 'react';
function Form() {
    const [isShow, setIsShow] = useState(false);
    const handleClick = () => {
        setIsShow(!isShow); // Set isShow to true when the element is clicked
    };
    return (
      <>
          <div className={`form-sidebar ${isShow ? 'show' : ''}`}>

          </div>
      </>
    );
}

export default Form;
