import './App.css';
import { useState, useEffect } from 'react';

function App() {
  

  const [generatedPassword, setgeneratedPass] = useState("");
  const [passLen, setpassLen] = useState();

  useEffect(() => {
    const passwordElement = document.getElementById("password");
    passwordElement.textContent = generatedPassword;
  }, [generatedPassword]);
  
  function generatePassword(length) {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]\\:;?><,./-=";
    let password = "";
    let hasUpper , hasLower, hasNum, hasSym;
    hasUpper = hasLower = hasNum = hasSym = false;

    for (var i = 0; i < length; i++) {
      var randomIndex = Math.floor(Math.random() * charset.length);
      if (charset[randomIndex] >= 'a' && charset[randomIndex] <= 'z') hasLower = true;
      if (charset[randomIndex] >= 'A' && charset[randomIndex] <= 'Z') hasUpper = true;
      if (charset[randomIndex] >= '0' && charset[randomIndex] <= '9') hasNum = true;
      if (randomIndex >= (charset.length-30) && randomIndex <= (charset.length-1)) hasSym = true;
      password += charset.charAt(randomIndex);
    }

    if (!(hasLower && hasUpper && hasNum && hasSym))
      return generatePassword(length);
    else
      return password;
  }

  return (
   <div className="pass_gen section">
      <div className="inPass">
              <input type="number" id="inPass" placeholder="password length ..." onChange={(e)=>{setpassLen(e.target.value)}}/>
              <button type="button" class="btn" onClick={ () => {
                if (passLen <= 5)
                  alert("password length cannot be smaller than 5 :)");
                else
                {
                  setgeneratedPass(generatePassword(passLen));
                }
              }}>Generate</button>
        </div>
        <div className="outPass">
          <h3 className="pass" id="password">{generatedPassword}</h3>
          <button type="button" className="copyBtn" onClick={() => {
            const passwordElement = document.getElementById("password");

            // Create a range object
            var range = document.createRange();
          
            // Select the contents of the div element
            range.selectNode(passwordElement);
          
            // Add the range to the user's selection
            window.getSelection().addRange(range);
          
            // Copy the selected text to the clipboard
            document.execCommand("copy");
          
            // Give a visual feedback to the user that the text has been copied
            alert("Text has been copied!");
          }}>Copy</button>
        </div>
   </div>
  );
}

export default App;
