import React, { useState } from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';
import { Button, Collapse, Card, Text, Grid, Textarea, Spacer, Checkbox } from '@geist-ui/core'


function App() {

  const [url, setUrl] = useState('');
  const [includeReferees, setIncludeReferees] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event, teamUrl) => {
    event.preventDefault();
    setLoading(true)

    try {
      const response = await axios.get("process.env.REACT_APP_AWS_TOKEN", {
        params: {
          teamUrl: teamUrl,
          includeRef: includeReferees
        }
      })
      const isFileSaverSupported = !!new Blob();

      if (isFileSaverSupported) {
        const bytes = new TextEncoder().encode(response.data);
        const blob = new Blob([bytes], { type: "text/calendar;charset=utf-8" });
        saveAs(blob, "vase-psmf-zapasy.ics");
        setLoading(false)
      } else {
        alert('Nepodporovaný webový prohlížeč, zkus prosím jiný.');
        setLoading(false);
      }

    } catch (e) {
      alert('Chyba! Ujisti se prosím, že byl vložen správný odkaz a že už je rozpis k dispozici.')
      setLoading(false);
    }



  }

  return (

    <div style={{ margin: 15 }}>
      <Grid.Container gap={2} justify="center" height="100px">

        <Grid xs={24}>
          <Card shadow width="100%" type='dark' style={{ backgroundColor: '#e7b518' }}>
            <Text h5>Přepisovač rozpisu Hanspaulky</Text>
          </Card>
        </Grid>

        <Grid xs={24} md={10}>
          <Card shadow width="100%">
            <Text h3>Nechce se ti ručně přepisovat rozpis Hanspaulky?</Text>
            <Text>Vygeneruj si soubor k hromadnému nahrání zápasů do svého digitálního kalendáře (včetně hřišť, barev dresů atd.)</Text>
          </Card>
        </Grid>

        <Grid xs={24} md={14}>
          <Card shadow width="100%">
            <Text h5>Vlož odkaz na PSMF stránku svého týmu</Text>
            <Textarea
              placeholder="Např. https://www.psmf.cz/souteze/2022-hanspaulska-liga-podzim/8-c/tymy/kosticky/"
              width="100%"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            >
              Vlož odkaz na PSMF stránku tvého týmu
            </Textarea>

            <Spacer />

            <Checkbox checked={includeReferees} onChange={e => {
              setIncludeReferees(!includeReferees);
            }}>Zahrnout i termíny pískání
            </Checkbox>

            <Spacer />

            <Button loading={loading} shadow onClick={event => handleSubmit(event, url)} style={{ textTransform: 'none' }}>Vygenerovat kalendář (.ics)</Button>

          </Card>
        </Grid>

        <Grid xs={24}>
          <Card shadow width="100%">
            <Text h4>FAQs</Text>
            <Collapse.Group>
              <Collapse title="Kde najdu PSMF stránku svého týmu?">
                <Text>V hlavičce stránky <a rel="noopener noreferrer" target="_blank" href="https://www.psmf.cz/"> PSMF</a> napiš do vyhledávácího pole název svého týmu. Najdeš tam rozpis, tabulku a další užitečné informace o svém týmu.</Text>
                <Text>Nástroj podporuje všechny rozpisy: Hanspaulsk&aacute; liga, Veter&aacute;nsk&aacute; liga, Superveter&aacute;nsk&aacute; liga, Ultraveter&aacute;nsk&aacute; liga, Futsal.</Text>
              </Collapse>
              <Collapse title="Jak se takový soubor nahrává do kalendáře?">
                <Text>Appka ti vygeneruje standardizovaný iCalendar (.ics) soubor, který lehce otevřeš na počítači i na telefonu. Pokud si nevíš rady, zde je návod pro <a rel="noopener noreferrer" target="_blank" href="https://youtu.be/DtLM4DUicRU?t=62"> Google Kalendář</a>.</Text>
              </Collapse>
              <Collapse title="Nějak to nefunguje. Co mám dělat?">
                <Text>Ujisti se, že přikládáš aktuální stránku svého týmu, kde už je k dispozici i rozpis zápasů. Pokud nevíš kudy kam, napiš mi na <a style={{ color: '#999999' }} href="mailto:hoang.doan@rocketmail.com?subject=PSMF generátor kalendáře">hoang.doan@rocketmail.com</a></Text>
              </Collapse>
            </Collapse.Group>
          </Card>
        </Grid>

      </Grid.Container>

    </div>

  );
}

export default App;
