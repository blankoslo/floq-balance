import React from 'react';
import * as Immutable from 'immutable';

import Col from './headerCol';

const columnNames = new Immutable.List(
  [
    { value: 'Kunde', title: 'Kundekode' },
    { value: 'Netto omsetning kunde', title: 'Netto omsetning kunde' },
    { value: 'Brutto omsetning kunde', title: 'Brutto omsetning kunde' },
    { value: 'OT Kunde', title: 'Oppnådd timespris Kunde' },
    { value: 'Engasjement', title: 'Engasjement' },
    { value: 'Ansv.', title: 'Ansvarlig' },
    { value: 'Timeføring', title: 'Timeføring' },
    { value: 'Avskrivning', title: 'Avskrivning' },
    { value: 'Grunnlag', title: 'Grunnlag' },
    { value: 'Fak. timetall', title: 'Fakturert timetall' },
    { value: 'Utgifter', title: 'Utgifter' },
    { value: 'UL', title: 'Underleverandører' },
    { value: 'Honorar', title: 'Honorar' },
    { value: 'OT', title: 'Oppnådd timepris' },
    { value: 'Fak. Status', title: 'Fakturastatus' },
  ]);

const BalanceViewHeader = () => (
  <thead>
    <tr>
      {columnNames.map(cn => <Col columnName={cn.value} key={cn.value} title={cn.title} />)}
    </tr>
  </thead>
);

export default BalanceViewHeader;
