import React, { useState } from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';

function App() {

  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState('');

  const handleSubmit = async (event, teamUrl) => {
    event.preventDefault();
    setLoading('Generuji kalendář ...')

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
        setLoading(" ")
      } else {
        alert('Nepodporovaný webový prohlížeč, zkus prosím jiný.');
        setLoading(" ");
      }

    } catch (e) {
      alert('Chyba! Ujisti se prosím, že byl vložen správný odkaz a že už je rozpis k dispozici.')
      setLoading(" ");
    }



  }

  return (

    <form style={{ margin: '20px' }} onSubmit={event => handleSubmit(event, url)}>
      <h1>PSMF rozpis pro digitální kalendáře (iCalendar)</h1>      

      <h4>Hraješ Hanspaulku a nechce se ti ručně přepisovat rozpis zápasů?</h4>

      <p>Vygeneruj si .ics soubor k hromadnému nahrání zápasů do tvého digitálního kalendáře (včetně hřišť, barev dresů atd.)</p>

      <p style={{ marginTop: '30px', marginBottom: '30px' }}>
        <label>Vlož odkaz na PSMF stránku tvého týmu</label>

        <textarea placeholder="Např. https://www.psmf.cz/souteze/2022-hanspaulska-liga-podzim/8-c/tymy/kosticky/" cols="30" rows="2" style={{ width: '100%', height: '38px', marginTop: '5px' }} value={url}
          onChange={(e) => setUrl(e.target.value)}></textarea>
          <br /><br /><button type="submit" style={{ height: '38px' }}>Vygenerovat soubor (.ics)</button>
      </p>

      <p style={{ backgroundColor: '#F2BB05' }}>{loading}</p>

      <p style={{color: '#999999'}}> Nevíš, jak se takový soubor nahrává? <a rel="noopener noreferrer" target="_blank" href="https://youtu.be/DtLM4DUicRU?t=62"> Video návod pro Google Kalendář.</a></p>
      <p style={{color: '#999999'}}>Nástroj podporuje všechny rozpisy: Hanspaulsk&aacute; liga, Veter&aacute;nsk&aacute; liga, Superveter&aacute;nsk&aacute; liga, Ultraveter&aacute;nsk&aacute; liga, Futsal</p>
      <p style={{color: '#999999'}}>Kontakt na autora: <a style={{color: '#999999'}} href="mailto:hoang.doan@rocketmail.com?subject=PSMF generátor kalendáře">hoang.doan@rocketmail.com</a></p>

    </form>

    

  );
}

export default App;
