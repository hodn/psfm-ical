import React, { useState } from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';

function App() {

  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState('');

  const handleSubmit = async (event, teamUrl) => {
    event.preventDefault();
    setLoading('Načítání ...')

    try {
      const response = await axios.get(process.env.REACT_APP_AWS_TOKEN, {
        params: {
          teamUrl: teamUrl
        }
      })
      const isFileSaverSupported = !!new Blob();

      if (isFileSaverSupported) {
        const bytes = new TextEncoder().encode(response.data);
        const blob = new Blob([bytes], { type: "text/calendar;charset=utf-8" });
        saveAs(blob, "vase-psmf-zapasy.ics");
        setLoading(" ");
      } else {
        setLoading('Nepodporovaný webový prohlížeč, zkuste prosím jiný.');
      }

    } catch (e) {
      setLoading('Chyba - ujistěte se prosím, že byl vložen správný odkaz.');
    }



  }

  return (

    <form style={{ margin: '20px' }} onSubmit={event => handleSubmit(event, url)}>
      <h1>Gener&aacute;tor kalend&aacute;ře PSMF (iCalendar)</h1>
      <ol>
        <li>Vložte pros&iacute;m odkaz na PSMF str&aacute;nku va&scaron;eho t&yacute;mu. Např&iacute;klad <em><a href="https://www.psmf.cz/souteze/2022-hanspaulska-liga-podzim/8-c/tymy/kosticky/">https://www.psmf.cz/souteze/2022-hanspaulska-liga-podzim/8-c/tymy/kosticky/</a></em></li>
        <li>Vygenerujte a st&aacute;hněte si kalend&aacute;řov&yacute; soubor</li>
        <li>Kalend&aacute;řov&yacute; soubor (.ics) importujte do sv&eacute;ho kalend&aacute;ře. N&aacute;vod pro Google kalend&aacute;ř <a rel="noopener noreferrer" target="_blank" href="https://youtu.be/DtLM4DUicRU?t=62">zde</a>.</li>
      </ol>
      <p>

        <label>Odkaz na PSMF stránku týmu</label>

        <textarea cols="30" rows="2" style={{ width: '100%', height: '38px', marginTop: '5px' }} value={url}
          onChange={(e) => setUrl(e.target.value)}></textarea><br /><br /><button type="submit" style={{ height: '38px' }}>Generovat soubor</button></p>

      <p style={{backgroundColor: '#ccffff'}}>{loading}</p>
    </form>

  );
}

export default App;