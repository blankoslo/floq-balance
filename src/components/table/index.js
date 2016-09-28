import React from 'react';
import * as Immutable from 'immutable';
import Header from './header';
import Body from './body';

const BalanceViewTable = (props) => (
  <div>
    <table className='balance-table'>
      <Header
      // TODO: Move into datastructure? as tuples together with value
        columnNames={new Immutable.List(['Kundekode', 'Oppnådd timespris Kunde',
        'Brutto omsetning kunde', 'Netto omsetning kunde', 'Engasjement', 'Ansvarlig',
        'Timeføring', 'Avskrivning', 'Grunnlag', 'Fakturert timetall', 'Utgifter',
        'Underleverandører', 'Honorar',	'Oppnådd timepris'])}
      />
      <Body data={props.tableBody} />
    </table>
  </div>
);

BalanceViewTable.propTypes = {
  tableBody: React.PropTypes.object.isRequired
};

export default BalanceViewTable;
