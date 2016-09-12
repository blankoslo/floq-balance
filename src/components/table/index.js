import React from 'react';
import * as Immutable from 'immutable';
import Header from './header';
import Body from './body';

const BalanceViewTable = (props) => (
  <div>
    <table className='balance-table'>
      <Header
      // TODO: Move into datastructure? as tuples together with value
        columnNames={new Immutable.List(['Kundekode', 'Engasjement', 'Brutto omsetning kunde',
        'Netto omsetning kunde', 'OT Kunde', 'Ansvarlig', 'Timeføring', 'Avskrivning',
        'Grunnlag', 'Fakturert timetall', 'Utgifter',
        'UL', 'Honorar',	'OT'])}
      />
      <Body data={props.tableBody} />
    </table>
  </div>
);

BalanceViewTable.propTypes = {
  tableBody: React.PropTypes.object.isRequired
};

export default BalanceViewTable;
