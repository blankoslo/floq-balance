import React from 'react';
import Header from './header';
import Body from './body';

const BalanceViewTable = (props) => (
  <div>
    <table className='mdl-data-table mdl-js-data-table mdl-shadow--2dp'>
      <Header
        columnNames={['Prosjekt', 'Prosjektnavn', 'Kundekode', 'Brutto omsetning kunde',
        'Netto omsetning kunde', 'OT Kunde', 'Ansvarlig', 'Timeføring', 'Avskrivning',
        'Grunnlag', 'Timetall på faktura', 'Fakturanummer', 'Fakturatype', 'Utgifter',
        'UL', 'Honorar	OT']}
      />
      <Body projects={props.projects} />
    </table>
  </div>
);

BalanceViewTable.propTypes = {
  projects: React.PropTypes.object
};

export default BalanceViewTable;
